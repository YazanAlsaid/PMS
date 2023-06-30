package edu.fra.uas.parking.repository;

import edu.fra.uas.parking.entity.Park;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParkRepository extends JpaRepository<Park, Long> {
    boolean findByName(String name);
}
