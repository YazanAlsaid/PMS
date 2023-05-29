package edu.fra.uas.parking.repository;

import edu.fra.uas.parking.entity.TimeStampDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeStampDetailsRepository extends JpaRepository<TimeStampDetails, Long> {
}
