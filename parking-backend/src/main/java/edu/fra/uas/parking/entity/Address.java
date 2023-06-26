package edu.fra.uas.parking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.util.Objects;

@Entity
@Table(name = "addresses")
public class Address extends BaseEntity {
    @Size(min = 3, max = 50)
    @Column(name = "street_name", nullable = false)
    private String streetName;
    @Column(name = "building_number", nullable = false)
    private Integer buildingNumber;
    @Column(name = "post_code", nullable = false)
    private Integer postCode;
    @Size(min = 3, max = 50)
    @Column(name = "city", nullable = false)
    private String city;
    @JsonBackReference("address-building")
    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "building_id", referencedColumnName = "id")
    private Building building;

    public Address() {
    }

    public Address(String streetName, Integer buildingNumber, Integer postCode, String city, Building building) {
        this.streetName = streetName;
        this.buildingNumber = buildingNumber;
        this.postCode = postCode;
        this.city = city;
        this.building = building;
    }

    @SuppressWarnings("unused")
    public String getStreetName() {
        return streetName;
    }

    @SuppressWarnings("unused")
    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    @SuppressWarnings("unused")
    public Integer getBuildingNumber() {
        return buildingNumber;
    }

    @SuppressWarnings("unused")
    public void setBuildingNumber(Integer buildingNumber) {
        this.buildingNumber = buildingNumber;
    }

    @SuppressWarnings("unused")
    public Integer getPostCode() {
        return postCode;
    }

    @SuppressWarnings("unused")
    public void setPostCode(Integer postCode) {
        this.postCode = postCode;
    }

    @SuppressWarnings("unused")
    public String getCity() {
        return city;
    }

    @SuppressWarnings("unused")
    public void setCity(String city) {
        this.city = city;
    }

    @SuppressWarnings("unused")
    public Building getBuilding() {
        return building;
    }

    @SuppressWarnings("unused")
    public void setBuilding(Building building) {
        this.building = building;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Address address = (Address) o;
        return Objects.equals(streetName, address.streetName) && Objects.equals(buildingNumber, address.buildingNumber) && Objects.equals(postCode, address.postCode) && Objects.equals(city, address.city);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), streetName, buildingNumber, postCode, city);
    }

    @Override
    public String toString() {
        return "Address{" +
                "streetName='" + streetName + '\'' +
                ", buildingNumber=" + buildingNumber +
                ", postCode=" + postCode +
                ", city='" + city + '\'' +
                ", building=" + building +
                '}';
    }
}
