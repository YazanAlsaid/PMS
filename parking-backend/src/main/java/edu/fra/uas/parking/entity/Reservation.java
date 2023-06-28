package edu.fra.uas.parking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "reservations")
public class Reservation extends BaseEntity {
    @Column(name = "reservation_at", nullable = false)
    private LocalDate reservationAt;
    @Column(name = "reservation_period", nullable = false)
    private Period reservationPeriod;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "guest_id")
    private Guest guest;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "nfc_card_id", nullable = false)
    private NfcCard nfcCard;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "slot_id", nullable = false)
    private Slot slot;

    public Reservation() {
    }

    public Reservation(LocalDate reservationAt, Period reservationPeriod, User user, Guest guest, NfcCard nfcCard, Slot slot) {
        this.reservationAt = reservationAt;
        this.reservationPeriod = reservationPeriod;
        this.user = user;
        this.guest = guest;
        this.nfcCard = nfcCard;
        this.slot = slot;
    }

    @SuppressWarnings("unused")
    public LocalDate getReservationAt() {
        return reservationAt;
    }

    @SuppressWarnings("unused")
    public void setReservationFrom(LocalDate reservationFrom) {
        this.reservationAt = reservationFrom;
    }

    @SuppressWarnings("unused")
    public Period getReservationPeriod() {
        return reservationPeriod;
    }

    @SuppressWarnings("unused")
    public void setReservationPeriod(Period reservationPeriod) {
        this.reservationPeriod = reservationPeriod;
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
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Reservation that = (Reservation) o;
        return Objects.equals(reservationAt, that.reservationAt) && reservationPeriod == that.reservationPeriod;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), reservationAt, reservationPeriod);
    }

    @Override
    public String toString() {
        return "Reservation{" +
                "reservationAt=" + reservationAt +
                ", reservationPeriod=" + reservationPeriod +
                '}';
    }
}
