package edu.fra.uas.parking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "slots")
public class Slot extends BaseEntity {
    @Column(name = "Name", nullable = false)
    @Size(min = 3, max = 50)
    private String name;
    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "floor_id")
    private Floor floor;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(name = "type_id")
    private Type type;

    @OneToMany(mappedBy = "slot", cascade = {CascadeType.MERGE, CascadeType.DETACH})
    private List<Reservation> reservations = new ArrayList<>();

    public Slot(String name, Floor floor,Type type) {
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
    public List<Reservation> getReservations() {
        return reservations;
    }

    @SuppressWarnings("unused")
    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Slot slot = (Slot) o;
        return Objects.equals(floor, slot.floor) && Objects.equals(reservations, slot.reservations);
    }

    @Override
    public int hashCode() {
        return Objects.hash(floor, reservations);
    }

    @Override
    public String toString() {
        return "Slot{" +
                "floor=" + floor +
                ", reservations=" + reservations +
                '}';
    }
}
