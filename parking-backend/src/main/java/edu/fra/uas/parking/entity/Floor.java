package edu.fra.uas.parking.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

@Entity
@Table(name = "floors")
public class Floor extends BaseEntity {
    @Column(name = "name", nullable = false, unique = true)
    @Size(min = 3, max = 50)
    private String name;
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "building_floor",
            joinColumns = @JoinColumn(name = "building_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "floor_id", referencedColumnName = "id")
    )
    private Set<Building> buildings = new HashSet<>();
    @JsonIgnore
    @ManyToMany(mappedBy = "floors", cascade = CascadeType.MERGE)
    private Set<Slot> slots = new HashSet<>();

    public Floor(String name, Building building) {
        this.name = name;
        this.buildings.add(building);
    }

    public Floor() {
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
    public Set<Building> getBuildings() {
        return buildings;
    }

    @SuppressWarnings("unused")
    public void setBuilding(Building building) {
        this.buildings.add(building);
    }

    @SuppressWarnings("unused")
    public Set<Slot> getSlots() {
        return slots;
    }

    @SuppressWarnings("unused")
    public void setSlots(Set<Slot> slots) {
        this.slots = slots;
    }

    @SuppressWarnings("unused")
    public Integer getSlotsCount() {
        return this.slots.size();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Floor floor = (Floor) o;
        return Objects.equals(name, floor.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }

    @Override
    public String toString() {
        return "Floor{" +
                "name='" + name + '\'' +
                '}';
    }
}
