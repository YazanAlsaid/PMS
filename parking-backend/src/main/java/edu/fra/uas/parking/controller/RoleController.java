package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Role;
import edu.fra.uas.parking.repository.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private final Logger logger = LoggerFactory.getLogger(RoleController.class);

    private final RoleRepository roleRepository;

    @Autowired
    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing role: {}", this.roleRepository.count());
        return  this.message("Indexing role", this.roleRepository.findAll(), HttpStatus.OK);

    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable Long id) {
        logger.debug("Getting role by id: {}", id);
        Optional<Role> role = this.roleRepository.findById(id);
        if (role.isEmpty()) {
            return this.message("Role not found", null, HttpStatus.NOT_FOUND);
        }
        return  this.message("Getting role by id", role.get(), HttpStatus.OK);

    }

    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Role role) {
        logger.debug("Creating role: {}", role);
        Optional<Role> optionalRole = (role.getId() != null) ? this.roleRepository.findById(role.getId()) : Optional.empty();
        if (optionalRole.isPresent()) {
            return  this.message("Role is already exists", null, HttpStatus.CONFLICT);

        }
        Role roleCreated = this.roleRepository.save(role);
        return  this.message("Creating role", roleCreated, HttpStatus.CREATED);

    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id,@RequestBody Role role) {
        logger.debug("Updating role by id: {}", id);
        Optional<Role> optionalRole = this.roleRepository.findById(id);
        if (optionalRole.isPresent() && optionalRole.get().getId().equals(role.getId())) {
            role = this.roleRepository.save(role);
            return  this.message("Updating role by id", role, HttpStatus.ACCEPTED);
        }
        return  this.message("Role not found", null, HttpStatus.NOT_FOUND);

    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {
        logger.debug("Deleting role by id: {}", id);
        Optional<Role> roleUpdated = this.roleRepository.findById(id);
        if (roleUpdated.isPresent()) {
            this.roleRepository.deleteById(id);
            return  this.message("Role is deleted", null, HttpStatus.NO_CONTENT);
        }
        return  this.message("Role not found", null,  HttpStatus.NOT_FOUND);

    }
    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }
}
