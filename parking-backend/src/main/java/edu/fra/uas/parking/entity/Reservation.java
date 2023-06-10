package edu.fra.uas.parking.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "reservations")
public class Reservation extends BaseEntity {
    @Column(name = "reservation_from", nullable = false)
    private LocalDateTime reservationFrom;
    @Column(name = "reservation_to", nullable = false)
    private LocalDateTime reservationTo;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "guest_id")
    private Guest guest;
    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "nfcCard_id")
    private NfcCard nfcCard;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "slot_id")
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
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Guest getGuest() {
        return guest;
    }
    public void setGuest(Guest guest) {
        this.guest = guest;
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
