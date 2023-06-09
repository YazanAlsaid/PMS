package edu.fra.uas.parking.repository;

import edu.fra.uas.parking.entity.Building;
import edu.fra.uas.parking.entity.Floor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FloorRepository extends  JpaRepository<Floor, Long> {
}





