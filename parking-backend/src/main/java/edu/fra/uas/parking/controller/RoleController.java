package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.Building;
import edu.fra.uas.parking.entity.Role;
import edu.fra.uas.parking.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController implements BaseController<Role> {

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping()
    @Override
    public ResponseEntity<List<Role>> index() {
        List<Role> roles = this.roleRepository.findAll(); // speichern Sie das Ergebnis von findAll() in einer Variable
        return new ResponseEntity<>(roles, HttpStatus.OK); // geben Sie die Variable zurück
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable Long id) { // verwenden Sie @PathVariable anstelle von @RequestParam
        Role role = this.roleRepository.findById(id).orElse(null); // gibt ein Optional zurück
        if (role == null) {
            return new ResponseEntity<>("Role not found.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(role, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody Role role) {
        Role roleCreated = this.roleRepository.save(role);
        return new ResponseEntity<>(roleCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@RequestParam("id") Long id, Role role) {
        Role roleUpdated = this.roleRepository.findById(id).get();
        if (roleUpdated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        role = this.roleRepository.save(role);
        return new ResponseEntity<>(role, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) { // verwenden Sie ebenfalls @PathVariable
        Role roleToDelete = this.roleRepository.findById(id).orElse(null);
        if (roleToDelete == null) {
            return new ResponseEntity<>("Role not found.", HttpStatus.NOT_FOUND);
        }
        this.roleRepository.deleteById(id);
        return new ResponseEntity<>("Role deleted.", HttpStatus.NO_CONTENT);
    }
}
