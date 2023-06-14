package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Reservation;
import edu.fra.uas.parking.repository.ReservationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class ReservationController implements BaseController<Reservation> {

    private final ReservationRepository reservationRepository;
    private final Logger logger = LoggerFactory.getLogger(ReservationController.class);

    @Autowired
    public ReservationController(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing reservation: {}", this.reservationRepository.count());
        return this.message("Indexing reservation", this.reservationRepository.findAll(), HttpStatus.OK);

    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable Long id) {
        logger.debug("Getting building by id: {}", id);
        Optional<Reservation> reservation = this.reservationRepository.findById(id);
        if (reservation.isEmpty()) {
            return this.message("Reservation not found", null, HttpStatus.NOT_FOUND);
        }
        return this.message("Getting reservation by id", reservation.get(), HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Reservation reservation) {

        logger.debug("Creating reservation: {}", reservation);
        Optional<Reservation> optionalBuilding = (reservation.getId() != null) ? this.reservationRepository.findById(reservation.getId()) : Optional.empty();
        if (optionalBuilding.isPresent()) {
            return this.message("Reservation is already exists", null, HttpStatus.CONFLICT);

        }
        Reservation buildingCreated = this.reservationRepository.save(reservation);
        return this.message("Creating reservation", buildingCreated, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, Reservation reservation) {
        logger.debug("Updating reservation by id: {}", id);
        Optional<Reservation> optionalReservation = this.reservationRepository.findById(id);
        if (optionalReservation.isPresent() && optionalReservation.get().getId().equals(reservation.getId())) {
            reservation = this.reservationRepository.save(reservation);
            return this.message("Updating reservation by id", reservation, HttpStatus.ACCEPTED);
        }
        return this.message("Reservation not found", null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {
        logger.debug("Deleting reservation by id: {}", id);
        Optional<Reservation> reservationUpdated = this.reservationRepository.findById(id);
        if (reservationUpdated.isPresent()) {
            this.reservationRepository.deleteById(id);
            return this.message("Reservation is deleted", null, HttpStatus.NO_CONTENT);
        }
        return this.message("Reservation not found", null, HttpStatus.NOT_FOUND);

    }

    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }
}
