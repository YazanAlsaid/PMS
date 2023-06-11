package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.Slot;
import edu.fra.uas.parking.repository.SlotRepository;
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

    private final SlotRepository slotRepository;

    @Autowired
    public SlotController(SlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<List<Slot>> index() {
        List<Slot> slots = this.slotRepository.findAll();
        return new ResponseEntity<>(slots, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable Long id) {
        Slot slot = this.slotRepository.findById(id).orElse(null);
        if (slot == null) {
            return new ResponseEntity<>("Slot not found.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(slot, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody Slot slot) {
        Slot slotCreated = this.slotRepository.save(slot);
        return new ResponseEntity<>(slotCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@PathVariable("id") Long id, @RequestBody Slot slot) {
        Optional<Slot> slotUpdated = this.slotRepository.findById(id);
        if (slotUpdated.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        slot = this.slotRepository.save(slot);
        return new ResponseEntity<>(slot, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
        Slot slotToDelete = this.slotRepository.findById(id).orElse(null);
        if (slotToDelete == null) {
            return new ResponseEntity<>("Slot not found.", HttpStatus.NOT_FOUND);
        }
        this.slotRepository.deleteById(id);
        return new ResponseEntity<>("Slot deleted.", HttpStatus.NO_CONTENT);
    }
}
