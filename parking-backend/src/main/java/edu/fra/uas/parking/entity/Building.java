package edu.fra.uas.parking.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Building extends BaseEntity {
    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    @JoinColumn(name = "park_id",nullable = false)
    private Park park;
    @OneToMany(mappedBy = "building",cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    private List<Floor> floors = new ArrayList<>();
    public Building(Park park, List<Floor> floors) {
        this.park = park;
        this.floors = floors;
    }
    public Building() {

    }
    public Park getPark() {
        return park;
    }
    public void setPark(Park park) {
        this.park = park;
    }
    public List<Floor> getFloors() {
        return floors;
    }

    public void setFloors(List<Floor> floors) {
        this.floors = floors;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Building building = (Building) o;
        return Objects.equals(park, building.park) && Objects.equals(floors, building.floors);
    }
    @Override
    public int hashCode() {
        return Objects.hash(park, floors);
    }
    @Override
    public String toString() {
        return "Building{" +
                "park=" + park +
                ", floors=" + floors +
                '}';
    }
}
