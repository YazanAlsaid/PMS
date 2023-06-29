package edu.fra.uas.parking.config;


import edu.fra.uas.parking.entity.*;

import edu.fra.uas.parking.repository.AddressRepository;
import edu.fra.uas.parking.repository.BuildingRepository;
import edu.fra.uas.parking.repository.FloorRepository;
import edu.fra.uas.parking.repository.GuestRepository;
import edu.fra.uas.parking.repository.NfcCardRepository;
import edu.fra.uas.parking.repository.ParkRepository;
import edu.fra.uas.parking.repository.PrivilegeRepository;
import edu.fra.uas.parking.repository.ReservationRepository;
import edu.fra.uas.parking.repository.RoleRepository;
import edu.fra.uas.parking.repository.SlotRepository;
import edu.fra.uas.parking.repository.TypeRepository;
import edu.fra.uas.parking.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class InitDB {

    private final Logger logger = LoggerFactory.getLogger(InitDB.class);
    private final ParkRepository parkRepository;
    private final BuildingRepository buildingRepository;
    private final FloorRepository floorRepository;
    private final SlotRepository slotRepository;
    private final TypeRepository typeRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PrivilegeRepository privilegeRepository;
    private final NfcCardRepository nfcCardRepository;
    private final GuestRepository guestRepository;
    private final AddressRepository addressRepository;

    @Autowired
    public InitDB(ParkRepository parkRepository, BuildingRepository buildingRepository,
                  AddressRepository addressRepository, FloorRepository floorRepository, SlotRepository slotRepository,
                  TypeRepository typeRepository, ReservationRepository reservationRepository,
                  UserRepository userRepository, RoleRepository roleRepository,
                  PrivilegeRepository privilegeRepository, NfcCardRepository nfcCardRepository,
                  GuestRepository guestRepository) {
        this.parkRepository = parkRepository;
        this.buildingRepository = buildingRepository;
        this.addressRepository = addressRepository;
        this.floorRepository = floorRepository;
        this.slotRepository = slotRepository;
        this.typeRepository = typeRepository;
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.privilegeRepository = privilegeRepository;
        this.nfcCardRepository = nfcCardRepository;
        this.guestRepository = guestRepository;
    }

    @PostConstruct
    public void init() {

        logger.debug("Init Databases started...");


        // Create Parks
        Park parkFrankfurt = this.parkRepository.save(new Park("Frankfurt"));
        logger.debug(parkFrankfurt.toString());
        Park parkWiesbaden = this.parkRepository.save(new Park("Wiesbaden"));
        logger.debug(parkWiesbaden.toString());
        Park parkCologne = this.parkRepository.save(new Park("Köln"));
        logger.debug(parkCologne.toString());
        Park parkBerlin = this.parkRepository.save(new Park("Berlin"));
        logger.debug(parkBerlin.toString());

        // create buildings foreach park
        this.createBuilding(parkFrankfurt);
        this.createBuilding(parkWiesbaden);
        this.createBuilding(parkCologne);
        this.createBuilding(parkBerlin);

        // create address foreach building
        for (Building building : this.buildingRepository.findAll()) {
            Address address = new Address(
                    building.getPark().getName() + "er Straße",
                    Integer.valueOf(building.getId().toString()),
                    60450 + Integer.parseInt(building.getId().toString()),
                    building.getPark().getName(),
                    building
            );
            this.addressRepository.save(address);
        }

        // create Floors foreach Building
        for (Building building : this.buildingRepository.findAll()) {
            logger.debug(String.valueOf(building.getId()));
            this.createFloors(building);
        }


        Type typeNormal = this.typeRepository.save(new Type("Normal"));
        logger.debug(typeNormal.toString());
        Type typeECar = this.typeRepository.save(new Type("E-Car"));
        logger.debug(typeECar.toString());
        Type typeHandicap = this.typeRepository.save(new Type("Handicap"));
        logger.debug(typeHandicap.toString());
        Type typeWomen = this.typeRepository.save(new Type("Women"));
        logger.debug(typeWomen.toString());

        for (Floor floor : this.floorRepository.findAll()) {
            this.createSlotsNormal(floor, typeNormal);
            this.createSlotsECar(floor, typeECar);
            this.createSlotsHandicap(floor, typeHandicap);
            this.createSlotsWoman(floor, typeWomen);
        }

        Set<Privilege> privileges = new HashSet<>();
        privileges.add(new Privilege("VIEW_ADDRESSES"));
        privileges.add(new Privilege("VIEW_ADDRESS"));
        privileges.add(new Privilege("ADD_ADDRESSES"));
        privileges.add(new Privilege("UPDATE_ADDRESS"));
        privileges.add(new Privilege("DELETE_ADDRESSES"));
        privilegeRepository.saveAll(privileges);

        this.createPrivileges("BUILDING");
        this.createPrivileges("FLOOR");
        this.createPrivileges("GUEST");
        this.createPrivileges("NFC_CARD");
        this.createPrivileges("PARK");
        this.createPrivileges("PRIVILEGE");
        this.createPrivileges("RESERVATION");
        this.createPrivileges("ROLE");
        this.createPrivileges("SLOT");
        this.createPrivileges("TYPE");
        this.createPrivileges("USER");


        // roles
        Role roleAdmin = new Role("ADMIN");
        roleAdmin = roleRepository.save(roleAdmin);
        Role roleUser = new Role("USER");
        roleUser = this.roleRepository.save(roleUser);

        for (Privilege privilege : this.privilegeRepository.findAll()) {
            if (privilege.getName().contains("VIEW")) {
                roleUser.setPrivilege(privilege);
            }
            roleAdmin.setPrivilege(privilege);
        }

        roleAdmin = roleRepository.save(roleAdmin);
        roleUser = roleRepository.save(roleUser);

        for (int i = 1; i <= 100; i++) {
            User user = new User("user" + i, "user" + i, "user" + i + "@user.com", "user" + i);
            if (i == 1) {
                user.setRole(roleAdmin);
            } else {
                user.setRole(roleUser);
            }
            this.userRepository.save(user);
        }

        for (int i = 1; i <= 100; i++) {
            NfcCard nfcCard = new NfcCard("d3r5-47ef-12" + i, this.userRepository.getById((long) i), LocalDateTime.now(), LocalDateTime.now().plusMonths(12));
            nfcCardRepository.save(nfcCard);
        }

        for (int i = 1; i <= 30; i++) {
            Guest guest = new Guest("guest" + i, "guest" + i);
            guestRepository.save(guest);
        }

        for (int i = 1; i <= 100; i++) {
            if (i % 2 == 0) {
                this.createReservation(i, Period.MORNING);
            } else {
                this.createReservation(i, Period.AFTERNOON);
            }
        }

    }

    private void createBuilding(Park park) {
        logger.debug(this.buildingRepository.save(new Building(park.getName() + " Parking " + 1, park)).toString());
        logger.debug(this.buildingRepository.save(new Building(park.getName() + " Parking " + 2, park)).toString());
        logger.debug(this.buildingRepository.save(new Building(park.getName() + " Parking " + 3, park)).toString());
        logger.debug(this.buildingRepository.save(new Building(park.getName() + " Parking " + 4, park)).toString());
    }

    private void createPrivileges(String name) {
        Set<Privilege> privileges = new HashSet<>();
        privileges.add(new Privilege("VIEW_" + name + "S"));
        privileges.add(new Privilege("VIEW_" + name));
        privileges.add(new Privilege("ADD_" + name));
        privileges.add(new Privilege("UPDATE_" + name));
        privileges.add(new Privilege("DELETE_" + name));
        logger.debug(this.privilegeRepository.saveAll(privileges).toString());
    }

    private void createFloors(Building building) {
        for (int i = 1; i <= 5; i++) {
            this.createFloor(i, building);
        }
    }

    private void createFloor(int floorId, Building building) {
        Optional<Floor> optionalFloor = this.floorRepository.findByName("EG " + floorId);
        if (optionalFloor.isPresent()) {
            Floor floor = optionalFloor.get();
            floor.setBuilding(building);
            logger.debug(floor.toString());
            logger.debug(building.getName());
            this.floorRepository.save(floor);
        } else {
            logger.debug(this.floorRepository.save(new Floor("EG " + floorId, building)).toString());
        }
    }

    private void createSlotsNormal(Floor floor, Type type) {
        for (int i = 1; i <= 10; i++) {
            this.createSlot(floor, type, i);
        }
    }

    private void createSlotsECar(Floor floor, Type type) {
        for (int i = 11; i <= 15; i++) {
            this.createSlot(floor, type, i);
        }
    }

    private void createSlotsHandicap(Floor floor, Type type) {
        for (int i = 16; i <= 17; i++) {
            this.createSlot(floor, type, i);
        }
    }

    private void createSlotsWoman(Floor floor, Type type) {
        for (int i = 18; i <= 20; i++) {
            this.createSlot(floor, type, i);
        }
    }

    private void createSlot(Floor floor, Type type, int slotId) {
        int floorId = Math.toIntExact(floor.getId());
        String slotName = (slotId < 10) ? "P-" + floorId + "0" + slotId : "P-" + floorId + slotId;
        Optional<Slot> optionalSlot = this.slotRepository.findByName(slotName);
        if (optionalSlot.isPresent()) {
            optionalSlot.get().setFloor(floor);
            this.slotRepository.save(optionalSlot.get());
        } else {
            this.slotRepository.save(new Slot(slotName, type, floor));
        }
    }

    private void createReservation(int id, Period period) {
        Optional<User> optionalUser = this.userRepository.findById((long) id);
        Optional<NfcCard> optionalNfcCard = this.nfcCardRepository.findById((long) id);
        Optional<Slot> optionalSlot = this.slotRepository.findById((long) id);
        if (optionalUser.isPresent() && optionalNfcCard.isPresent() && optionalSlot.isPresent()) {
            Reservation reservation = new Reservation(LocalDateTime.now(), period, optionalUser.get(), null, optionalNfcCard.get(), optionalSlot.get());
            this.reservationRepository.save(reservation);
        }
    }
}