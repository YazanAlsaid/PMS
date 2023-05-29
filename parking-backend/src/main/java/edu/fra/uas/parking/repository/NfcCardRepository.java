package edu.fra.uas.parking.repository;

import edu.fra.uas.parking.entity.NfcCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NfcCardRepository extends JpaRepository<NfcCard, Long> {

}
