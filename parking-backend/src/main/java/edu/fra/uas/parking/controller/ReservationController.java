package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Reservation;

import edu.fra.uas.parking.repository.ReservationRepository;
import edu.fra.uas.parking.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;


import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/reservations")
public class ReservationController {


    private final Logger logger = LoggerFactory.getLogger(ReservationController.class);
    private final ReservationRepository reservationRepository;

    private final UserRepository userRepository;

    @Autowired
    public ReservationController(ReservationRepository reservationRepository, UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasAuthority('VIEW_RESERVATIONS')")
    @GetMapping()
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing reservation: {}", this.reservationRepository.count());
        CollectionModel<Reservation> reservations = CollectionModel.of(this.reservationRepository.findAll());
        reservations.add(linkTo(methodOn(ReservationController.class).index()).withSelfRel());
        reservations.forEach(this::addLinks);
        return this.message("Indexing reservation", this.reservationRepository.findAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('VIEW_RESERVATION')")
    @GetMapping("/{id}")
    public ResponseEntity<ResponseMessage> getById(@PathVariable Long id) {
        logger.debug("Getting reservation by id: {}", id);
        Optional<Reservation> optionalReservation = this.reservationRepository.findById(id);
        if (optionalReservation.isEmpty()) {
            return this.message("Reservation not found", null, HttpStatus.NOT_FOUND);
        }
        Reservation reservation = this.addLinks(optionalReservation.get());
        return this.message("Getting reservation by id", reservation, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADD_RESERVATION')")
    @PostMapping
    public ResponseEntity<ResponseMessage> create(
            @RequestParam("buildingId") Long buildingId,
            @RequestParam("floorId") Long floorId,
            @RequestParam("slotId") Long slotId,
            @Valid @RequestBody Reservation reservation
    ) {
        logger.debug("Creating reservation: {}", reservation);

        Optional<Reservation> optionalReservation = (reservation.getId() != null) ?
                reservationRepository.findById(reservation.getId()) : Optional.empty();
        if (optionalReservation.isPresent()) {
            return this.message("Reservation already exists", null, HttpStatus.CONFLICT);
        }

        // Check if the slot is already booked in the specified time period
        List<Reservation> existingReservations = reservationRepository.findByBuildingFloorAndSlot(
                buildingId, floorId, slotId
        );
        for (Reservation existingReservation : existingReservations) {
            // Assuming the Reservation entity has fields for startDateTime and endDateTime
            if (existingReservation.getReservationPeriod().isEqual(reservation.getReservationPeriod()) && existingReservation.getReservationAt().isEqual(reservation.getReservationAt())) {
                return this.message("Slot is already booked in this time period", null, HttpStatus.CONFLICT);
            }
        }
        reservation.setNfcCard(this.userRepository.getById(reservation.getUser().getId()).getNfcCard());
        Reservation reservationCreated = reservationRepository.save(reservation);
        this.addLinks(reservationCreated);

        return this.message("Creating reservation", reservationCreated, HttpStatus.CREATED);
    }


    @PreAuthorize("hasAuthority('UPDATE_RESERVATION')")
    @PutMapping("/{id}")
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, Reservation reservation) {
        logger.debug("Updating reservation by id: {}", id);
        Optional<Reservation> optionalReservation = this.reservationRepository.findById(id);
        if (optionalReservation.isPresent() && optionalReservation.get().getId().equals(reservation.getId())) {
            reservation = this.reservationRepository.save(reservation);
            this.addLinks(reservation);

            return this.message("Updating reservation by id", reservation, HttpStatus.ACCEPTED);
        }
        return this.message("Reservation not found", null, HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasAuthority('DELETE_RESERVATION')")
    @DeleteMapping("/{id}")

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

    private Reservation addLinks(Reservation reservation) {
        reservation.add(linkTo(methodOn(ReservationController.class).getById(reservation.getId())).withSelfRel());
        reservation.add(linkTo(methodOn(ReservationController.class).index()).withRel(IanaLinkRelations.COLLECTION));
        return reservation;
    }

}
