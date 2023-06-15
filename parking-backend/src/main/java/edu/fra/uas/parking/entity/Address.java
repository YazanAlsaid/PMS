package edu.fra.uas.parking.entity;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "addresses")
public class Address extends BaseEntity implements Serializable {
    private static final long serialVersionUID = 1L;
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
    @OneToOne(cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinColumn(name = "building_id", referencedColumnName = "id")
    private Building building;

    public Address() {}
    public Address(String streetName, Integer buildingNumber, Integer postCode, String city, Building building) {
        this.streetName = streetName;
        this.buildingNumber = buildingNumber;
        this.postCode = postCode;
        this.city = city;
        this.building = building;
    }

    public String getStreetName() {
        return streetName;
    }
    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }
    public Integer getBuildingNumber() {
        return buildingNumber;
    }
    public void setBuildingNumber(Integer buildingNumber) {
        this.buildingNumber = buildingNumber;
    }
    public Integer getPostCode() {
        return postCode;
    }
    public void setPostCode(Integer postCode) {
        this.postCode = postCode;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }
    public Building getBuilding() {
        return building;
    }
    public void setBuilding(Building building) {
        this.building = building;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return Objects.equals(streetName, address.streetName) && Objects.equals(buildingNumber, address.buildingNumber) && Objects.equals(postCode, address.postCode) && Objects.equals(city, address.city) && Objects.equals(building, address.building);
    }
    @Override
    public int hashCode() {
        return Objects.hash(streetName, buildingNumber, postCode, city, building);
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