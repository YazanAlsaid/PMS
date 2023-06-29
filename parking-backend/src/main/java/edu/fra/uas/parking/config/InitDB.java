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
        this.createUsers(roleUser);
        User admin = new User("PMS","PMS",Gender.MALE, "pms@alnaasan.de","pms123456");
        admin.setRole(roleAdmin);
        this.userRepository.save(admin);

        for (int i = 1; i <= this.userRepository.count(); i++) {
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
            Reservation reservation = new Reservation(LocalDate.now(), period, optionalUser.get(), null, optionalNfcCard.get(), optionalSlot.get());
            this.reservationRepository.save(reservation);
        }
    }

    private void createUsers(Role role){
        Set<User> users = new HashSet<>();
        users.add(new User("Davenport", "Dennis", Gender.MALE, "davenportdennis@pms.de", "pms123456"));
        users.add(new User("Bryant", "Cantu", Gender.MALE, "bryantcantu@pms.de", "pms123456"));
        users.add(new User("Christian", "Houston", Gender.MALE, "christianhouston@pms.de", "pms123456"));
        users.add(new User("Blackburn", "Dixon", Gender.MALE, "blackburndixon@pms.de", "pms123456"));
        users.add(new User("Ramos", "Sellers", Gender.MALE, "ramossellers@pms.de", "pms123456"));
        users.add(new User("Walker", "Simmons", Gender.MALE, "walkersimmons@pms.de", "pms123456"));
        users.add(new User("Guthrie", "Petty", Gender.MALE, "guthriepetty@pms.de", "pms123456"));
        users.add(new User("Mia", "Rogers", Gender.FEMALE, "miarogers@pms.de", "pms123456"));
        users.add(new User("Oconnor", "Hooper", Gender.MALE, "oconnorhooper@pms.de", "pms123456"));
        users.add(new User("Lina", "Hinton", Gender.FEMALE, "linahinton@pms.de", "pms123456"));
        users.add(new User("Celina", "Wilkins", Gender.FEMALE, "celinawilkins@pms.de", "pms123456"));
        users.add(new User("Laurel", "Talley", Gender.FEMALE, "laureltalley@pms.de", "pms123456"));
        users.add(new User("Bernard", "Macdonald", Gender.MALE, "bernardmacdonald@pms.de", "pms123456"));
        users.add(new User("Bernadette", "Boyle", Gender.FEMALE, "bernadetteboyle@pms.de", "pms123456"));
        users.add(new User("Jewel", "Mullins", Gender.FEMALE, "jewelmullins@pms.de", "pms123456"));
        users.add(new User("Hunt", "Carpenter", Gender.MALE, "huntcarpenter@pms.de", "pms123456"));
        users.add(new User("Vivian", "Chandler", Gender.FEMALE, "vivianchandler@pms.de", "pms123456"));
        users.add(new User("Orr", "Goodwin", Gender.MALE, "orrgoodwin@pms.de", "pms123456"));
        users.add(new User("Cooper", "Horn", Gender.MALE, "cooperhorn@pms.de", "pms123456"));
        users.add(new User("Bruce", "Maynard", Gender.MALE, "brucemaynard@pms.de", "pms123456"));
        users.add(new User("Adrian", "Sanders", Gender.FEMALE, "adriansanders@pms.de", "pms123456"));
        users.add(new User("Cox", "Abbott", Gender.MALE, "coxabbott@pms.de", "pms123456"));
        users.add(new User("Vanessa", "Ferguson", Gender.FEMALE, "vanessaferguson@pms.de", "pms123456"));
        users.add(new User("Bobbi", "Kinney", Gender.FEMALE, "bobbikinney@pms.de", "pms123456"));
        users.add(new User("Rodriguez", "Chase", Gender.MALE, "rodriguezchase@pms.de", "pms123456"));
        users.add(new User("Holland", "Compton", Gender.MALE, "hollandcompton@pms.de", "pms123456"));
        users.add(new User("Fields", "Klein", Gender.MALE, "fieldsklein@pms.de", "pms123456"));
        users.add(new User("Rose", "Crosby", Gender.FEMALE, "rosecrosby@pms.de", "pms123456"));
        users.add(new User("Gail", "Craig", Gender.FEMALE, "gailcraig@pms.de", "pms123456"));
        users.add(new User("Leann", "Austin", Gender.FEMALE, "leannaustin@pms.de", "pms123456"));
        users.add(new User("Tran", "Nixon", Gender.MALE, "trannixon@pms.de", "pms123456"));
        users.add(new User("Knox", "Gilmore", Gender.MALE, "knoxgilmore@pms.de", "pms123456"));
        users.add(new User("Gallagher", "Mcleod", Gender.MALE, "gallaghermcleod@pms.de", "pms123456"));
        users.add(new User("Connie", "Henry", Gender.FEMALE, "conniehenry@pms.de", "pms123456"));
        users.add(new User("Janna", "Lynch", Gender.FEMALE, "jannalynch@pms.de", "pms123456"));
        users.add(new User("Lucia", "Bonner", Gender.FEMALE, "luciabonner@pms.de", "pms123456"));
        users.add(new User("Mclean", "Hale", Gender.MALE, "mcleanhale@pms.de", "pms123456"));
        users.add(new User("Rosario", "Gates", Gender.MALE, "rosariogates@pms.de", "pms123456"));
        users.add(new User("Gardner", "Mcguire", Gender.MALE, "gardnermcguire@pms.de", "pms123456"));
        users.add(new User("Eunice", "Rowe", Gender.FEMALE, "eunicerowe@pms.de", "pms123456"));
        users.add(new User("Debora", "Hardin", Gender.FEMALE, "deborahardin@pms.de", "pms123456"));
        users.add(new User("Vonda", "Lancaster", Gender.FEMALE, "vondalancaster@pms.de", "pms123456"));
        users.add(new User("Rios", "Cline", Gender.MALE, "rioscline@pms.de", "pms123456"));
        users.add(new User("Howard", "Payne", Gender.MALE, "howardpayne@pms.de", "pms123456"));
        users.add(new User("Gutierrez", "Valdez", Gender.MALE, "gutierrezvaldez@pms.de", "pms123456"));
        users.add(new User("Jefferson", "Boyer", Gender.MALE, "jeffersonboyer@pms.de", "pms123456"));
        users.add(new User("Summers", "Mercado", Gender.MALE, "summersmercado@pms.de", "pms123456"));
        users.add(new User("Cathryn", "Coffey", Gender.FEMALE, "cathryncoffey@pms.de", "pms123456"));
        users.add(new User("Mcfadden", "Gomez", Gender.MALE, "mcfaddengomez@pms.de", "pms123456"));
        users.add(new User("Susan", "Taylor", Gender.FEMALE, "susantaylor@pms.de", "pms123456"));
        users.add(new User("Maricela", "Franco", Gender.FEMALE, "maricelafranco@pms.de", "pms123456"));
        users.add(new User("Jeannie", "Bush", Gender.FEMALE, "jeanniebush@pms.de", "pms123456"));
        users.add(new User("Maryellen", "Leach", Gender.FEMALE, "maryellenleach@pms.de", "pms123456"));
        users.add(new User("Foreman", "Frazier", Gender.MALE, "foremanfrazier@pms.de", "pms123456"));
        users.add(new User("Bridges", "Burke", Gender.MALE, "bridgesburke@pms.de", "pms123456"));
        users.add(new User("King", "Walsh", Gender.MALE, "kingwalsh@pms.de", "pms123456"));
        users.add(new User("Neva", "Lucas", Gender.FEMALE, "nevalucas@pms.de", "pms123456"));
        users.add(new User("Allison", "Holman", Gender.MALE, "allisonholman@pms.de", "pms123456"));
        users.add(new User("Felicia", "Rose", Gender.FEMALE, "feliciarose@pms.de", "pms123456"));
        users.add(new User("Elinor", "Hayden", Gender.FEMALE, "elinorhayden@pms.de", "pms123456"));
        users.add(new User("David", "Mitchell", Gender.MALE, "davidmitchell@pms.de", "pms123456"));
        users.add(new User("Houston", "Monroe", Gender.MALE, "houstonmonroe@pms.de", "pms123456"));
        users.add(new User("Small", "Wall", Gender.MALE, "smallwall@pms.de", "pms123456"));
        users.add(new User("Barbra", "Briggs", Gender.FEMALE, "barbrabriggs@pms.de", "pms123456"));
        users.add(new User("Sexton", "Jennings", Gender.MALE, "sextonjennings@pms.de", "pms123456"));
        users.add(new User("Joy", "Michael", Gender.FEMALE, "joymichael@pms.de", "pms123456"));
        users.add(new User("Parsons", "Wynn", Gender.MALE, "parsonswynn@pms.de", "pms123456"));
        users.add(new User("Rosemarie", "Olson", Gender.FEMALE, "rosemarieolson@pms.de", "pms123456"));
        users.add(new User("Brianna", "Robertson", Gender.FEMALE, "briannarobertson@pms.de", "pms123456"));
        users.add(new User("Brittney", "Johnston", Gender.FEMALE, "brittneyjohnston@pms.de", "pms123456"));
        users.add(new User("Dorsey", "Harding", Gender.MALE, "dorseyharding@pms.de", "pms123456"));
        users.add(new User("Isabelle", "Crawford", Gender.FEMALE, "isabellecrawford@pms.de", "pms123456"));
        users.add(new User("Delaney", "Davidson", Gender.MALE, "delaneydavidson@pms.de", "pms123456"));
        users.add(new User("Carissa", "English", Gender.FEMALE, "carissaenglish@pms.de", "pms123456"));
        users.add(new User("Hogan", "Black", Gender.MALE, "hoganblack@pms.de", "pms123456"));
        users.add(new User("Lara", "Dorsey", Gender.FEMALE, "laradorsey@pms.de", "pms123456"));
        users.add(new User("Noelle", "Hopkins", Gender.FEMALE, "noellehopkins@pms.de", "pms123456"));
        users.add(new User("Cunningham", "Moody", Gender.MALE, "cunninghammoody@pms.de", "pms123456"));
        users.add(new User("Francis", "Wiley", Gender.FEMALE, "franciswiley@pms.de", "pms123456"));
        users.add(new User("Rena", "Riddle", Gender.FEMALE, "renariddle@pms.de", "pms123456"));
        users.add(new User("Georgette", "Greer", Gender.FEMALE, "georgettegreer@pms.de", "pms123456"));
        users.add(new User("Jerri", "Rodriquez", Gender.FEMALE, "jerrirodriquez@pms.de", "pms123456"));
        users.add(new User("Osborn", "Slater", Gender.MALE, "osbornslater@pms.de", "pms123456"));
        users.add(new User("Moran", "Newman", Gender.MALE, "morannewman@pms.de", "pms123456"));
        users.add(new User("Rosalie", "Solomon", Gender.FEMALE, "rosaliesolomon@pms.de", "pms123456"));
        users.add(new User("Oneill", "Cain", Gender.MALE, "oneillcain@pms.de", "pms123456"));
        users.add(new User("Horne", "Mcgowan", Gender.MALE, "hornemcgowan@pms.de", "pms123456"));
        users.add(new User("Olivia", "Molina", Gender.FEMALE, "oliviamolina@pms.de", "pms123456"));
        users.add(new User("Ramsey", "Walker", Gender.MALE, "ramseywalker@pms.de", "pms123456"));
        users.add(new User("French", "Rowland", Gender.MALE, "frenchrowland@pms.de", "pms123456"));
        users.add(new User("Tabitha", "Mcdonald", Gender.FEMALE, "tabithamcdonald@pms.de", "pms123456"));
        users.add(new User("Ashlee", "Noel", Gender.FEMALE, "ashleenoel@pms.de", "pms123456"));
        users.add(new User("Margery", "Hicks", Gender.FEMALE, "margeryhicks@pms.de", "pms123456"));
        users.add(new User("Lynn", "Gordon", Gender.MALE, "lynngordon@pms.de", "pms123456"));
        users.add(new User("Walters", "Sanford", Gender.MALE, "walterssanford@pms.de", "pms123456"));
        users.add(new User("Michele", "Hayes", Gender.FEMALE, "michelehayes@pms.de", "pms123456"));
        users.add(new User("Reeves", "Leon", Gender.MALE, "reevesleon@pms.de", "pms123456"));
        users.add(new User("Hoover", "Young", Gender.MALE, "hooveryoung@pms.de", "pms123456"));
        users.add(new User("Cash", "Bates", Gender.MALE, "cashbates@pms.de", "pms123456"));
        users.add(new User("Wilcox", "Hays", Gender.MALE, "wilcoxhays@pms.de", "pms123456"));
        users.add(new User("Briggs", "Sandoval", Gender.MALE, "briggssandoval@pms.de", "pms123456"));
        users.add(new User("Gay", "Boone", Gender.FEMALE, "gayboone@pms.de", "pms123456"));
        users.add(new User("Letitia", "Skinner", Gender.FEMALE, "letitiaskinner@pms.de", "pms123456"));
        users.add(new User("Riddle", "Underwood", Gender.MALE, "riddleunderwood@pms.de", "pms123456"));
        users.add(new User("Colon", "Woodward", Gender.MALE, "colonwoodward@pms.de", "pms123456"));
        users.add(new User("Travis", "Vance", Gender.MALE, "travisvance@pms.de", "pms123456"));
        users.add(new User("Victoria", "Ferrell", Gender.FEMALE, "victoriaferrell@pms.de", "pms123456"));
        users.add(new User("Elsie", "Hoover", Gender.FEMALE, "elsiehoover@pms.de", "pms123456"));
        users.add(new User("Boyle", "Blackburn", Gender.MALE, "boyleblackburn@pms.de", "pms123456"));
        users.add(new User("Boone", "Goff", Gender.MALE, "boonegoff@pms.de", "pms123456"));
        users.add(new User("April", "Cabrera", Gender.FEMALE, "aprilcabrera@pms.de", "pms123456"));
        users.add(new User("Goodman", "Delacruz", Gender.MALE, "goodmandelacruz@pms.de", "pms123456"));
        users.add(new User("Schmidt", "White", Gender.MALE, "schmidtwhite@pms.de", "pms123456"));
        users.add(new User("Daniel", "Burgess", Gender.MALE, "danielburgess@pms.de", "pms123456"));
        users.add(new User("Kristen", "Mcdowell", Gender.FEMALE, "kristenmcdowell@pms.de", "pms123456"));
        users.add(new User("Susana", "Harper", Gender.FEMALE, "susanaharper@pms.de", "pms123456"));
        users.add(new User("Sophie", "Nieves", Gender.FEMALE, "sophienieves@pms.de", "pms123456"));
        users.add(new User("Teresa", "Pennington", Gender.FEMALE, "teresapennington@pms.de", "pms123456"));
        users.add(new User("Stanton", "Harrison", Gender.MALE, "stantonharrison@pms.de", "pms123456"));
        users.add(new User("Vera", "Francis", Gender.FEMALE, "verafrancis@pms.de", "pms123456"));
        users.add(new User("Martinez", "Eaton", Gender.MALE, "martinezeaton@pms.de", "pms123456"));
        users.add(new User("Pam", "Parsons", Gender.FEMALE, "pamparsons@pms.de", "pms123456"));
        users.add(new User("Sherman", "Collins", Gender.MALE, "shermancollins@pms.de", "pms123456"));
        users.add(new User("Geneva", "Hyde", Gender.FEMALE, "genevahyde@pms.de", "pms123456"));
        users.add(new User("Esperanza", "Byers", Gender.FEMALE, "esperanzabyers@pms.de", "pms123456"));
        users.add(new User("Sharpe", "Morton", Gender.MALE, "sharpemorton@pms.de", "pms123456"));
        users.add(new User("England", "May", Gender.MALE, "englandmay@pms.de", "pms123456"));
        users.add(new User("May", "Wolf", Gender.FEMALE, "maywolf@pms.de", "pms123456"));
        users.add(new User("Kasey", "Park", Gender.FEMALE, "kaseypark@pms.de", "pms123456"));
        users.add(new User("Griffith", "Webster", Gender.MALE, "griffithwebster@pms.de", "pms123456"));
        users.add(new User("Hughes", "Green", Gender.MALE, "hughesgreen@pms.de", "pms123456"));
        users.add(new User("Lawrence", "Grant", Gender.MALE, "lawrencegrant@pms.de", "pms123456"));
        users.add(new User("Solomon", "Osborne", Gender.MALE, "solomonosborne@pms.de", "pms123456"));
        users.add(new User("Guerrero", "Dillon", Gender.MALE, "guerrerodillon@pms.de", "pms123456"));
        users.add(new User("Miriam", "Vincent", Gender.FEMALE, "miriamvincent@pms.de", "pms123456"));
        users.add(new User("Rogers", "Donovan", Gender.MALE, "rogersdonovan@pms.de", "pms123456"));
        users.add(new User("Sharp", "Hansen", Gender.MALE, "sharphansen@pms.de", "pms123456"));
        users.add(new User("Etta", "Smith", Gender.FEMALE, "ettasmith@pms.de", "pms123456"));
        users.add(new User("Cristina", "Prince", Gender.FEMALE, "cristinaprince@pms.de", "pms123456"));
        users.add(new User("Dodson", "Burton", Gender.MALE, "dodsonburton@pms.de", "pms123456"));
        users.add(new User("Aline", "Barr", Gender.FEMALE, "alinebarr@pms.de", "pms123456"));
        users.add(new User("Edwina", "Tyler", Gender.FEMALE, "edwinatyler@pms.de", "pms123456"));
        users.add(new User("Emma", "Bass", Gender.FEMALE, "emmabass@pms.de", "pms123456"));
        users.add(new User("Erika", "Short", Gender.FEMALE, "erikashort@pms.de", "pms123456"));
        users.add(new User("Ginger", "Vaughan", Gender.FEMALE, "gingervaughan@pms.de", "pms123456"));
        users.add(new User("Stevenson", "Owens", Gender.MALE, "stevensonowens@pms.de", "pms123456"));
        users.add(new User("Soto", "Hood", Gender.MALE, "sotohood@pms.de", "pms123456"));
        users.add(new User( "Monica",  "Bean",  Gender.FEMALE,  "monicabean@pms.de",  "pms123456"));
        users.add(new User( "Fulton",  "Randall",  Gender.MALE,  "fultonrandall@pms.de",  "pms123456"));
        users.add(new User( "Lessie",  "Holmes",  Gender.FEMALE,  "lessieholmes@pms.de",  "pms123456"));
        for (User user : users) {
            user.setRole(role);
        }
        this.userRepository.saveAll(users);
    }
}