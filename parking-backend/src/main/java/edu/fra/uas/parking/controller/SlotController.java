package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.Building;
import edu.fra.uas.parking.entity.Slot;
import edu.fra.uas.parking.repository.SlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/slots")
public class SlotController implements BaseController<Slot> {

    @Autowired
    private SlotRepository slotRepository;

    @GetMapping()
    @Override
    public ResponseEntity<List<Slot>> index() {
        List<Slot> slots = this.slotRepository.findAll(); // speichern Sie das Ergebnis von findAll() in einer Variable
        return new ResponseEntity<>(slots, HttpStatus.OK); // geben Sie die Variable zurück
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable Long id) { // verwenden Sie @PathVariable anstelle von @RequestParam
        Slot slot = this.slotRepository.findById(id).orElse(null); // gibt ein Optional zurück
        if (slot == null) {
            return new ResponseEntity<>("Slot not found.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(slot, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody Slot slot) { // verwenden Sie den richtigen Parameter-Typ
        Slot slotCreated = this.slotRepository.save(slot);
        return new ResponseEntity<>(slotCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@RequestParam("id") Long id, Slot slot) {
        Slot slotUpdated = this.slotRepository.findById(id).get();
        if (slotUpdated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        slot = this.slotRepository.save(slot);
        return new ResponseEntity<>(slot, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) { // verwenden Sie ebenfalls @PathVariable
        Slot slotToDelete = this.slotRepository.findById(id).orElse(null);
        if (slotToDelete == null) {
            return new ResponseEntity<>("Slot not found.", HttpStatus.NOT_FOUND);
        }
        this.slotRepository.deleteById(id);
        return new ResponseEntity<>("Slot deleted.", HttpStatus.NO_CONTENT);
    }
}
