package edu.fra.uas.parking.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Slot extends BaseEntity{

    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    @JoinColumn(name = "floor_id",nullable = false)
    private Floor floor;
    @OneToMany(mappedBy = "slot",cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    private List<Type> types = new ArrayList<>();

    @OneToMany(mappedBy = "slot", cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    private List<Reservation> reservations = new ArrayList<>();
    public Floor getFloor() {
        return floor;
    }
    public void setFloor(Floor floor) {
        this.floor = floor;
    }
    public List<Type> getTypes() {
        return types;
    }
    public void setTypes(List<Type> types) {
        this.types = types;
    }
    public List<Reservation> getReservations() {
        return reservations;
    }
    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Slot slot = (Slot) o;
        return Objects.equals(floor, slot.floor) && Objects.equals(types, slot.types) && Objects.equals(reservations, slot.reservations);
    }
    @Override
    public int hashCode() {
        return Objects.hash(floor, types, reservations);
    }
    @Override
    public String toString() {
        return "Slot{" +
                "floor=" + floor +
                ", types=" + types +
                ", reservations=" + reservations +
                '}';
    }
}
