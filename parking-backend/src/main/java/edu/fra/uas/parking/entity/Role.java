package edu.fra.uas.parking.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

@Entity
@Table(name = "roles")
public class Role extends BaseEntity implements Serializable {
    @Column(name = "Name", nullable = false)
    @Size(min = 3, max = 50)
    private String name;
    @JsonIgnore
    @ManyToMany(mappedBy = "roles", cascade = {CascadeType.MERGE, CascadeType.DETACH})
    private Set<User> users = new HashSet<>();
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinTable(name = "privilege_role",
            joinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "privilege_id", referencedColumnName = "id"))
    private Set<Privilege> privileges = new HashSet<>();

    public Role() {
    }

    public Role(String name) {
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
    public void setUsers(User user) {
        this.users.add(user);
    }

    @SuppressWarnings("unused")
    public Set<User> getUsers() {
        return users;
    }
    public void setPrivilege(Privilege privilege) {
          this.privileges.add(privilege);
    }
    public void setPrivileges(Set<Privilege> privileges) {
        for (Privilege privilege: privileges){
            if (!this.privileges.contains(privilege)) {
                this.privileges.add(privilege);
            }
        }
    }
    @SuppressWarnings("unused")
    public Set<Privilege> getPrivileges() {
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
