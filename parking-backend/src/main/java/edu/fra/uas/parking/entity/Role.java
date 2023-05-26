package edu.fra.uas.parking.entity;

import jakarta.persistence.*;


import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Role extends BaseEntity {
    @Column(name = "Name",nullable = false)
    @Size(min = 3,max = 50)
    private String name;
    @ManyToMany(mappedBy = "roles", cascade = {CascadeType.PERSIST,CascadeType.MERGE,CascadeType.DETACH})
    private List<User> users = new ArrayList<>();
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Role role = (Role) o;
        return Objects.equals(users, role.users);
    }

    @Override
    public int hashCode() {
        return Objects.hash(users);
    }
    @Override
    public String toString() {
        return "Role{" +
                "users=" + users +
                '}';
    }
}
