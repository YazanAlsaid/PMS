package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.User;
import edu.fra.uas.parking.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;
import java.util.Optional;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequestMapping("/users")
public class UserController implements BaseController<User> {

    private final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<ResponseMessage> index() {
        logger.debug("Indexing user: {}", this.userRepository.count());
        CollectionModel<User> users = CollectionModel.of(this.userRepository.findAll());
        users.add(linkTo(methodOn(ParkController.class).index()).withSelfRel());
        users.add(linkTo(methodOn(UserController.class).index()).withSelfRel());

        for (User p : users){
            p = this.addLinks(p);
        }

        return this.message("Indexing user", this.userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> getById(@PathVariable("id") Long id) {
        logger.debug("Getting user by id: {}", id);
        Optional<User> optionalUser = this.userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return this.message("User not found", null, HttpStatus.NOT_FOUND);
        }

        User user = this.addLinks(optionalUser.get());
        return this.message("Getting user by id", user, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<ResponseMessage> create(@Valid @RequestBody User user) {
        logger.debug("Creating user: {}", user);
        Optional<User> optionalUser = (user.getId() != null) ? this.userRepository.findById(user.getId()) : Optional.empty();
        if (optionalUser.isPresent()) {
            return this.message("Building is already exists", null, HttpStatus.CONFLICT);

        }
        User userCreated = this.userRepository.save(user);
        userCreated = this.addLinks(userCreated);

        return this.message("Creating building", userCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> updateById(@PathVariable("id") Long id, User user) {
        logger.debug("Updating user by id: {}", id);
        Optional<User> optionalUser = this.userRepository.findById(id);
        if (optionalUser.isPresent() && optionalUser.get().getId().equals(user.getId())) {
            user = this.userRepository.save(user);
            user = this.addLinks(user);

            return this.message("Updating building by id", user, HttpStatus.ACCEPTED);
        }
        return this.message("Building not found", null, HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<ResponseMessage> deleteById(@PathVariable("id") Long id) {
        logger.debug("Deleting user by id: {}", id);
        Optional<User> userUpdated = this.userRepository.findById(id);
        if (userUpdated.isPresent()) {
            this.userRepository.deleteById(id);
            return this.message("User is deleted", null, HttpStatus.NO_CONTENT);
        }
        return this.message("User not found", null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}/roles")
    public ResponseEntity<ResponseMessage> getRolesByUserId(@PathVariable("id") Long id) {
        logger.debug("Getting roles by user id: {}", id);
        Optional<User> user = this.userRepository.findById(id);
        if (user.isEmpty()) {
            return this.message("User not found", null, HttpStatus.NOT_FOUND);
        }
        return this.message("Getting roles by user id", user.get().getRoles(), HttpStatus.OK);
    }

    @GetMapping("/{id}/reservations")
    public ResponseEntity<ResponseMessage> getReservationsByUserId(@PathVariable("id") Long id) {
        logger.debug("Getting reservations by user id: {}", id);
        Optional<User> user = this.userRepository.findById(id);
        if (user.isEmpty()) {
            return this.message("User not found", null, HttpStatus.NOT_FOUND);
        }
        return this.message("Getting reservations by user id", user.get().getReservations(), HttpStatus.OK);
    }

    @GetMapping("/{id}/nfc-card")
    public ResponseEntity<ResponseMessage> getNfcCardByUserId(@PathVariable("id") Long id) {
        logger.debug("Getting nfc card by user id: {}", id);
        Optional<User> user = this.userRepository.findById(id);
        if (user.isEmpty()) {
            return this.message("User not found", null, HttpStatus.NOT_FOUND);
        }
        return this.message("Getting nfc card by user id", user.get().getNfcCard(), HttpStatus.OK);
    }

    private ResponseEntity<ResponseMessage> message(String message, Object data, HttpStatus httpStatus) {
        return new ResponseEntity<>(new ResponseMessage(message, data), httpStatus);
    }

    private User addLinks(User user){
        user.add(linkTo(methodOn(UserController.class).getById(user.getId())).withSelfRel());
        user.add(linkTo(methodOn(UserController.class).index()).withRel(IanaLinkRelations.COLLECTION));
        user.add(linkTo(methodOn(UserController.class).getReservationsByUserId(user.getId())).withRel("reservations"));
        user.add(linkTo(methodOn(UserController.class).getRolesByUserId(user.getId())).withRel("roles"));

        return user;
    }
}