package edu.fra.uas.parking.repository;

import edu.fra.uas.parking.entity.ResetToken;
import edu.fra.uas.parking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResetTokenRepository extends JpaRepository<ResetToken, Long> {
    ResetToken findByUser(User user);

    ResetToken findByToken(String token);
}
