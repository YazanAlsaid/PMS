package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Building;
import edu.fra.uas.parking.repository.BuildingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/buildings")
public class BuildingController {
    private final Logger logger = LoggerFactory.getLogger(BuildingController.class);
    private final BuildingRepository buildingRepository;

    @Autowired
    public BuildingController(BuildingRepository buildingRepository) {
        this.buildingRepository = buildingRepository;
    }

    @GetMapping
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing building: {}", this.buildingRepository.count());
        return new ResponseEntity<>(new ResponseMessage("Indexing building", this.buildingRepository.findAll()), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMessage> getById(@PathVariable("id") Long id) {
        logger.debug("Getting building by id: {}", id);
        Optional<Building> building = this.buildingRepository.findById(id);
        if (building.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ResponseMessage("Getting building by id", building.orElse(null)), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Building building) {
        logger.debug("Creating building: {}", building);
        Optional<Building> optionalBuilding = (building.getId() != null) ? this.buildingRepository.findById(building.getId()) : Optional.empty();
        if (optionalBuilding.isPresent()) {
            return new ResponseEntity<>(new ResponseMessage("Building not found", null), HttpStatus.CONFLICT);
        }
        Building buildingCreated = this.buildingRepository.save(building);
        return new ResponseEntity<>(new ResponseMessage("Creating building", buildingCreated), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, Building building) {
        logger.debug("Updating building by id: {}", id);
        Optional<Building> optionalBuilding = this.buildingRepository.findById(id);
        if (optionalBuilding.isPresent() && optionalBuilding.get().getId().equals(building.getId())) {
            building = this.buildingRepository.save(building);
            return new ResponseEntity<>(new ResponseMessage("Updating building by id", building), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseMessage("Building not found", null), HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {
        logger.debug("Deleting building by id: {}", id);
        Optional<Building> buildingUpdated = this.buildingRepository.findById(id);
        if (buildingUpdated.isPresent()) {
            this.buildingRepository.deleteById(id);
            return new ResponseEntity<>(new ResponseMessage("Building is deleted", null), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(new ResponseMessage("Building not found", null), HttpStatus.NOT_FOUND);
    }
}
