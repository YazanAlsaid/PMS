package edu.fra.uas.parking.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import edu.fra.uas.parking.entity.Park;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.fra.uas.parking.repository.ParkRepository;

@RestController
@RequestMapping("/parks")
public class ParkController implements BaseController<Park> {

    private final ParkRepository parkRepository;

    @Autowired
    public ParkController(ParkRepository parkRepository) {
        this.parkRepository = parkRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<List<Park>> index() {
        return new ResponseEntity<>(this.parkRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable Long id) {
        Park park = this.parkRepository.findById(id).orElse(null);
        if (park == null) {
            return new ResponseEntity<>("Park not found.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(park, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody Park park) {
        Park parkCreated = this.parkRepository.save(park);
        return new ResponseEntity<>(parkCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@PathVariable("id") Long id, Park park) {
        Optional<Park> parkUpdated = this.parkRepository.findById(id);
        if (parkUpdated.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        park = this.parkRepository.save(park);
        return new ResponseEntity<>(park, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
        Park parkToDelete = this.parkRepository.findById(id).orElse(null);
        if (parkToDelete == null) {
            return new ResponseEntity<>("Park not found.", HttpStatus.NOT_FOUND);
        }
        this.parkRepository.deleteById(id);
        return new ResponseEntity<>("Park deleted.", HttpStatus.NO_CONTENT);
    }

}
