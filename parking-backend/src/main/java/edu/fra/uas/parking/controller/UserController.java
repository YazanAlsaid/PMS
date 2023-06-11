package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.User;
import edu.fra.uas.parking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController implements BaseController<User> {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping()
    @Override
    public ResponseEntity<List<User>> index() {
        return new ResponseEntity<>(this.userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable("id") Long id) {
        User user = this.userRepository.findById(id).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody User user) {
        User createdUser = this.userRepository.save(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@PathVariable("id") Long id, User user) {
        Optional<User> userUpdated = this.userRepository.findById(id);
        if (userUpdated.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        user = this.userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) {
        User userToDelete = this.userRepository.findById(id).orElse(null);
        if (userToDelete == null) {
            return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        }
        this.userRepository.deleteById(id);
        return new ResponseEntity<>("User deleted.", HttpStatus.NO_CONTENT);
    }
}
