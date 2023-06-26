package edu.fra.uas.parking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


@Entity
@Table(name = "parks")
public class Park extends BaseEntity {
    @Column(name = "name", nullable = false, unique = true)
    @Size(min = 3, max = 50)
    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "park", fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.DETACH})
    private Set<Building> buildings = new HashSet<>();

    public Park() {
    }

    @SuppressWarnings("unused")
    public Park(String name) {
        this.name = name;
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
    public void setBuildings(Set<Building> buildings) {
        this.buildings = buildings;
    }

    @JsonProperty("buildingCount")
    public Integer getBuildingsCount() {
        return this.buildings.size();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Park park = (Park) o;
        return Objects.equals(name, park.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }

    @Override
    public String toString() {
        return "Park{" +
                "buildings=" + buildings +
                '}';
    }
}
