package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.Building;
import edu.fra.uas.parking.entity.User; // Importieren Sie den richtigen Entity-Typ
import edu.fra.uas.parking.repository.UserRepository; // Importieren Sie den richtigen Repository-Typ
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users") // Verwenden Sie einen eindeutigen Request-Mapping-Pfad
public class UserController implements BaseController<User> {

    @Autowired
    private UserRepository userRepository;

    @GetMapping()
    @Override
    public ResponseEntity<List<User>> index() { // Ändern Sie das Rückgabe-Typ auf List<User>
        return new ResponseEntity<>(this.userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<Object> getById(@PathVariable("id") Long id) { // Verwenden Sie "@PathVariable", um den ID-Parameter zu erhalten
        User user = this.userRepository.findById(id).orElse(null); // Mit orElse(null) setzen wir das Object auf null, falls es nicht gefunden wurde.
        if (user == null) {
            return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping
    @Override
    public ResponseEntity<Object> create(@Valid @RequestBody User user) { // Benutzen Sie den Parameter-Typ "User" anstatt "Building"
        User createdUser = this.userRepository.save(user); // Verwenden Sie "userRepository" anstatt "buildingRepository"
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<Object> updateById(@RequestParam("id") Long id, User user) {
        User userUpdated = this.userRepository.findById(id).get();
        if (userUpdated == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        user = this.userRepository.save(user);
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Object> deleteById(@PathVariable("id") Long id) { // Verwenden Sie "@PathVariable"
        User userToDelete = this.userRepository.findById(id).orElse(null); // Mit orElse(null) setzen wir das Object auf null, falls es nicht gefunden wurde.
        if (userToDelete == null) {
            return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        }
        this.userRepository.deleteById(id);
        return new ResponseEntity<>("User deleted.", HttpStatus.NO_CONTENT); // Ändern Sie die Rückgabe-Nachricht
    }
}
