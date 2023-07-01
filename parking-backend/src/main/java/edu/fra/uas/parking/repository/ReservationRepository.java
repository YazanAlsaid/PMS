package edu.fra.uas.parking.repository;

import edu.fra.uas.parking.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    @Query(value = "SELECT b.id AS buildId, f.id AS floorId, s.id AS slotId, r.* " +
            "FROM buildings AS b " +
            "LEFT JOIN building_floor AS bf ON bf.building_id = b.id " +
            "LEFT JOIN floors AS f ON f.id = bf.floor_id " +
            "LEFT JOIN floor_slot AS fs ON fs.floor_id = f.id " +
            "LEFT JOIN slots AS s ON s.id = fs.slot_id " +
            "LEFT JOIN reservations AS r ON r.slot_id = s.id " +
            "WHERE b.id = :buildingId " +
            "AND f.id = :floorId " +
            "AND s.id = :slotId", nativeQuery = true)
    List<Reservation> findByBuildingFloorAndSlot(
            @Param("buildingId") Long buildingId,
            @Param("floorId") Long floorId,
            @Param("slotId") Long slotId
    );

    @Query("SELECT COUNT(r) AS reservationCount, WEEK(r.reservationAt) AS weekNumber " +
            "FROM Reservation r " +
            "GROUP BY WEEK(r.reservationAt) " +
            "ORDER BY WEEK(2) ASC")
    List<Object[]> getReservationCountByWeek();

    @Query("SELECT COUNT(r) AS reservationCount, MONTH(r.reservationAt) AS weekNumber " +
            "FROM Reservation r " +
            "GROUP BY MONTH(r.reservationAt) " +
            "ORDER BY MONTH(2) ASC")
    List<Object[]> getReservationCountByMonth();
}
