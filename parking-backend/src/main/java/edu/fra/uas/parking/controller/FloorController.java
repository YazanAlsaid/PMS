package edu.fra.uas.parking.controller;
import edu.fra.uas.parking.entity.Building;
import edu.fra.uas.parking.entity.Floor;
import edu.fra.uas.parking.repository.FloorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/floors")
public class FloorController implements BaseController<Floor> {

    @Autowired
    private FloorRepository floorRepository;

    @GetMapping()
    @Override
    public ResponseEntity<List<Floor>> index() {
        return new ResponseEntity<>(this.floorRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@RequestParam("id") Long id) {
        return new ResponseEntity<>(this.floorRepository.findById(id), HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody Floor floor) {
        Floor floorCreated = this.floorRepository.save(floor);
        return new ResponseEntity<>(floorCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@RequestParam("id") Long id, Floor floor) {
        Floor floorUpdated = this.floorRepository.findById(id).get();
        if (floorUpdated  == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        floor = this.floorRepository.save(floor);
        return new ResponseEntity<>(floor, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
        Floor floorToDelete = this.floorRepository.findById(id).orElse(null);
        if (floorToDelete == null) {
            return new ResponseEntity<>("Floor not found.", HttpStatus.NOT_FOUND);
        }

        this.floorRepository.deleteById(id);
        return new ResponseEntity<>("Floor deleted.", HttpStatus.NO_CONTENT);
    }

}
