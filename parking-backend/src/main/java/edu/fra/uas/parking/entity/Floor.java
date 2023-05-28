package edu.fra.uas.parking.entity;

import javax.persistence.*;

import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Floor extends BaseEntity{
    @Column(name = "Name",nullable = false)
    @Size(min = 3,max = 50)
    private String name;
    @ManyToOne(cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    @JoinColumn(name = "building_id",nullable = false)
    private Building building;
    @OneToMany(mappedBy = "floor",cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    private List<Slot> slots = new ArrayList<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Building getBuilding() {
        return building;
    }
    public void setBuilding(Building building) {
        this.building = building;
    }
    public List<Slot> getSlots() {
        return slots;
    }
    public void setSlots(List<Slot> slots) {
        this.slots = slots;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Floor floor = (Floor) o;
        return Objects.equals(building, floor.building) && Objects.equals(slots, floor.slots);
    }

    @Override
    public int hashCode() {
        return Objects.hash(building, slots);
    }

    @Override
    public String toString() {
        return "Floor{" +
                "building=" + building +
                ", slots=" + slots +
                '}';
    }
}
