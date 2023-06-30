package edu.fra.uas.parking.repository;

import edu.fra.uas.parking.entity.Building;
import edu.fra.uas.parking.entity.Floor;
import edu.fra.uas.parking.entity.Reservation;
import edu.fra.uas.parking.entity.Slot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    //List<Reservation> findBySlot(Slot slot);
    //List<Reservation> findBySlotIdAndFloorIdAndBuildingId(Long slotId,Long floorId,Long buildingId);
    //@Query("select r from Reservation r left join r.slot s where s.id = : slotId and left join  r.slot." )
    //List<Reservation> findAllByExpiration(long slotId, long floorId, long BuildingId);
    //List<Reservation> findAllBySlotAndSlot_FloorsInAndSlot_Floors_Building(Slot slot, Floor floor, Building building);

    //List<Reservation> findBySlotAndFloorAndBuilding(Slot slot, Floor selectedFloor, Building building);

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
