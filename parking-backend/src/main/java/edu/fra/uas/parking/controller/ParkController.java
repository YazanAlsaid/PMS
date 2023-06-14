package edu.fra.uas.parking.controller;

import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Park;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.fra.uas.parking.repository.ParkRepository;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

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
        CollectionModel<Park> parks = CollectionModel.of(this.parkRepository.findAll());
        parks.add(linkTo(methodOn(ParkController.class).index()).withSelfRel());
        for (Park p : parks){
            p = this.addLinks(p);
        }

        return  this.message("Indexing park", parks, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable Long id) {
        logger.debug("Getting park by id: {}", id);
        Optional<Park> optionalPark = this.parkRepository.findById(id);
        if (optionalPark.isEmpty()) {
            return this.message("Park not found", null, HttpStatus.NOT_FOUND);
        }

        Park park = this.addLinks(optionalPark.get());
        return  this.message("Getting park by id", park, HttpStatus.OK);

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
        parkCreated = this.addLinks(parkCreated);

        return  this.message("Creating building", parkCreated, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, Park park) {
        logger.debug("Updating park by id: {}", id);
        Optional<Park> optionalPark = this.parkRepository.findById(id);
        if (optionalPark.isPresent() && optionalPark.get().getId().equals(park.getId())) {
            park = this.parkRepository.save(park);
            park = this.addLinks(park);
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
    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }

    private Park addLinks(Park park){
        park.add(linkTo(methodOn(ParkController.class).getById(park.getId())).withSelfRel());
        park.add(linkTo(methodOn(ParkController.class).index()).withRel(IanaLinkRelations.COLLECTION));
        return park;
    }
}
