package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.Building;
import edu.fra.uas.parking.entity.Type;
import edu.fra.uas.parking.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/types") // Verwenden Sie einen eindeutigen Request-Mapping-Pfad
public class TypeController implements BaseController<Type> {

    @Autowired
    private TypeRepository typeRepository; // Verwenden Sie den richtigen Repository-Namen

    @GetMapping()
    @Override
    public ResponseEntity<List<Type>> index() {
        return new ResponseEntity<>(this.typeRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable("id") Long id) { // Verwenden Sie @PathVariable, um den ID-Parameter zu erhalten
        Type type = this.typeRepository.findById(id).orElse(null); // Mit orElse(null) setzen wir das Object auf null, falls es nicht gefunden wurde.
        if (type == null) {
            return new ResponseEntity<>("Type not found.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(type, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody Type type) { // Benutzen Sie den Parameter-Typ "Type" anstatt "Building"
        Type createdType = this.typeRepository.save(type); // Verwenden Sie "typeRepository" anstatt "typeController"
        return new ResponseEntity<>(createdType, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@RequestParam("id") Long id, Type type) {
        Type typeUpdated = this.typeRepository.findById(id).get();
        if (typeUpdated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        type = this.typeRepository.save(type);
        return new ResponseEntity<>(type, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) { // Verwenden Sie "@PathVariable"
        Type typeToDelete = this.typeRepository.findById(id).orElse(null); // Mit orElse(null) setzen wir das Object auf null, falls es nicht gefunden wurde.
        if (typeToDelete == null) {
            return new ResponseEntity<>("Type not found.", HttpStatus.NOT_FOUND);
        }
        this.typeRepository.deleteById(id);
        return new ResponseEntity<>("Type deleted.", HttpStatus.NO_CONTENT); // Ändern Sie die Rückgabe-Nachricht
    }
}
