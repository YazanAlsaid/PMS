package edu.fra.uas.parking.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Entity
@Table(name ="nfcCards")
@SQLDelete(sql = "UPDATE nfcCards SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
public class NfcCard extends BaseEntity{
    @Column(name = "Deleted")
    private boolean deleted = Boolean.FALSE;
    @Column(name = "Name",nullable = false)
    @Size(min = 3,max = 50)
    private String name;
    private LocalDateTime nfcFrom;
    private LocalDateTime nfcTo;
    @OneToMany(mappedBy = "nfcCard", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    private List<Reservation> reservations = new ArrayList<>();
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getNfcFrom() {
        return nfcFrom;
    }

    public LocalDateTime getNfcTo() {
        return nfcTo;
    }

    public void setNfcFrom(LocalDateTime nfcFrom) {
        this.nfcFrom = nfcFrom;
    }

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
