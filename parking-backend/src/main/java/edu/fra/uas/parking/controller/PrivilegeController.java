package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.Building;
import edu.fra.uas.parking.entity.Privilege;
import edu.fra.uas.parking.repository.PrivilegeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/privileges")
public class PrivilegeController implements BaseController<Privilege> {

    @Autowired
    private PrivilegeRepository privilegeRepository;

    @GetMapping()
    @Override
    public ResponseEntity<List<Privilege>> index() {
        return new ResponseEntity<>(this.privilegeRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable Long id) {
        Privilege privilege = this.privilegeRepository.findById(id).orElse(null); // gibt ein Optional zurück
        if (privilege == null) {
            return new ResponseEntity<>("Privilege not found.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(privilege, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody Privilege privilege) {
        Privilege privilegeCreated = this.privilegeRepository.save(privilege);
        return new ResponseEntity<>(privilegeCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@RequestParam("id") Long id, Privilege privilege) {
        Privilege privilegeUpdated = this.privilegeRepository.findById(id).get();
        if (privilegeUpdated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        privilege = this.privilegeRepository.save(privilege);
        return new ResponseEntity<>(privilege, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
        Privilege privilegeToDelete = this.privilegeRepository.findById(id).orElse(null);
        if (privilegeToDelete == null) {
            return new ResponseEntity<>("Privilege not found.", HttpStatus.NOT_FOUND);
        }
        this.privilegeRepository.deleteById(id);
        return new ResponseEntity<>("Privilege deleted.", HttpStatus.NO_CONTENT);
    }
}
