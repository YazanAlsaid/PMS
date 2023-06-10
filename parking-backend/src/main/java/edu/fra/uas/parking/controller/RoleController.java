package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.Role;
import edu.fra.uas.parking.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/roles")
public class RoleController implements BaseController<Role> {

    private final RoleRepository roleRepository;

    @Autowired
    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<List<Role>> index() {
        List<Role> roles = this.roleRepository.findAll();
        return new ResponseEntity<>(roles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable Long id) {
        Role role = this.roleRepository.findById(id).orElse(null);
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
    public ResponseEntity<Object> updateById(@PathVariable("id") Long id,@RequestBody Role role) {
        Optional<Role> roleUpdated = this.roleRepository.findById(id);
        if (roleUpdated.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        role = this.roleRepository.save(role);
        return new ResponseEntity<>(role, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
        Role roleToDelete = this.roleRepository.findById(id).orElse(null);
        if (roleToDelete == null) {
            return new ResponseEntity<>("Role not found.", HttpStatus.NOT_FOUND);
        }
        this.roleRepository.deleteById(id);
        return new ResponseEntity<>("Role deleted.", HttpStatus.NO_CONTENT);
    }
}
