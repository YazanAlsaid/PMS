package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Building;
import edu.fra.uas.parking.repository.BuildingRepository;
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
@RequestMapping("/buildings")
public class BuildingController {
    private final Logger logger = LoggerFactory.getLogger(BuildingController.class);
    private final BuildingRepository buildingRepository;

    @Autowired
    public BuildingController(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    @PreAuthorize("hasAuthority('VIEW_BUILDINGS')")
    @GetMapping
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing building: {}", this.buildingRepository.count());
        CollectionModel<Building> buildings = CollectionModel.of(this.buildingRepository.findAll());
        buildings.add(linkTo(methodOn(BuildingController.class).index()).withSelfRel());
        buildings.forEach(this::addLinks);
        return this.message("Indexing building", this.buildingRepository.findAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('VIEW_BUILDING')")
    @GetMapping("/{id}")
    public ResponseEntity<ResponseMessage> getById(@PathVariable("id") Long id) {
        logger.debug("Getting building by id: {}", id);
        Optional<Building> optionalBuilding = this.buildingRepository.findById(id);
        if (optionalBuilding.isEmpty()) {
            return this.message("Building not found", null, HttpStatus.NOT_FOUND);
        }
        Building building = this.addLinks(optionalBuilding.get());
        return this.message("Getting building by id", building, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADD_BUILDING')")
    @PostMapping
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Building building) {
        logger.debug("Creating building: {}", building);
        Optional<Building> optionalBuilding = (building.getId() != null) ? this.buildingRepository.findById(building.getId()) : Optional.empty();
        if (optionalBuilding.isPresent()) {
            return this.message("Building is already exists", null, HttpStatus.CONFLICT);

        }
        Building buildingCreated = this.buildingRepository.save(building);
        this.addLinks(buildingCreated);

        return this.message("Creating building", buildingCreated, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('UPDATE_BUILDING')")
    @PutMapping("/{id}")
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, Building building) {
        logger.debug("Updating building by id: {}", id);
        Optional<Building> optionalBuilding = this.buildingRepository.findById(id);
        if (optionalBuilding.isPresent() && optionalBuilding.get().getId().equals(building.getId())) {
            building = this.buildingRepository.save(building);
            this.addLinks(building);

            return this.message("Updating building by id", building, HttpStatus.ACCEPTED);
        }
        return this.message("Building not found", null, HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasAuthority('DELETE_BUILDING')")
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {
        logger.debug("Deleting building by id: {}", id);
        Optional<Building> buildingUpdated = this.buildingRepository.findById(id);
        if (buildingUpdated.isPresent()) {
            this.buildingRepository.deleteById(id);
            return this.message("Building is deleted", null, HttpStatus.NO_CONTENT);
        }
        return this.message("Building not found", null, HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasAuthority('VIEW_FLOORS')")
    @GetMapping("/{id}/floors")
    public ResponseEntity<ResponseMessage> getFloors(@PathVariable("id") Long id) {
        logger.debug("getFloors by id Building: {}", id);
        Optional<Building> optionalBuilding = this.buildingRepository.findById(id);
        return optionalBuilding.map(building ->
                this.message("Get Floor by building", building.getFloors(), HttpStatus.OK))
                .orElseGet(() -> this.message("Building not found", null, HttpStatus.NOT_FOUND));
    }

    @PreAuthorize("hasAuthority('VIEW_PARK')")
    @GetMapping("/{id}/park")
    public ResponseEntity<ResponseMessage> getPark(@PathVariable("id") Long id) {
        logger.debug("getPark by Building id: {}", id);
        Optional<Building> optionalBuilding = this.buildingRepository.findById(id);
        return optionalBuilding.map(building ->
                this.message("Get Park by building", building.getPark(), HttpStatus.OK))
                .orElseGet(() -> this.message("Building not found", null, HttpStatus.NO_CONTENT));
    }

    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }

    private Building addLinks(Building building) {
        building.add(linkTo(methodOn(BuildingController.class).getById(building.getId())).withSelfRel());
        building.add(linkTo(methodOn(BuildingController.class).index()).withRel(IanaLinkRelations.COLLECTION));
        building.add(linkTo(methodOn(BuildingController.class).getFloors(building.getId())).withRel("floors"));

        return building;
    }

}
