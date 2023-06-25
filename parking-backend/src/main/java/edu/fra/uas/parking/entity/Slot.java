package edu.fra.uas.parking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

@Entity
@Table(name = "slots")
public class Slot extends BaseEntity {
    @Column(name = "Name", nullable = false)
    @Size(min = 3, max = 50)
    private String name;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "floor_id")
    private Floor floor;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "type_id")
    private Type type;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "slot", cascade = {CascadeType.MERGE, CascadeType.DETACH})
    private Set<Reservation> reservations = new HashSet<>();

    public Slot(String name, Floor floor, Type type) {
        this.name = name;
        this.floor = floor;
        this.type = type;
    }

    public Slot() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @SuppressWarnings("unused")
    public Floor getFloor() {
        return floor;
    }

    @SuppressWarnings("unused")
    public void setFloor(Floor floor) {
        this.floor = floor;
    }

    @SuppressWarnings("unused")
    public Type getType() {
        return type;
    }

    @SuppressWarnings("unused")
    public void setType(Type types) {
        this.type = types;
    }

    @SuppressWarnings("unused")
    public Set<Reservation> getReservations() {
        return reservations;
    }

    @SuppressWarnings("unused")
    public void setReservations(Set<Reservation> reservations) {
        this.reservations = reservations;
    }

    @JsonProperty("reservationCount")
    public Integer getReservationsCount() {
        return this.reservations.size();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Slot slot = (Slot) o;
        return Objects.equals(name, slot.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }

    @Override
    public String toString() {
        return "Slot{" +
                "floor=" + floor +
                ", reservations=" + reservations +
                '}';
    }
}
