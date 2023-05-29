package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.Building;
import edu.fra.uas.parking.repository.BuildingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/buildings")
public class BuildingController implements BaseController<Building> {

    @Autowired
    private BuildingRepository buildingRepository;

    @GetMapping()
    @Override
    public ResponseEntity<List<Building>> index() {
        return new ResponseEntity<>(this.buildingRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@RequestParam("id") Long id) {
        return new ResponseEntity<>(this.buildingRepository.findById(id), HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody Building building) {
        Building buildingCreated = this.buildingRepository.save(building);
        return new ResponseEntity<>(buildingCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@RequestParam("id") Long id, Building building) {
        Building buildingUpdated = this.buildingRepository.findById(id).get();
        if (buildingUpdated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        building = this.buildingRepository.save(building);
        return new ResponseEntity<>(building, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(Long id) {
        Building buildingUpdated = this.buildingRepository.findById(id).get();
        if (buildingUpdated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        this.buildingRepository.deleteById(id);
        return new ResponseEntity<>("building is deleted.", HttpStatus.NO_CONTENT);
    }
}
