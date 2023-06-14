package edu.fra.uas.parking.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Park;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.fra.uas.parking.repository.ParkRepository;

@RestController
@RequestMapping("/parks")
public class ParkController implements BaseController<Park> {

    private final ParkRepository parkRepository;
    private final Logger logger = LoggerFactory.getLogger(ParkRepository.class);


    @Autowired
    public ParkController(ParkRepository parkRepository) {
        this.parkRepository = parkRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing park: {}", this.parkRepository.count());
        return  this.message("Indexing park", this.parkRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable Long id) {
        logger.debug("Getting park by id: {}", id);
        Optional<Park> park = this.parkRepository.findById(id);
        if (park.isEmpty()) {
            return this.message("Park not found", null, HttpStatus.NOT_FOUND);
        }
        return  this.message("Getting park by id", park.get(), HttpStatus.OK);

    }

    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Park park) {
        logger.debug("Creating park: {}", park);
        Optional<Park> optionalPark = (park.getId() != null) ? this.parkRepository.findById(park.getId()) : Optional.empty();
        if (optionalPark.isPresent()) {
            return  this.message("Park is already exists", null, HttpStatus.CONFLICT);

        }
        Park parkCreated = this.parkRepository.save(park);
        return  this.message("Creating building", parkCreated, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, Park park) {
        logger.debug("Updating park by id: {}", id);
        Optional<Park> optionalPark = this.parkRepository.findById(id);
        if (optionalPark.isPresent() && optionalPark.get().getId().equals(park.getId())) {
            park = this.parkRepository.save(park);
            return  this.message("Updating park by id", park, HttpStatus.ACCEPTED);
        }
        return  this.message("Park not found", null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {
        logger.debug("Deleting park by id: {}", id);
        Optional<Park> parkUpdated = this.parkRepository.findById(id);
        if (parkUpdated.isPresent()) {
            this.parkRepository.deleteById(id);
            return  this.message("Park is deleted", null, HttpStatus.NO_CONTENT);
        }
        return  this.message("Park not found", null,  HttpStatus.NOT_FOUND);

    }

    @GetMapping("/{id}/buildings")
    public ResponseEntity<ResponseMessage> getBuildings(@PathVariable("id") Long id) {
        logger.debug("getBuildings by id Park: {}", id);
        Optional<Park> optionalPark = this.parkRepository.findById(id);
        if (optionalPark.isPresent()) {
            return this.message("Get Building by park", optionalPark.get().getBuildings(), HttpStatus.OK);
        }
        return  this.message("Park not found", null,  HttpStatus.NOT_FOUND);
    }

    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }
}
