package edu.fra.uas.parking.controller;

import edu.fra.uas.parking.entity.User;
import edu.fra.uas.parking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/auth")
public class AuthenticationController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping()
    public ResponseEntity<String> login(){
        return new ResponseEntity<>("You are logged in", HttpStatus.OK);
    }

    @GetMapping(value = "/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable("email") String email){
        return new ResponseEntity<>(this.userRepository.findByEmail(email).orElse(null), HttpStatus.OK);
    }
}