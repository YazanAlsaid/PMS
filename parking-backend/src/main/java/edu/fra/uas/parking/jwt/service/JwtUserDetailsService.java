package edu.fra.uas.parking.jwt.service;

import edu.fra.uas.parking.entity.User;
import edu.fra.uas.parking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public JwtUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> optionalUser = this.userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            // TODO: give list of roles as authorities
            User user = optionalUser.get();
            List<GrantedAuthority> authorities = user.getRoles()
                    .stream()
                    .flatMap(role -> role.getPrivileges().stream())
                    .map(role -> new SimpleGrantedAuthority(role.getName()))
                    .collect(Collectors.toList());

            return new org.springframework.security.core.userdetails.User(
                    user.getEmail(),
                    user.getPassword(),
                    authorities
            );
        }

        throw new UsernameNotFoundException("User can not found by email: " + email);
    }
}
