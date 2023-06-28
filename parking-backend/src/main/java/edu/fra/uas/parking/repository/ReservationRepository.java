package edu.fra.uas.parking.repository;

import edu.fra.uas.parking.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Set;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    Set<Reservation> findByReservationAtBetween(LocalDate startOfYear, LocalDate endOfYear);
}
