package edu.fra.uas.parking.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

@Entity
@Table(name = "buildings")
public class Building extends BaseEntity {
    @Column(name = "Name", nullable = false)
    @Size(min = 3, max = 50)
    private String name;
    @JsonIgnore
    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "park_id")
    private Park park;
    @JsonIgnore
    @OneToMany(mappedBy = "building", cascade = {CascadeType.MERGE, CascadeType.DETACH})
    private Set<Floor> floors = new HashSet<>();
    @OneToOne(mappedBy = "building", cascade = {CascadeType.MERGE, CascadeType.DETACH})
    private Address address;

    public Building(String name, Park park) {
        this.name = name;
        this.park = park;
    }

    public Building() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @SuppressWarnings("unused")
    public Park getPark() {
        return park;
    }

    @SuppressWarnings("unused")
    public void setPark(Park park) {
        this.park = park;
    }

    @SuppressWarnings("unused")
    public Set<Floor> getFloors() {
        return floors;
    }

    @SuppressWarnings("unused")
    public void setFloors(Set<Floor> floors) {
        this.floors = floors;
    }

    @JsonProperty("floorCount")
    public Integer getFloorsCount() {
        return this.floors.size();
    }

    @SuppressWarnings("unused")
    public Address getAddress() {
        return address;
    }

    @SuppressWarnings("unused")
    public void setAddress(Address address) {
        this.address = address;
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
