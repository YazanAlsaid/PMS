package edu.fra.uas.parking.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

@Entity
@Table(name = "buildings")
public class Building extends BaseEntity {
    @Column(name = "name", nullable = false, unique = true)
    @Size(min = 3, max = 50)
    private String name;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "park_id", nullable = false)
    private Park park;
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "buildings", cascade = CascadeType.MERGE)
    private Set<Floor> floors = new HashSet<>();
    @JsonManagedReference("address-building")
    @OneToOne(mappedBy = "building", fetch = FetchType.<EAGER>, cascade = CascadeType.MERGE)
    @PrimaryKeyJoinColumn
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
        if (!super.equals(o)) return false;
        Building building = (Building) o;
        return Objects.equals(name, building.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }

    @Override
    public String toString() {
        return "Building{" +
                "park=" + park +
                ", floors=" + floors +
                '}';
    }
}
