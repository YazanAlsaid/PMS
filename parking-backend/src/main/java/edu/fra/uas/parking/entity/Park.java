package edu.fra.uas.parking.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Entity
@Table(name = "parks")
public class Park extends BaseEntity {
    @Column(name = "name", nullable = false)
    @Size(min = 3, max = 50)
    private String name;
    @OneToMany(mappedBy = "park", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    private List<Building> buildings = new ArrayList<>();

    public Park() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
