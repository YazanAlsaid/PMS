package edu.fra.uas.parking.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Entity
public class Park extends BaseEntity {

    @OneToMany(mappedBy = "park", cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    private List<Building> buildings = new ArrayList<>();

    public Park() {
    }
    public List<Building> getBuildings() {
        return buildings;
    }

    public void setBuildings(List<Building> buildings) {
        this.buildings = buildings;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Park park = (Park) o;
        return Objects.equals(buildings, park.buildings);
    }
    @Override
    public int hashCode() {
        return Objects.hash(buildings);
    }
    @Override
    public String toString() {
        return "Park{" +
                "buildings=" + buildings +
                '}';
    }
}
