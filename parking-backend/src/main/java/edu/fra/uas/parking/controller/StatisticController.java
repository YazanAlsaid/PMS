package edu.fra.uas.parking.controller;


import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Reservation;
import edu.fra.uas.parking.repository.BuildingRepository;
import edu.fra.uas.parking.repository.ParkRepository;
import edu.fra.uas.parking.repository.ReservationRepository;
import edu.fra.uas.parking.repository.SlotRepository;
import edu.fra.uas.parking.repository.UserRepository;
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
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;
    private final ParkRepository parkRepository;
    private final BuildingRepository buildingRepository;
    private final SlotRepository slotRepository;

    @Autowired
    public StatisticController(ReservationRepository reservationRepository, UserRepository userRepository, ParkRepository parkRepository, BuildingRepository buildingRepository, SlotRepository slotRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
        this.parkRepository = parkRepository;
        this.buildingRepository = buildingRepository;
        this.slotRepository = slotRepository;
    }

    @GetMapping("view-numbers")
    public ResponseEntity<ResponseMessage> getAllAttributes() {
        long numberOFUsers = userRepository.count();
        long numberOfParks = parkRepository.count();
        long numberOfBuildings = buildingRepository.count();
        long numberOfSlots = slotRepository.count();
        Statistic statistics = new Statistic(numberOFUsers, numberOfParks, numberOfBuildings, numberOfSlots);
        return this.message("All Counts of Attributes", statistics);
    }

    @GetMapping("view-statistics-week")
    public ResponseEntity<ResponseMessage> getNumberOfReservationInEachWeek() {
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        int numOfWeeks = LocalDate.of(LocalDate.now().getYear(), 12, 31).get(weekFields.weekOfYear());
        int[] countByWeek = new int[numOfWeeks];

        for (Reservation reservation : this.reservationRepository.findAll()) {
            LocalDate reservationDate = LocalDate.parse(reservation.getReservationAt().format(DateTimeFormatter.ISO_LOCAL_DATE), this.formatter);
            if (reservationDate.getYear() == LocalDate.now().getYear()) {
                int weekIndex = reservationDate.get(weekFields.weekOfYear()) - 1;
                weekIndex = (weekIndex == -1) ? 0 : weekIndex;
                countByWeek[weekIndex]++;
            }
        }
        return this.message("Reservation counts by week", countByWeek);
    }

    @GetMapping("view-statistics-month")
    public ResponseEntity<ResponseMessage> getNumberOfReservationInEachMonth() {

        CollectionModel<Reservation> reservations = CollectionModel.of(this.reservationRepository.findAll());

        int[] countByMonth = new int[12];
        for (Reservation reservation : reservations) {
            LocalDate reservationDate = LocalDate.parse(reservation.getReservationAt().format(DateTimeFormatter.ISO_LOCAL_DATE), this.formatter);
            if (reservationDate.getYear() == LocalDate.now().getYear()) {
                int monthIndex = reservationDate.getMonthValue() - 1;
                countByMonth[monthIndex]++;
            }
        }
        return this.message("Reservation counts by month", countByMonth);
    }

    private ResponseEntity<ResponseMessage> message(String message, Object data) {
        return new ResponseEntity<>(new ResponseMessage(message, data), HttpStatus.OK);
    }
}

