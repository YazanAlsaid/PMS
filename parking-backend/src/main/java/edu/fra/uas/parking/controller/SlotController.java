package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Slot;
import edu.fra.uas.parking.repository.SlotRepository;
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
@RequestMapping("/slots")
public class SlotController implements BaseController<Slot> {

    private final Logger logger = LoggerFactory.getLogger(SlotController.class);

    private final SlotRepository slotRepository;

    @Autowired
    public SlotController(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing slot: {}", this.slotRepository.count());
        return  this.message("Indexing slot", this.slotRepository.findAll(), HttpStatus.OK);

    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable Long id) {
        logger.debug("Getting slot by id: {}", id);
        Optional<Slot> slot = this.slotRepository.findById(id);
        if (slot.isEmpty()) {
            return this.message("Slot not found", null, HttpStatus.NOT_FOUND);
        }
        return  this.message("Getting slot by id", slot.get(), HttpStatus.OK);

    }

    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Slot slot) {
        logger.debug("Creating slot: {}", slot);
        Optional<Slot> optionalSlot = (slot.getId() != null) ? this.slotRepository.findById(slot.getId()) : Optional.empty();
        if (optionalSlot.isPresent()) {
            return this.message("Building is already exists", null, HttpStatus.CONFLICT);

        }
        Slot buildingCreated = this.slotRepository.save(slot);
        return this.message("Creating slot", buildingCreated, HttpStatus.CREATED);
    }

        @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, @RequestBody Slot slot) {
            logger.debug("Updating slot by id: {}", id);
            Optional<Slot> optionalSlot = this.slotRepository.findById(id);
            if (optionalSlot.isPresent() && optionalSlot.get().getId().equals(slot.getId())) {
                slot = this.slotRepository.save(slot);
                return  this.message("Updating slot by id", slot, HttpStatus.ACCEPTED);
            }
            return  this.message("Slot not found", null, HttpStatus.NOT_FOUND);
        }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {
        logger.debug("Deleting slot by id: {}", id);
        Optional<Slot> buildingUpdated = this.slotRepository.findById(id);
        if (buildingUpdated.isPresent()) {
            this.slotRepository.deleteById(id);
            return  this.message("Slot is deleted", null, HttpStatus.NO_CONTENT);
        }
        return  this.message("Slot not found", null,  HttpStatus.NOT_FOUND);
    }
    @GetMapping("/{id}/reservations")
    public ResponseEntity<ResponseMessage> getReservationsBySlotId(@PathVariable("id") Long id) {
        logger.debug("Getting reservations by slot id: {}", id);
        Optional<Slot> slot = this.slotRepository.findById(id);
        if (slot.isEmpty()) {
            return this.message("Slot not found", null, HttpStatus.NOT_FOUND);
        }
        return  this.message("Getting reservations by slot id", slot.get().getReservations(), HttpStatus.OK);

    }

    @GetMapping("/{id}/floor")
    public ResponseEntity<ResponseMessage> getFloorBySlotId(@PathVariable("id") Long id) {
        logger.debug("Getting floor by slot id: {}", id);
        Optional<Slot> slot = this.slotRepository.findById(id);
        if (slot.isEmpty()) {
            return this.message("Slot not found", null, HttpStatus.NOT_FOUND);
        }
        return  this.message("Getting floor by slot id", slot.get().getFloor(), HttpStatus.OK);

    }

    @GetMapping("/{id}/type")
    public ResponseEntity<ResponseMessage> getTypeBySlotId(@PathVariable("id") Long id) {
        logger.debug("Getting type by slot id: {}", id);
        Optional<Slot> slot = this.slotRepository.findById(id);
        if (slot.isEmpty()) {
            return this.message("Slot not found", null, HttpStatus.NOT_FOUND);
        }
        return  this.message("Getting type by slot id", slot.get().getType(), HttpStatus.OK);

    }

    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }
}
