package edu.fra.uas.parking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "privileges")
@SQLDelete(sql = "UPDATE privileges SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
public class Privilege  extends BaseEntity{
    @Size(min = 3, max = 45)
    @Column(name = "name", nullable = false, unique = true)
    private String name;
    @JsonIgnore
    @ManyToMany(mappedBy = "privileges", cascade = CascadeType.REFRESH)
    private List<Role> roles = new ArrayList<>();

    public Privilege() {
    }

    public Privilege(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Role> getRoles() {
        return roles;
    }

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
    public String toString() {
        return "Privilege{" +
                "id=" + this.getId() +
                ", name='" + name + '\'' +
                '}';
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
