package edu.fra.uas.parking.config;


import edu.fra.uas.parking.entity.*;
import edu.fra.uas.parking.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.*;

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

        this.parkRepository.save(new Park("Frankfurt"));
        this.parkRepository.save(new Park("Wiesbaden"));
        this.parkRepository.save(new Park("Köln"));
        this.parkRepository.save(new Park("Berlin"));

        for (int i = 0; i < 12; i++) {
            if (i % 3 == 0 && i != 0) {
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
                    this.typeRepository.getById((long) type));
            if (type == 4) {
                type = 1;
            }
            this.slotRepository.save(slot);
        }
        Set<Privilege> privileges = new HashSet<>();

        privileges.add(new Privilege("VIEW_ADDRESSES"));
        privileges.add(new Privilege("VIEW_ADDRESS"));
        privileges.add(new Privilege("ADD_ADDRESSES"));
        privileges.add(new Privilege("UPDATE_ADDRESS"));
        privileges.add(new Privilege("DELETE_ADDRESSES"));

        privileges.add(new Privilege("VIEW_BUILDINGS"));
        privileges.add(new Privilege("VIEW_BUILDING"));
        privileges.add(new Privilege("ADD_BUILDING"));
        privileges.add(new Privilege("UPDATE_BUILDING"));
        privileges.add(new Privilege("DELETE_BUILDING"));

        privileges.add(new Privilege("VIEW_FLOORS"));
        privileges.add(new Privilege("VIEW_FLOOR"));
        privileges.add(new Privilege("ADD_FLOOR"));
        privileges.add(new Privilege("UPDATE_FLOOR"));
        privileges.add(new Privilege("DELETE_FLOOR"));

        privileges.add(new Privilege("VIEW_GUESTS"));
        privileges.add(new Privilege("VIEW_GUEST"));
        privileges.add(new Privilege("ADD_GUEST"));
        privileges.add(new Privilege("UPDATE_GUEST"));
        privileges.add(new Privilege("DELETE_GUEST"));

        privileges.add(new Privilege("VIEW_NFCCARDS"));
        privileges.add(new Privilege("VIEW_NFCCARD"));
        privileges.add(new Privilege("ADD_NFCCARD"));
        privileges.add(new Privilege("UPDATE_NFCCARD"));
        privileges.add(new Privilege("DELETE_NFCCARD"));

        privileges.add(new Privilege("VIEW_PARKS"));
        privileges.add(new Privilege("VIEW_PARK"));
        privileges.add(new Privilege("ADD_PARK"));
        privileges.add(new Privilege("UPDATE_PARK"));
        privileges.add(new Privilege("DELETE_PARK"));

        privileges.add(new Privilege("VIEW_PRIVILEGES"));
        privileges.add(new Privilege("VIEW_PRIVILEGE"));
        privileges.add(new Privilege("ADD_PRIVILEGE"));
        privileges.add(new Privilege("UPDATE_PRIVILEGE"));
        privileges.add(new Privilege("DELETE_PRIVILEGE"));

        privileges.add(new Privilege("VIEW_RESERVATIONS"));
        privileges.add(new Privilege("VIEW_RESERVATION"));
        privileges.add(new Privilege("ADD_RESERVATION"));
        privileges.add(new Privilege("UPDATE_RESERVATION"));
        privileges.add(new Privilege("DELETE_RESERVATION"));

        privileges.add(new Privilege("VIEW_ROLES"));
        privileges.add(new Privilege("VIEW_ROLE"));
        privileges.add(new Privilege("ADD_ROLE"));
        privileges.add(new Privilege("UPDATE_ROLE"));
        privileges.add(new Privilege("DELETE_ROLE"));

        privileges.add(new Privilege("VIEW_SLOTS"));
        privileges.add(new Privilege("VIEW_SLOT"));
        privileges.add(new Privilege("ADD_SLOT"));
        privileges.add(new Privilege("UPDATE_SLOT"));
        privileges.add(new Privilege("DELETE_SLOT"));

        privileges.add(new Privilege("VIEW_TYPES"));
        privileges.add(new Privilege("VIEW_TYPE"));
        privileges.add(new Privilege("ADD_TYPE"));
        privileges.add(new Privilege("UPDATE_TYPE"));
        privileges.add(new Privilege("DELETE_TYPE"));

        privileges.add(new Privilege("VIEW_USERS"));
        privileges.add(new Privilege("VIEW_USER"));
        privileges.add(new Privilege("ADD_USER"));
        privileges.add(new Privilege("UPDATE_USER"));
        privileges.add(new Privilege("DELETE_USER"));

        privilegeRepository.saveAll(privileges);

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
            if (i == 100) {
                user.setRole(roleAdmin);
            } else {
                user.setRole(roleUser);
            }
            this.userRepository.save(user);
        }
        User user = new User("pms", "pms", "pms@alnaasan.de", "pms");
        this.userRepository.save(user);

        for (int i = 1; i <= 100; i++) {
            NfcCard nfcCard = new NfcCard("nfc" + i, this.userRepository.getById((long) i));
            nfcCardRepository.save(nfcCard);
        }
        for (int i = 1; i <= 30; i++) {
            Guest guest = new Guest("guest" + i, "guest" + i);
            guestRepository.save(guest);
        }
        for (int i = 10; i <= 100; i++) {
            Reservation reservation = (i % 2 == 0)
                    ? new Reservation(LocalDateTime.now(), Period.MORNING, null, null, this.nfcCardRepository.findById((long) (i / 10.0)).get(), this.slotRepository.findById((long) (i / 10)).get())
                    : new Reservation(LocalDateTime.now(), Period.AFTERNOON, null, null, this.nfcCardRepository.findById((long) (i / 10.0)).get(), this.slotRepository.findById((long) (i / 10)).get());
            this.reservationRepository.save(reservation);
        }
    }
}