package edu.fra.uas.parking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

@Entity
@Table(name = "slots")
public class Slot extends BaseEntity {
    @Column(name = "name", nullable = false, unique = true)
    @Size(min = 3, max = 50)
    private String name;
    @JsonIgnore
    @ManyToMany(mappedBy = "slots", cascade = {CascadeType.MERGE, CascadeType.DETACH})
    private Set<Floor> floors  = new HashSet<>();
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "type_id")
    private Type type;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "slot", cascade = {CascadeType.MERGE, CascadeType.DETACH})
    private Set<Reservation> reservations = new HashSet<>();

    public Slot(String name,Type type) {
        this.name = name;
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

    public Set<Floor> getFloors() {
        return floors;
    }

    public void setFloors(Set<Floor> floors) {
        this.floors = floors;
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
                "name='" + name + '\'' +
                '}';
    }
}
