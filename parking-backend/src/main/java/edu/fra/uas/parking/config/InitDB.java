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



    @PostConstruct
    public void init() {

        LOGGER.debug("Init Databases started...");

        for(int i = 1 ; i <= 10 ; i++){
            Park park = new Park();
            park.setName("park "+i);
            this.parkRepository.save(park);
        }
        for(int i = 1 ; i <= 10 ; i++) {
            Building building = new Building();
            building.setName("building"+i);
            this.buildingRepository.save(building);
        }
        for(int i = 1 ; i <= 10 ; i++) {
            Floor floor = new Floor();
            floor.setName("floor"+i);
            this.floorRepository.save(floor);
        }
        for(int i = 1 ; i <= 100 ; i++) {
            Slot slot = new Slot();
            slot.setName("slot "+i);
            this.slotRepository.save(slot);
        }
        for(int i = 1;i <= 10 ; i++){
            Type type = new Type();
            type.setName("type "+i);
            this.typeRepository.save(type);
        }
        for(int i = 1;i <= 100 ; i++){
            Reservation reservation = new Reservation();
            reservation.setReservationFrom(LocalDateTime.now());
            reservation.setReservationTo(LocalDateTime.now());
            this.reservationRepository.save(reservation);
        }
        for(int i = 1;i <= 100 ; i++){
            User user = new User();
            user.setFirstName("user "+i);
            user.setLastName("user "+i);
            user.setEmail("user"+i+"@user.com");
            user.setPassword("user"+i);
            this.userRepository.save(user);
        }
        for(int i = 1;i <= 30 ; i++){
            Role role = new Role();
            role.setName("role"+i);
            this.roleRepository.save(role);
        }
        for(int i = 1;i <= 30 ; i++){
            Privilege privilege = new Privilege();
            privilege.setName("privilege"+i);
            this.privilegeRepository.save(privilege);
        }
    }


}
