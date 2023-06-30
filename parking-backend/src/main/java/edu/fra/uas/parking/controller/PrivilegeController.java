package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Privilege;
import edu.fra.uas.parking.repository.PrivilegeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/privileges")
public class PrivilegeController implements BaseController<Privilege> {

    private final PrivilegeRepository privilegeRepository;
    private final Logger logger = LoggerFactory.getLogger(PrivilegeRepository.class);

    @Autowired
    public PrivilegeController(PrivilegeRepository privilegeRepository) {
        this.privilegeRepository = privilegeRepository;
    }

    @PreAuthorize("hasAuthority('VIEW_PRIVILIGES')")
    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing privilege: {}", this.privilegeRepository.count());
        CollectionModel<Privilege> privileges = CollectionModel.of(this.privilegeRepository.findAll());
        privileges.add(linkTo(methodOn(PrivilegeController.class).index()).withSelfRel());
        privileges.forEach(this::addLinks);
        return this.message("Indexing privilege", this.privilegeRepository.findAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('VIEW_PRIVILIGE')")
    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable Long id) {
        logger.debug("Getting privilege by id: {}", id);
        Optional<Privilege> optionalPrivilege = this.privilegeRepository.findById(id);
        if (optionalPrivilege.isEmpty()) {
            return this.message("Privilege not found", null, HttpStatus.NOT_FOUND);
        }
        Privilege privilege = this.addLinks(optionalPrivilege.get());

        return this.message("Getting Privilege by id", privilege, HttpStatus.OK);

    }

    @PreAuthorize("hasAuthority('ADD_PRIVILIGE')")
    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Privilege privilege) {
        logger.debug("Creating Privilege: {}", privilege);
        Optional<Privilege> optionalPrivilege = (privilege.getId() != null) ? this.privilegeRepository.findById(privilege.getId()) : Optional.empty();
        if (optionalPrivilege.isPresent() && privilegeRepository.findByName(privilege.getName()).isPresent()) {
            return this.message("Privilege is already exists", null, HttpStatus.CONFLICT);

        }
        Privilege privilegeCreated = this.privilegeRepository.save(privilege);
        this.addLinks(privilegeCreated);

        return this.message("Creating privilege", privilegeCreated, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('UPDATE_PRIVILIGE')")
    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, Privilege privilege) {
        logger.debug("Updating privilege by id: {}", id);
        Optional<Privilege> optionalPrivilege = this.privilegeRepository.findById(id);
        if (optionalPrivilege.isPresent() && optionalPrivilege.get().getId().equals(privilege.getId())) {
            privilege = this.privilegeRepository.save(privilege);
            this.addLinks(privilege);

            return this.message("Updating privilege by id", privilege, HttpStatus.ACCEPTED);
        }
        return this.message("Privilege not found", null, HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasAuthority('DELETE_PRIVILIGE')")
    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {

        logger.debug("Deleting privilege by id: {}", id);
        Optional<Privilege> privilegeUpdated = this.privilegeRepository.findById(id);
        if (privilegeUpdated.isPresent()) {
            this.privilegeRepository.deleteById(id);
            return this.message("Privilege is deleted", null, HttpStatus.NO_CONTENT);
        }
        return this.message("Privilege not found", null, HttpStatus.NOT_FOUND);

    }

    @PreAuthorize("hasAuthority('VIEW_ROLES')")
    @GetMapping("/{id}/roles")
    public ResponseEntity<ResponseMessage> getRolesByPrivilegeId(@PathVariable("id") Long id) {
        logger.debug("Getting roles by privilege id: {}", id);
        Optional<Privilege> privilege = this.privilegeRepository.findById(id);
        return privilege.map(value ->
                        this.message("Getting roles by privilege id", value.getRoles(), HttpStatus.OK))
                .orElseGet(() -> this.message("Privilege not found", null, HttpStatus.NOT_FOUND));

    }

    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }

    private Privilege addLinks(Privilege privilege) {
        privilege.add(linkTo(methodOn(PrivilegeController.class).getById(privilege.getId())).withSelfRel());
        privilege.add(linkTo(methodOn(PrivilegeController.class).index()).withRel(IanaLinkRelations.COLLECTION));
        privilege.add(linkTo(methodOn(PrivilegeController.class).getRolesByPrivilegeId(privilege.getId())).withRel("roles"));
        return privilege;
    }
}
