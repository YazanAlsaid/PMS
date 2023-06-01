package edu.fra.uas.parking.entity;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;


import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "roles")
@SQLDelete(sql = "UPDATE roles SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
public class Role extends BaseEntity implements Serializable {
    @Column(name = "Name", nullable = false)
    @Size(min = 3, max = 50)
    private String name;
    @ManyToMany(mappedBy = "roles", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    private List<User> users = new ArrayList<>();
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH})
    @JoinTable(name = "privilege_role",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "privilege_id", referencedColumnName = "id"))
    private List<Privilege> privileges = new ArrayList<>();

    public Role() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUsers(User user) {
        this.users.add(user);
    }

    public Role(String name) {
        this.name = name;
    }

    public List<User> getUsers() {
        return users;
    }

    public List<Privilege> getPrivileges() {
        return privileges;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Role role = (Role) o;
        return name.equals(role.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), name);
    }

    @Override
    public String toString() {
        return "Role{" +
                "users=" + users +
                '}';
    }
}
