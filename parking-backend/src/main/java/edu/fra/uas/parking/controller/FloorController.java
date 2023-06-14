package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Floor;
import edu.fra.uas.parking.repository.FloorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/floors")
public class FloorController implements BaseController<Floor> {
    private final Logger logger = LoggerFactory.getLogger(FloorController.class);
    private final FloorRepository floorRepository;

    @Autowired
    public FloorController(FloorRepository floorRepository) {
        this.floorRepository = floorRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing floor: {}", this.floorRepository.count());
        return this.message("Indexing floor", this.floorRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable("id") Long id) {
        logger.debug("Getting floor by id: {}", id);
        Optional<Floor> floor = this.floorRepository.findById(id);

        if (floor.isEmpty()) {
            return this.message("Floor not found", null, HttpStatus.NOT_FOUND);
        }
        return this.message("Getting floor by id", floor.get(), HttpStatus.OK);

    }

    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Floor floor) {
        logger.debug("Creating floor: {}", floor);
        Optional<Floor> optionalFloor = (floor.getId() != null) ? this.floorRepository.findById(floor.getId()) : Optional.empty();
        if (optionalFloor.isPresent()) {
            return this.message("Floor is already exists", null, HttpStatus.CONFLICT);

        }
        Floor floorCreated = this.floorRepository.save(floor);
        return this.message("Creating floor", floorCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, @RequestBody Floor floor) {
        logger.debug("Updating floor by id: {}", id);
        Optional<Floor> floorUpdated = this.floorRepository.findById(id);

        if (floorUpdated.isPresent() && floorUpdated.get().getId().equals(floor.getId())) {
            floor = this.floorRepository.save(floor);
            return this.message("Updating floor by id", floor, HttpStatus.ACCEPTED);
        }
        return this.message("floor not found", null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {
        logger.debug("Deleting floor by id: {}", id);

        Optional<Floor> floorUpdated = this.floorRepository.findById(id);
        if (floorUpdated.isPresent()) {
            this.floorRepository.deleteById(id);
            return this.message("Floor is deleted", null, HttpStatus.NO_CONTENT);
        }
        return this.message("Floor not found", null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id/slots}")
    public ResponseEntity<ResponseMessage> getSlotsByFloorId(@PathVariable("id") Long id) {
        logger.debug("Getting slots by floor id: {}", id);
        Optional<Floor> optionalFloor = this.floorRepository.findById(id);
        if (optionalFloor.isPresent()) {
            return this.message("Get Slot by Floor", optionalFloor.get().getSlots(), HttpStatus.OK);
        }
        return this.message("Floor not found", null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}/building")
    public ResponseEntity<ResponseMessage> getBuildingByFloorId(@PathVariable("id") Long id) {
        logger.debug("Getting building by floor id: {}", id);
        Optional<Floor> optionalFloor = this.floorRepository.findById(id);
        if (optionalFloor.isPresent()) {
            return this.message("Get Building by Floor", optionalFloor.get().getBuilding(), HttpStatus.OK);
        }
        return this.message("Floor not found", null, HttpStatus.NOT_FOUND);
    }

    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }
}
