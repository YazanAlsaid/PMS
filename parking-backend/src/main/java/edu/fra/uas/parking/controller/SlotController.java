package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Reservation;
import edu.fra.uas.parking.entity.Slot;
import edu.fra.uas.parking.repository.ReservationRepository;
import edu.fra.uas.parking.repository.SlotRepository;
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
@RequestMapping("/slots")
public class SlotController implements BaseController<Slot> {

    private final Logger logger = LoggerFactory.getLogger(SlotController.class);
    private final SlotRepository slotRepository;
    private final ReservationRepository reservationRepository;

    @Autowired
    public SlotController(SlotRepository slotRepository, ReservationRepository reservationRepository) {
        this.slotRepository = slotRepository;
        this.reservationRepository = reservationRepository;
    }

    @PreAuthorize("hasAuthority('VIEW_SLOTS')")
    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing slot: {}", this.slotRepository.count());
        CollectionModel<Slot> slots = CollectionModel.of(this.slotRepository.findAll());
        slots.add(linkTo(methodOn(SlotController.class).index()).withSelfRel());
        slots.forEach(this::addLinks);
        return this.message("Indexing slot", this.slotRepository.findAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('VIEW_SLOT')")
    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable Long id) {
        logger.debug("Getting slot by id: {}", id);
        Optional<Slot> optionalSlot = this.slotRepository.findById(id);
        if (optionalSlot.isEmpty()) {
            return this.message("Slot not found", null, HttpStatus.NOT_FOUND);
        }

        Slot slot = this.addLinks(optionalSlot.get());
        return this.message("Getting slot by id", slot, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADD_SLOT')")
    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Slot slot) {
        logger.debug("Creating slot: {}", slot);
        Optional<Slot> optionalSlot = (slot.getId() != null) ? this.slotRepository.findById(slot.getId()) : Optional.empty();
        if (optionalSlot.isPresent() && slotRepository.findByName(slot.getName()).isPresent()) {
            return this.message("slot is already exists", null, HttpStatus.CONFLICT);

        }
        Slot slotCreated = this.slotRepository.save(slot);
        this.addLinks(slotCreated);

        return this.message("Created Slot", slotCreated, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('UPDATE_SLOT')")
    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, @RequestBody Slot slot) {
        logger.debug("Updating slot by id: {}", id);
        Optional<Slot> optionalSlot = this.slotRepository.findById(id);
        if (optionalSlot.isPresent() && optionalSlot.get().getId().equals(slot.getId())) {
            slot = this.slotRepository.save(slot);
            this.addLinks(slot);

            return this.message("Updating slot by id", slot, HttpStatus.ACCEPTED);
        }
        return this.message("Slot not found", null, HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasAuthority('DELETE_SLOT')")
    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {
        logger.debug("Deleting slot by id: {}", id);
        Optional<Slot> buildingUpdated = this.slotRepository.findById(id);
        if (buildingUpdated.isPresent()) {
            this.slotRepository.deleteById(id);
            return this.message("Slot is deleted", null, HttpStatus.NO_CONTENT);
        }
        return this.message("Slot not found", null, HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasAuthority('VIEW_FLOOR')")
    @GetMapping("/{id}/floor")
    public ResponseEntity<ResponseMessage> getFloorBySlotId(@PathVariable("id") Long id) {
        logger.debug("Getting floor by slot id: {}", id);
        Optional<Slot> slot = this.slotRepository.findById(id);
        return slot.map(value ->
                        this.message("Getting floor by slot id", value.getFloors(), HttpStatus.OK))
                .orElseGet(() -> this.message("Slot not found", null, HttpStatus.NOT_FOUND));
    }

    @PreAuthorize("hasAuthority('VIEW_TYPE')")
    @GetMapping("/{id}/type")
    public ResponseEntity<ResponseMessage> getTypeBySlotId(@PathVariable("id") Long id) {
        logger.debug("Getting type by slot id: {}", id);
        Optional<Slot> slot = this.slotRepository.findById(id);
        return slot.map(value ->
                        this.message("Getting type by slot id", value.getType(), HttpStatus.OK))
                .orElseGet(() -> this.message("Slot not found", null, HttpStatus.NOT_FOUND));
    }

    @PreAuthorize("hasAuthority('VIEW_SLOTS')")
    @GetMapping("/{id}/reservations")
    public ResponseEntity<ResponseMessage> getReservationsBySlotId(
            @PathVariable("id") Long slotId,
            @RequestParam("buildingId") Long buildingId,
            @RequestParam("floorId") Long floorId
    ) {
        List<Reservation> reservations = reservationRepository.findByBuildingFloorAndSlot(buildingId, floorId, slotId);

        if (!reservations.isEmpty()) {
            return this.message("Reservations found for the specified building, floor, and slot", reservations, HttpStatus.OK);
        } else {
            return this.message("No reservations found for the specified building, floor, and slot", null, HttpStatus.NOT_FOUND);
        }
    }

    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }

    private Slot addLinks(Slot slot) {
        slot.add(linkTo(methodOn(SlotController.class).getById(slot.getId())).withSelfRel());
        slot.add(linkTo(methodOn(SlotController.class).index()).withRel(IanaLinkRelations.COLLECTION));
        slot.add(linkTo(methodOn(SlotController.class).getReservationsBySlotId(slot.getId(), null, null)).withRel("reservations"));

        return slot;
    }
}
