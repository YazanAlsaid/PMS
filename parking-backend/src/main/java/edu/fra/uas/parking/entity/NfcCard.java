package edu.fra.uas.parking.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Entity
public class NfcCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime nfcFrom;
    private LocalDateTime nfcTo;
    @OneToMany(mappedBy = "nfcCard", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    private List<Reservation> reservations = new ArrayList<>();
    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user;
    @Embedded
    private TimeStampDetails timeStampDetails;

    public Long getId() {
        return id;
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
