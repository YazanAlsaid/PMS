package edu.fra.uas.parking.security.service.user;

import edu.fra.uas.parking.entity.User;
import edu.fra.uas.parking.security.service.dto.UserDTO;

import java.util.Collection;
import java.util.Optional;

public interface UserService {

    UserDTO getUserById(long id);

    Optional<User> getUserByEmail(String email);

    boolean existsByEmail(String email);

    Collection<UserDTO> getAllUsers();

}
