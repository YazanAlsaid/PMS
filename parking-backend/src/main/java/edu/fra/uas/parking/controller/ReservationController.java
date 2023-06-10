package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.Reservation;
import edu.fra.uas.parking.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class ReservationController implements BaseController<Reservation> {

    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationController(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<List<Reservation>> index() {
        List<Reservation> reservations = this.reservationRepository.findAll();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable Long id) {
        Reservation reservation = this.reservationRepository.findById(id).orElse(null);
        if (reservation == null) {
            return new ResponseEntity<>("Reservation not found.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody Reservation reservation) {
        Reservation reservationCreated = this.reservationRepository.save(reservation);
        return new ResponseEntity<>(reservationCreated, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@PathVariable("id") Long id, Reservation reservation) {
        Optional<Reservation> reservationUpdated = this.reservationRepository.findById(id);
        if (reservationUpdated.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        reservation = this.reservationRepository.save(reservation);
        return new ResponseEntity<>(reservation, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
        Reservation reservationToDelete = this.reservationRepository.findById(id).orElse(null);
        if (reservationToDelete == null) {
            return new ResponseEntity<>("Reservation not found.", HttpStatus.NOT_FOUND);
        }
        this.reservationRepository.deleteById(id);
        return new ResponseEntity<>("Reservation deleted.", HttpStatus.NO_CONTENT);
    }
}
