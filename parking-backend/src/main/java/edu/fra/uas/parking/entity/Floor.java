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
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

@Entity
@Table(name = "floors")
public class Floor extends BaseEntity {
    @Column(name = "Name", nullable = false)
    @Size(min = 3, max = 50)
    private String name;
    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "building_id")
    private Building building;
    @JsonIgnore
    @OneToMany(mappedBy = "floor", cascade = {CascadeType.MERGE, CascadeType.DETACH})
    private Set<Slot> slots = new HashSet<>();

    public Floor(String name, Building building) {
        this.name = name;
        this.building = building;
    }
    public Floor() {}

    @SuppressWarnings("unused")
    public String getName() {
        return name;
    }

    @SuppressWarnings("unused")
    public void setName(String name) {
        this.name = name;
    }

    @SuppressWarnings("unused")
    public Building getBuilding() {
        return building;
    }

    @SuppressWarnings("unused")
    public void setBuilding(Building building) {
        this.building = building;
    }

    @SuppressWarnings("unused")
    public Set<Slot> getSlots() {
        return slots;
    }

    @SuppressWarnings("unused")
    public void setSlots(Set<Slot> slots) {
        this.slots = slots;
    }
    public Integer getSlotsCount(){
        return this.slots.size();
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
