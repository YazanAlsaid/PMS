package edu.fra.uas.parking.entity;


import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Entity
@Table(name = "nfc_cards")
public class NfcCard extends BaseEntity {
    @Column(name = "name", nullable = false)
    @Size(min = 3, max = 50)
    private String name;
    @Column(name ="nfc_from", nullable = false)
    private LocalDateTime nfcFrom;
    @Column(name ="nfc_to", nullable = false)
    private LocalDateTime nfcTo;
    @OneToMany(mappedBy = "nfcCard", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    private List<Reservation> reservations = new ArrayList<>();
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public NfcCard() {
    }

    public NfcCard(String name, LocalDateTime nfcFrom, LocalDateTime nfcTo) {
        this.name = name;
        this.nfcFrom = nfcFrom;
        this.nfcTo = nfcTo;
    }

    @SuppressWarnings("unused")
    public String getName() {
        return name;
    }

    @SuppressWarnings("unused")
    public void setName(String name) {
        this.name = name;
    }

    @SuppressWarnings("unused")
    public List<Reservation> getReservations() {
        return reservations;
    }

    @SuppressWarnings("unused")
    public void setReservations(List<Reservation> reservations) {
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
    public LocalDateTime getNfcFrom() {
        return nfcFrom;
    }

    @SuppressWarnings("unused")
    public LocalDateTime getNfcTo() {
        return nfcTo;
    }

    @SuppressWarnings("unused")
    public void setNfcFrom(LocalDateTime nfcFrom) {
        this.nfcFrom = nfcFrom;
    }

    @SuppressWarnings("unused")
    public void setNfcTo(LocalDateTime nfcTo) {
        this.nfcTo = nfcTo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof NfcCard nfcCard)) return false;
        return Objects.equals(nfcFrom, nfcCard.nfcFrom) && Objects.equals(nfcTo, nfcCard.nfcTo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nfcFrom, nfcTo);
    }

    @Override
    public String toString() {
        return "NfcCard{" +
                "nfcFrom=" + nfcFrom +
                ", nfcTo=" + nfcTo +
                '}';
    }
}
