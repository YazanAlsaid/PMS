package edu.fra.uas.parking.entity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class Reservation extends BaseEntity {
    @Column(name = "reservationFrom", nullable = false)
    private LocalDateTime reservationFrom;
    @Column(name = "reservationTo", nullable = false)
    private LocalDateTime reservationTo;
    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    @JoinColumn(name = "nfcCard_id")
    private NfcCard nfcCard;

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    @JoinColumn(name = "slot_id",nullable = false)
    private Slot slot;
    public LocalDateTime getReservationFrom() {
        return reservationFrom;
    }
    public LocalDateTime getReservationTo() {
        return reservationTo;
    }

    public void setReservationFrom(LocalDateTime reservationFrom) {
        this.reservationFrom = reservationFrom;
    }

    public void setReservationTo(LocalDateTime reservationTo) {
        this.reservationTo = reservationTo;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Reservation that)) return false;
        return Objects.equals(reservationFrom, that.reservationFrom) &&
                Objects.equals(reservationTo, that.reservationTo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(reservationFrom, reservationTo);
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "reservationFrom=" + reservationFrom +
                ", reservationTo=" + reservationTo +
                '}';
    }
}
