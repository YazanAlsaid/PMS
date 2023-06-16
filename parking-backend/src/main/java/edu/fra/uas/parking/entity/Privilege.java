package edu.fra.uas.parking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

@Entity
@Table(name = "privileges")
public class Privilege extends BaseEntity {
    @Size(min = 3, max = 45)
    @Column(name = "name", nullable = false, unique = true)
    private String name;
    @JsonIgnore
    @ManyToMany(mappedBy = "privileges",cascade = {CascadeType.MERGE, CascadeType.DETACH})
    private Set<Role> roles = new HashSet<>();

    public Privilege() {
    }

    @SuppressWarnings("unused")
    public Privilege(String name) {
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
    public Set<Role> getRoles() {
        return roles;
    }

    @SuppressWarnings("unused")
    public void setRole(Role role) {
        this.roles.add(role);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Privilege privilege = (Privilege) o;
        return name.equals(privilege.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

    @Override
    public String toString() {
        return "Privilege{" +
                "id=" + this.getId() +
                ", name='" + name + '\'' +
                '}';
    }
}
