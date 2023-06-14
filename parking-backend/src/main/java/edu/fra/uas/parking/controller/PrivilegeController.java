package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Privilege;
import edu.fra.uas.parking.repository.PrivilegeRepository;
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
@RequestMapping("/privileges")
public class PrivilegeController implements BaseController<Privilege> {

    private final PrivilegeRepository privilegeRepository;
    private final Logger logger = LoggerFactory.getLogger(PrivilegeRepository.class);


    @Autowired
    public PrivilegeController(PrivilegeRepository privilegeRepository) {
        this.privilegeRepository = privilegeRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing privilege: {}", this.privilegeRepository.count());
        return  this.message("Indexing privilege", this.privilegeRepository.findAll(), HttpStatus.OK);

    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable Long id) {
        logger.debug("Getting privilege by id: {}", id);
        Optional<Privilege> privilege = this.privilegeRepository.findById(id);
        if (privilege.isEmpty()) {
            return this.message("Privilege not found", null, HttpStatus.NOT_FOUND);
        }
        return  this.message("Getting Privilege by id", privilege.get(), HttpStatus.OK);

    }

    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Privilege privilege) {
        logger.debug("Creating Privilege: {}", privilege);
        Optional<Privilege> optionalPrivilege = (privilege.getId() != null) ? this.privilegeRepository.findById(privilege.getId()) : Optional.empty();
        if (optionalPrivilege.isPresent()) {
            return  this.message("Privilege is already exists", null, HttpStatus.CONFLICT);

        }
        Privilege privilegeCreated = this.privilegeRepository.save(privilege);
        return  this.message("Creating privilege", privilegeCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, Privilege privilege) {
        logger.debug("Updating privilege by id: {}", id);
        Optional<Privilege> optionalPrivilege = this.privilegeRepository.findById(id);
        if (optionalPrivilege.isPresent() && optionalPrivilege.get().getId().equals(privilege.getId())) {
            privilege = this.privilegeRepository.save(privilege);
            return  this.message("Updating privilege by id", privilege, HttpStatus.ACCEPTED);
        }
        return  this.message("Privilege not found", null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {

        logger.debug("Deleting privilege by id: {}", id);
        Optional<Privilege> privilegeUpdated = this.privilegeRepository.findById(id);
        if (privilegeUpdated.isPresent()) {
            this.privilegeRepository.deleteById(id);
            return  this.message("Privilege is deleted", null, HttpStatus.NO_CONTENT);
        }
        return  this.message("Privilege not found", null,  HttpStatus.NOT_FOUND);

    }
    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }
}
