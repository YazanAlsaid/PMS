package edu.fra.uas.parking.config;


import edu.fra.uas.parking.entity.*;
import edu.fra.uas.parking.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import javax.annotation.PostConstruct;
import java.time.LocalDateTime;

import static org.hibernate.tool.schema.SchemaToolingLogging.LOGGER;


@Component
public class InitDB {

    private final ParkRepository parkRepository;
    private final BuildingRepository buildingRepository;
    private final FloorRepository floorRepository;
    private final SlotRepository slotRepository;
    private final TypeRepository typeRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    final
    PrivilegeRepository privilegeRepository;
    private final NfcCardRepository nfcCardRepository;
    private final GuestRepository guestRepository;
    private final AddressRepository addressRepository;
    private int count = 1;
    private int type = 1;

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

        LOGGER.debug("Init Databases started...");

        for (int i = 1; i <= 10; i++) {
            Park park = new Park();
            park.setName("park" + i);
            this.parkRepository.save(park);
        }
        for (int i = 0; i < 10; i++) {
            if (i % 2 == 0 && i != 0) {
                count++;
            }
            Building building = new Building("building" + (i + 1), this.parkRepository.getById((long) count));
            this.buildingRepository.save(building);
        }
        for (int i = 0; i < 10; i++) {
            Address address = new Address("street" + (i + 1),
                    100 + i,
                    (i + 1) + 60400,
                    "city" + i,
                    this.buildingRepository.getById((long) (i + 1)));
            addressRepository.save(address);
        }
        this.count = 1;
        for (int i = 0; i < 20; i++) {
            if (i % 2 == 0 && i != 0) {
                count++;
            }
            Floor floor = new Floor("floor" + (i + 1), this.buildingRepository.getById((long) count));
            this.floorRepository.save(floor);
        }
        for (int i = 1; i <= 5; i++) {
            Type type = new Type();
            type.setName("type" + i);
            this.typeRepository.save(type);
        }
        this.count = 1;
        for (int i = 0; i < 200; i++) {
            if (i % 10 == 0 && i != 0) {
                count++;
            }
            if (type <= 4 && (i % 5 == 0 && i != 0)) {
                type++;
            }
            Slot slot = new Slot("slot" + (i + 1),
                    this.floorRepository.getById((long) count),
                    this.typeRepository.getById((long) type));
            if (type == 4) {
                type = 1;
            }
            this.slotRepository.save(slot);
        }
        for (int i = 1; i <= 30; i++) {
            Privilege privilege = new Privilege();
            privilege.setName("privilege" + i);
            this.privilegeRepository.save(privilege);
        }
        // roles
        Role roleAdmin = new Role("ADMIN");
        roleAdmin = roleRepository.save(roleAdmin);
        Role roleUser = new Role("USER");
        roleUser = this.roleRepository.save(roleUser);

        for (Privilege privilege : this.privilegeRepository.findAll()){
            roleAdmin.setPrivilege(privilege);
            roleUser.setPrivilege(privilege);
        }

        roleAdmin = roleRepository.save(roleAdmin);
        roleUser = roleRepository.save(roleUser);

        for (int i = 1; i <= 100; i++) {
            User user = new User("user" + i, "user" + i, "user" + i + "@user.com", "user" + i);
            if (i == 100) {
                user.setRole(roleAdmin);
            } else {
                user.setRole(roleUser);
            }
            this.userRepository.save(user);
        }
        for (int i = 1; i <= 100; i++) {
            NfcCard nfcCard = new NfcCard("nfc" + i, this.userRepository.getById((long) i));
            nfcCardRepository.save(nfcCard);
        }
        for (int i = 1; i <= 30; i++) {
            Guest guest = new Guest("guest" + i, "guest" + i);
            guestRepository.save(guest);
        }
        for (int i = 1; i <= 100; i++) {
            Reservation reservation = new Reservation(LocalDateTime.now(), LocalDateTime.now());
            this.reservationRepository.save(reservation);
        }
    }
}