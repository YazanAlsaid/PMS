package edu.fra.uas.parking.repository;

import edu.fra.uas.parking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @SuppressWarnings("unused")
    boolean existsByEmail(String email);
}