package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.Type;
import edu.fra.uas.parking.repository.TypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/types")
public class TypeController implements BaseController<Type> {

    private final TypeRepository typeRepository;

    @Autowired
    public TypeController(TypeRepository typeRepository) {
        this.typeRepository = typeRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<List<Type>> index() {
        return new ResponseEntity<>(this.typeRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
        Type type = this.typeRepository.findById(id).orElse(null);
        if (type == null) {
            return new ResponseEntity<>("Type not found.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(type, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody Type type) {
        Type createdType = this.typeRepository.save(type);
        return new ResponseEntity<>(createdType, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@PathVariable("id") Long id, @RequestBody Type type) {
        Optional<Type> typeUpdated = this.typeRepository.findById(id);
        if (typeUpdated.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        type = this.typeRepository.save(type);
        return new ResponseEntity<>(type, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
        Type typeToDelete = this.typeRepository.findById(id).orElse(null);
        if (typeToDelete == null) {
            return new ResponseEntity<>("Type not found.", HttpStatus.NOT_FOUND);
        }
        this.typeRepository.deleteById(id);
        return new ResponseEntity<>("Type deleted.", HttpStatus.NO_CONTENT);
    }
}
