package edu.fra.uas.parking.security.service.dto;
import edu.fra.uas.parking.entity.User;
import edu.fra.uas.parking.security.model.CurrentUser;
import edu.fra.uas.parking.security.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CurrentUserDetailsService implements UserDetailsService {

    private static final Logger log = LoggerFactory.getLogger(CurrentUserDetailsService.class);

    private final UserService userService;

    @Autowired
    public CurrentUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        log.debug("Authenticating user with email={}", email);
        User user = userService.getUserByEmail(email)
                .orElseThrow(
                        () -> new UsernameNotFoundException("User with email= " + email + " cannot be not found")
                );
        return new CurrentUser(user);
    }

}
