package edu.fra.uas.parking.repository;

import edu.fra.uas.parking.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SlotRepository extends JpaRepository<Slot, Long> {
    Optional<Slot> findByName(String name);
}
