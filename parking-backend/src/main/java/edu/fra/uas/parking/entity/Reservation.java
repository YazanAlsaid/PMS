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
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "nfc_card_id")
    private NfcCard nfcCard;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "slot_id")
    private Slot slot;

    public Reservation() {
    }

    public Reservation(LocalDateTime reservationFrom, LocalDateTime reservationTo) {
        this.reservationFrom = reservationFrom;
        this.reservationTo = reservationTo;
    }

    public Reservation(LocalDateTime reservationFrom, LocalDateTime reservationTo, User user, Guest guest, NfcCard nfcCard, Slot slot) {
        this.reservationFrom = reservationFrom;
        this.reservationTo = reservationTo;
        this.user = user;
        this.guest = guest;
        this.nfcCard = nfcCard;
        this.slot = slot;
    }

    @SuppressWarnings("unused")
    public LocalDateTime getReservationFrom() {
        return reservationFrom;
    }

    @SuppressWarnings("unused")
    public void setReservationFrom(LocalDateTime reservationFrom) {
        this.reservationFrom = reservationFrom;
    }

    @SuppressWarnings("unused")
    public LocalDateTime getReservationTo() {
        return reservationTo;
    }

    @SuppressWarnings("unused")
    public void setReservationTo(LocalDateTime reservationTo) {
        this.reservationTo = reservationTo;
    }

    @SuppressWarnings("unused")
    public User getUser() {
        return user;
    }

    @SuppressWarnings("unused")
    public void setUser(User user) {
        this.user = user;
    }

    @SuppressWarnings("unused")
    public Guest getGuest() {
        return guest;
    }

    @SuppressWarnings("unused")
    public void setGuest(Guest guest) {
        this.guest = guest;
    }

    @SuppressWarnings("unused")
    public NfcCard getNfcCard() {
        return nfcCard;
    }

    @SuppressWarnings("unused")
    public void setNfcCard(NfcCard nfcCard) {
        this.nfcCard = nfcCard;
    }

    @SuppressWarnings("unused")
    public Slot getSlot() {
        return slot;
    }

    @SuppressWarnings("unused")
    public void setSlot(Slot slot) {
        this.slot = slot;
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
