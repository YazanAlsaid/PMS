package edu.fra.uas.parking.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


@Entity
@Table(name = "nfc_cards")
public class NfcCard extends BaseEntity {
    @Column(name = "serial_number", nullable = false, unique = true)
    @Size(min = 3, max = 50)
    private String serialNumber;
    @Column(name = "nfc_from")
    private LocalDate nfcFrom;
    @Column(name = "nfc_to")
    private LocalDate nfcTo;
    @JsonIgnore
    @OneToMany(mappedBy = "nfcCard", cascade = CascadeType.MERGE)
    private Set<Reservation> reservations = new HashSet<>();
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public NfcCard() {
    }

    @SuppressWarnings("unused")
    public NfcCard(String serialNumber, User user, LocalDate nfcFrom, LocalDate nfcTo) {
        this.serialNumber = serialNumber;
        this.nfcFrom = nfcFrom;
        this.nfcTo = nfcTo;
        this.user = user;
    }

    public NfcCard(String serialNumber, User user) {
        this.serialNumber = serialNumber;
        this.user = user;
    }

    @SuppressWarnings("unused")
    public String getSerialNumber() {
        return serialNumber;
    }

    @SuppressWarnings("unused")
    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    @SuppressWarnings("unused")
    public Set<Reservation> getReservations() {
        return reservations;
    }

    @SuppressWarnings("unused")
    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
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
    public LocalDate getNfcFrom() {
        return nfcFrom;
    }

    @SuppressWarnings("unused")
    public LocalDate getNfcTo() {
        return nfcTo;
    }

    @SuppressWarnings("unused")
    public void setNfcFrom(LocalDate nfcFrom) {
        this.nfcFrom = nfcFrom;
    }

    @SuppressWarnings("unused")
    public void setNfcTo(LocalDate nfcTo) {
        this.nfcTo = nfcTo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        NfcCard nfcCard = (NfcCard) o;
        return Objects.equals(serialNumber, nfcCard.serialNumber) && Objects.equals(nfcFrom, nfcCard.nfcFrom) && Objects.equals(nfcTo, nfcCard.nfcTo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), serialNumber, nfcFrom, nfcTo);
    }

    @Override
    public String toString() {
        return "NfcCard{" +
                "nfcFrom=" + nfcFrom +
                ", nfcTo=" + nfcTo +
                '}';
    }
}
