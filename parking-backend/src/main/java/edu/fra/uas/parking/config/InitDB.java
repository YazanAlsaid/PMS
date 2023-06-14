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

    @Autowired
    private ParkRepository parkRepository;
    @Autowired
    private BuildingRepository buildingRepository;
    @Autowired
    private FloorRepository floorRepository;
    @Autowired
    private SlotRepository slotRepository;
    @Autowired
    private TypeRepository typeRepository;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    PrivilegeRepository privilegeRepository;
    @Autowired
    private NfcCardRepository nfcCardRepository;
    @Autowired
    private GuestRepository guestRepository;
    @Autowired
    private AddressRepository addressRepository;
    private int count = 1;
    private int type = 1;

    @PostConstruct
    public void init() {

        LOGGER.debug("Init Databases started...");

        for (int i = 1; i <= 10; i++) {
            Park park = new Park();
            park.setName("park" + i);
            this.parkRepository.save(park);
        }
        for (int i = 0; i < 10; i++) {
            if(i%2 == 0 && i != 0) {count++;}
            Building building = new Building("building"+(i+1),this.parkRepository.getById(Long.valueOf(count)));
            this.buildingRepository.save(building);
        }
        for(int i = 0; i < 10; i++){
            Address address = new Address("street"+(i+1),
                                          100+i,
                                          (i+1)+60400,
                                          "city"+i,
                                          this.buildingRepository.getById(Long.valueOf(i+1)));
            addressRepository.save(address);
        }
        this.count = 1;
        for (int i = 0; i < 20; i++) {
            if(i%2 == 0 && i != 0) {count++;}
            Floor floor = new Floor("floor" +(i+1),this.buildingRepository.getById(Long.valueOf(count)));
            this.floorRepository.save(floor);
        }
        for (int i = 1; i <= 5; i++) {
            Type type = new Type();
            type.setName("type" + i);
            this.typeRepository.save(type);
        }
        this.count = 1;
        for (int i = 0; i < 200; i++) {
            if(i%10 == 0 && i != 0 ) {count++;}
            if(type <= 4 && (i%5 == 0 && i != 0)) {type++;}
            Slot slot = new Slot("slot" +(i+1),
                                  this.floorRepository.getById(Long.valueOf(count)),
                                  this.typeRepository.getById(Long.valueOf(type)));
            if(type == 4) {type = 1;}
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
        roleUser=this.roleRepository.save(roleUser);

        roleAdmin.setPrivileges(this.privilegeRepository.findAll());
        roleAdmin = roleRepository.save(roleAdmin);
        roleUser.setPrivileges(this.privilegeRepository.findAll());
        roleUser = roleRepository.save(roleUser);

        for (int i = 1; i <= 100; i++) {
            User user = new User("user" + i, "user" + i, "user" + i + "@user.com", "user" + i);
            if (i == 100){
                user.setRole(roleAdmin);
            }
            else
            user.setRole(roleUser);
            this.userRepository.save(user);
        }
        for (int i = 1; i <= 100; i++){
            NfcCard nfcCard = new NfcCard("nfc"+ i,this.userRepository.getById(Long.valueOf(i)));
            nfcCardRepository.save(nfcCard);
        }
        for (int i = 1; i <= 30; i++ ){
            Guest guest = new Guest("guest"+ i,"guest" + i);
            guestRepository.save(guest);
        }
        for (int i = 1; i <= 100; i++) {
            Reservation reservation = new Reservation(LocalDateTime.now(), LocalDateTime.now());
           /* Reservation reservation = new Reservation(LocalDateTime.now(),
                    LocalDateTime.now(),
                    this.userRepository.getById(Long.valueOf(i)),
                    this.guestRepository.getById(Long.valueOf(i)),
                    this.nfcCardRepository.getById(Long.valueOf(i)),
                    this.slotRepository.getById(Long.valueOf(i)));
                    this.reservationRepository.save(reservation);

            */
            this.reservationRepository.save(reservation);
        }


    }
}