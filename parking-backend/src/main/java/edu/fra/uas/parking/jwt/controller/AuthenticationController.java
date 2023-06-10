package edu.fra.uas.parking.jwt.controller;

import edu.fra.uas.parking.jwt.config.JwtTokenUtil;
import edu.fra.uas.parking.jwt.model.JwtRequest;
import edu.fra.uas.parking.jwt.model.JwtResponse;
import edu.fra.uas.parking.jwt.service.JwtUserDetailsService;
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

@RestController
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtUserDetailsService jwtUserDetailsService;
    private final JwtTokenUtil jwtTokenUti;

    @Autowired
    public AuthenticationController(AuthenticationManager authenticationManager, JwtUserDetailsService jwtUserDetailsService, JwtTokenUtil jwtTokenUti) {
        this.authenticationManager = authenticationManager;
        this.jwtUserDetailsService = jwtUserDetailsService;
        this.jwtTokenUti = jwtTokenUti;
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest jwtRequest) throws Exception {
        try {
            this.authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(jwtRequest.getEmail(), jwtRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect credentials", e);
        }
        final UserDetails userDetails = jwtUserDetailsService
                .loadUserByUsername(jwtRequest.getEmail());

        final String token = jwtTokenUti.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }

}
