package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Floor;
import edu.fra.uas.parking.repository.FloorRepository;
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
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/floors")
public class FloorController implements BaseController<Floor> {
    private final Logger logger = LoggerFactory.getLogger(FloorController.class);
    private final FloorRepository floorRepository;

    @Autowired
    public FloorController(FloorRepository floorRepository) {
        this.floorRepository = floorRepository;
    }

    @PreAuthorize("hasAuthority('VIEW_FLOORS')")
    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing floor: {}", this.floorRepository.count());
        CollectionModel<Floor> floors = CollectionModel.of(this.floorRepository.findAll());
        floors.add(linkTo(methodOn(FloorController.class).index()).withSelfRel());
        floors.forEach(this::addLinks);
        return this.message("Indexing floor", this.floorRepository.findAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('VIEW_FLOOR')")
    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable("id") Long id) {
        logger.debug("Getting floor by id: {}", id);
        Optional<Floor> optionalFloor = this.floorRepository.findById(id);

        if (optionalFloor.isEmpty()) {
            return this.message("Floor not found", null, HttpStatus.NOT_FOUND);
        }

        Floor floor = this.addLinks(optionalFloor.get());

        return this.message("Getting floor by id", floor, HttpStatus.OK);

    }

    @PreAuthorize("hasAuthority('CREATE_FLOOR')")
    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Floor floor) {
        logger.debug("Creating floor: {}", floor);
        Optional<Floor> optionalFloor = (floor.getId() != null) ? this.floorRepository.findById(floor.getId()) : Optional.empty();
        if (optionalFloor.isPresent() && floorRepository.findByName(floor.getName()).isPresent()) {
            return this.message("Floor is already exists", null, HttpStatus.CONFLICT);

        }
        Floor floorCreated = this.floorRepository.save(floor);
        this.addLinks(floorCreated);

        return this.message("Creating floor", floorCreated, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('UPDATE_FLOOR')")
    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, @RequestBody Floor floor) {
        logger.debug("Updating floor by id: {}", id);
        Optional<Floor> floorUpdated = this.floorRepository.findById(id);

        if (floorUpdated.isPresent() && floorUpdated.get().getId().equals(floor.getId())) {
            floor = this.floorRepository.save(floor);
            this.addLinks(floor);

            return this.message("Updating floor by id", floor, HttpStatus.ACCEPTED);
        }
        return this.message("floor not found", null, HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasAuthority('DELETE_FLOOR')")
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

    @PreAuthorize("hasAuthority('VIEW_SLOTS')")
    @GetMapping("/{id}/slots")
    public ResponseEntity<ResponseMessage> getSlotsByFloorId(@PathVariable("id") Long id) {
        logger.debug("Getting slots by floor id: {}", id);
        Optional<Floor> optionalFloor = this.floorRepository.findById(id);
        return optionalFloor.map(floor ->
                this.message("Get Slot by Floor", floor.getSlots(), HttpStatus.OK))
                .orElseGet(() -> this.message("Floor not found", null, HttpStatus.NOT_FOUND));
    }

    @PreAuthorize("hasAuthority('VIEW_BUILDING')")
    @GetMapping("/{id}/buildings")
    public ResponseEntity<ResponseMessage> getBuildingByFloorId(@PathVariable("id") Long id) {
        logger.debug("Getting building by floor id: {}", id);
        Optional<Floor> optionalFloor = this.floorRepository.findById(id);
        return optionalFloor.map(floor ->
                this.message("Get Building by Floor", floor.getBuildings(), HttpStatus.OK))
                .orElseGet(() -> this.message("Floor not found", null, HttpStatus.NOT_FOUND));
    }

    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }

    private Floor addLinks(Floor floor) {
        floor.add(linkTo(methodOn(FloorController.class).getById(floor.getId())).withSelfRel());
        floor.add(linkTo(methodOn(FloorController.class).index()).withRel(IanaLinkRelations.COLLECTION));
        floor.add(linkTo(methodOn(FloorController.class).getSlotsByFloorId(floor.getId())).withRel("slots"));

        return floor;
    }
}
