package edu.fra.uas.parking.jwt.controller;

import edu.fra.uas.parking.common.JwtResponseError;
import edu.fra.uas.parking.entity.DTOUser;
import edu.fra.uas.parking.jwt.config.JwtTokenUtil;
import edu.fra.uas.parking.jwt.model.JwtRequest;
import edu.fra.uas.parking.jwt.model.JwtResponse;
import edu.fra.uas.parking.jwt.service.JwtUserDetailsService;
import edu.fra.uas.parking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@RestController
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtUserDetailsService jwtUserDetailsService;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRepository userRepository;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, JwtUserDetailsService jwtUserDetailsService, JwtTokenUtil jwtTokenUtil, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest jwtRequest) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(jwtRequest.getEmail(), jwtRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            JwtResponseError jwtResponseError = new JwtResponseError(
                    LocalDateTime.now(),
                    401,
                    "Incorrect email or password",
                    "Incorrect email or password",
                    "/authenticate"
            );
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jwtResponseError);
        }

        final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(jwtRequest.getEmail());
        final String token = jwtTokenUtil.generateToken(userDetails);
        final DTOUser dtoUser = new DTOUser(this.userRepository.findByEmail(jwtRequest.getEmail()).get());
        return ResponseEntity.ok(new JwtResponse(token, dtoUser));
    }
}

