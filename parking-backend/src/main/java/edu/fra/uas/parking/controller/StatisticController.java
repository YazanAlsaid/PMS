package edu.fra.uas.parking.controller;


import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Reservation;
import edu.fra.uas.parking.repository.*;
import edu.fra.uas.parking.statistic.Statistic;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.WeekFields;
import java.util.Locale;


@RestController
@RequestMapping("/statistics")
public class StatisticController {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private ReservationRepository reservationRepository;
    private UserRepository userRepository;
    private ParkRepository parkRepository;
    private BuildingRepository buildingRepository;
    private SlotRepository slotRepository;

    @Autowired
    public StatisticController(ReservationRepository reservationRepository, UserRepository userRepository, ParkRepository parkRepository, BuildingRepository buildingRepository, SlotRepository slotRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.parkRepository = parkRepository;
        this.buildingRepository = buildingRepository;
        this.slotRepository = slotRepository;
    }

    @GetMapping("VIEW_NUMBERS")
    public ResponseEntity<ResponseMessage> getAllAttributes(){

         Long numberOFUsers = userRepository.count();
         Long numberOfParks = parkRepository.count();
         Long numberOfBuildings = buildingRepository.count();
         Long numberOfSlots = slotRepository.count();
        Statistic statistics= new Statistic(numberOFUsers, numberOfParks, numberOfBuildings,numberOfSlots);
        return this.message("All Counts of Attributes",statistics,HttpStatus.OK);
    }
    @GetMapping("VIEW_STATISTICS_WEEK")
    public ResponseEntity<ResponseMessage> getNumberOfReservationInEachWeek() {

        CollectionModel<Reservation> reservations = CollectionModel.of(this.reservationRepository.findAll());

        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int numOfWeeks = LocalDate.now().get(weekFields.weekOfYear());
        int[] countByWeek = new int[numOfWeeks];

        for (Reservation reservation : reservations) {
            LocalDate reservationDate = LocalDate.parse(reservation.getReservationAt().format(DateTimeFormatter.ISO_LOCAL_DATE), this.formatter);
            if (reservationDate.getYear() == LocalDate.now().getYear()) {
                int weekIndex = reservationDate.get(weekFields.weekOfYear()) - 1;
                countByWeek[weekIndex]++;
            }
        }
        return this.message("Reservation counts by week", countByWeek, HttpStatus.OK);
    }
    @GetMapping("VIEW_STATISTICS_MONTH")
    public ResponseEntity<ResponseMessage> getNumberOfReservationInEachMonth() {

        CollectionModel<Reservation> reservations = CollectionModel.of(this.reservationRepository.findAll());

        int[] countByMonth = new int[12];
            for (Reservation reservation : reservations) {
                LocalDate reservationDate = LocalDate.parse(reservation.getReservationAt().format(DateTimeFormatter.ISO_LOCAL_DATE),this.formatter);
                if (reservationDate.getYear() == LocalDate.now().getYear()) {
                    int monthIndex = reservationDate.getMonthValue() - 1;
                    countByMonth[monthIndex]++;
                   }
               }
        return this.message("Reservation counts by month", countByMonth, HttpStatus.OK);
        }
        private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus){
            return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
        }
}

