package edu.fra.uas.parking.repository;

import edu.fra.uas.parking.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
