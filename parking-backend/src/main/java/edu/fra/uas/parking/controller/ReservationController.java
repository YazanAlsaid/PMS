package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.Reservation;
import edu.fra.uas.parking.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/reservations")
public class ReservationController implements BaseController<Reservation> {

    @Autowired
    private ReservationRepository reservationRepository;

    @GetMapping()
    @Override
    public ResponseEntity<List<Reservation>> index() {
        List<Reservation> reservations = this.reservationRepository.findAll(); // speichern Sie das Ergebnis von findAll() in einer Variable
        return new ResponseEntity<>(reservations, HttpStatus.OK); // geben Sie die Variable zurück
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable Long id) { // verwenden Sie @PathVariable anstelle von @RequestParam
        Reservation reservation = this.reservationRepository.findById(id).orElse(null); // gibt ein Optional zurück
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
    public ResponseEntity<Object> updateById(@RequestParam("id") Long id, Reservation reservation) {
        Reservation reservationUpdated = this.reservationRepository.findById(id).get();
        if (reservationUpdated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        reservation = this.reservationRepository.save(reservation);
        return new ResponseEntity<>(reservation, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) { // verwenden Sie ebenfalls @PathVariable
        Reservation reservationToDelete = this.reservationRepository.findById(id).orElse(null);
        if (reservationToDelete == null) {
            return new ResponseEntity<>("Reservation not found.", HttpStatus.NOT_FOUND);
        }
        this.reservationRepository.deleteById(id);
        return new ResponseEntity<>("Reservation deleted.", HttpStatus.NO_CONTENT);
    }
}
