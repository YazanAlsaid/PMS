package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Reservation;
import edu.fra.uas.parking.repository.ReservationRepository;
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
import java.util.Set;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/reservations")
public class ReservationController implements BaseController<Reservation> {

    private final ReservationRepository reservationRepository;
    private final Logger logger = LoggerFactory.getLogger(ReservationController.class);

    @Autowired
    public ReservationController(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }
    @PreAuthorize("hasAuthority('VIEW_RESERVATIONS')")
    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing reservation: {}", this.reservationRepository.count());
        CollectionModel<Reservation> reservations = CollectionModel.of(this.reservationRepository.findAll());
        reservations.add(linkTo(methodOn(ReservationController.class).index()).withSelfRel());
        for (Reservation p : reservations){
            p = this.addLinks(p);
        }

        return this.message("Indexing reservation", this.reservationRepository.findAll(), HttpStatus.OK);

    }
    @PreAuthorize("hasAuthority('VIEW_RESERVATION')")
    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable Long id) {
        logger.debug("Getting reservation by id: {}", id);
        Optional<Reservation> opetionalReservation = this.reservationRepository.findById(id);
        if (opetionalReservation.isEmpty()) {
            return this.message("Reservation not found", null, HttpStatus.NOT_FOUND);
        }

        Reservation reservation = this.addLinks(opetionalReservation.get());
        return this.message("Getting reservation by id", reservation, HttpStatus.OK);
    }
    @PreAuthorize("hasAuthority('ADD_RESERVATION')")
    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Reservation reservation) {

        logger.debug("Creating reservation: {}", reservation);
        Optional<Reservation> optionalReservation = (reservation.getId() != null) ? this.reservationRepository.findById(reservation.getId()) : Optional.empty();
        if (optionalReservation.isPresent()) {
            return this.message("Reservation is already exists", null, HttpStatus.CONFLICT);

        }
        Reservation reservationCreated = this.reservationRepository.save(reservation);
        reservationCreated = this.addLinks(reservationCreated);

        return this.message("Creating reservation", reservationCreated, HttpStatus.CREATED);

    }
    @PreAuthorize("hasAuthority('UPDATE_RESERVATION')")
    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, Reservation reservation) {
        logger.debug("Updating reservation by id: {}", id);
        Optional<Reservation> optionalReservation = this.reservationRepository.findById(id);
        if (optionalReservation.isPresent() && optionalReservation.get().getId().equals(reservation.getId())) {
            reservation = this.reservationRepository.save(reservation);
            reservation = this.addLinks(reservation);

            return this.message("Updating reservation by id", reservation, HttpStatus.ACCEPTED);
        }
        return this.message("Reservation not found", null, HttpStatus.NOT_FOUND);
    }
    @PreAuthorize("hasAuthority('DELETE_RESERVATION')")
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

    private Reservation addLinks(Reservation reservation){
        reservation.add(linkTo(methodOn(ReservationController.class).getById(reservation.getId())).withSelfRel());
        reservation.add(linkTo(methodOn(ReservationController.class).index()).withRel(IanaLinkRelations.COLLECTION));
        return reservation;
    }

}
