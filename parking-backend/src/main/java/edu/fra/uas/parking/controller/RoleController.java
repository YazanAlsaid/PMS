package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.Role;
import edu.fra.uas.parking.repository.RoleRepository;
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
@RequestMapping("/roles")
public class RoleController implements BaseController<Role> {

    private final Logger logger = LoggerFactory.getLogger(RoleController.class);
    private final RoleRepository roleRepository;

    @Autowired
    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @PreAuthorize("hasAuthority('VIEW_ROLES')")
    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing role: {}", this.roleRepository.count());
        CollectionModel<Role> roles = CollectionModel.of(this.roleRepository.findAll());
        roles.add(linkTo(methodOn(RoleController.class).index()).withSelfRel());
        roles.forEach(this::addLinks);
        return this.message("Indexing role", this.roleRepository.findAll(), HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('VIEW_ROLE')")
    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable Long id) {
        logger.debug("Getting role by id: {}", id);
        Optional<Role> optionalRole = this.roleRepository.findById(id);
        if (optionalRole.isEmpty()) {
            return this.message("Role not found", null, HttpStatus.NOT_FOUND);
        }
        Role role = this.addLinks(optionalRole.get());
        return this.message("Getting role by id", role, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADD_ROLE')")
    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody Role role) {
        logger.debug("Creating role: {}", role);
        Optional<Role> optionalRole = (role.getId() != null) ? this.roleRepository.findById(role.getId()) : Optional.empty();
        if (optionalRole.isPresent() && roleRepository.findByName(role.getName()).isPresent()) {
            return this.message("Role is already exists", null, HttpStatus.CONFLICT);

        }
        Role roleCreated = this.roleRepository.save(role);
        this.addLinks(roleCreated);

        return this.message("Created Role", roleCreated, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('UPDATE_ROLE')")
    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, @RequestBody Role role) {
        logger.debug("Updating role by id: {}", id);
        Optional<Role> optionalRole = this.roleRepository.findById(id);
        if (optionalRole.isPresent() && optionalRole.get().getId().equals(role.getId())) {
            role = this.roleRepository.save(role);
            this.addLinks(role);

            return this.message("Updating role by id", role, HttpStatus.ACCEPTED);
        }
        return this.message("Role not found", null, HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasAuthority('DELETE_ROLE')")
    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {
        logger.debug("Deleting role by id: {}", id);
        Optional<Role> roleUpdated = this.roleRepository.findById(id);
        if (roleUpdated.isPresent()) {
            this.roleRepository.deleteById(id);
            return this.message("Role is deleted", null, HttpStatus.NO_CONTENT);
        }
        return this.message("Role not found", null, HttpStatus.NOT_FOUND);
    }

    @PreAuthorize("hasAuthority('VIEW_USERS')")
    @GetMapping("/{id}/users")
    public ResponseEntity<ResponseMessage> getUsersByRoleId(@PathVariable("id") Long id) {
        logger.debug("Getting users by role id: {}", id);
        Optional<Role> role = this.roleRepository.findById(id);
        return role.map(value
                        -> this.message("Getting users by role id", value.getUsers(), HttpStatus.OK))
                .orElseGet(() -> this.message("Role not found", null, HttpStatus.NOT_FOUND));
    }

    @PreAuthorize("hasAuthority('VIEW_PRIVILIGES')")
    @GetMapping("/{id}/privileges")
    public ResponseEntity<ResponseMessage> getPrivilegesByRoleId(@PathVariable("id") Long id) {
        logger.debug("Getting privileges by role id: {}", id);
        Optional<Role> role = this.roleRepository.findById(id);
        return role.map(value ->
                        this.message("Getting privileges by role id", value.getPrivileges(), HttpStatus.OK))
                .orElseGet(() -> this.message("Role not found", null, HttpStatus.NOT_FOUND));
    }

    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }

    private Role addLinks(Role role) {
        role.add(linkTo(methodOn(RoleController.class).getById(role.getId())).withSelfRel());
        role.add(linkTo(methodOn(RoleController.class).index()).withRel(IanaLinkRelations.COLLECTION));
        role.add(linkTo(methodOn(RoleController.class).getUsersByRoleId(role.getId())).withRel("users"));
        role.add(linkTo(methodOn(RoleController.class).getPrivilegesByRoleId(role.getId())).withRel("privileges"));

        return role;
    }
}
