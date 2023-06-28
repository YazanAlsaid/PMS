package edu.fra.uas.parking.entity;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class DTOUser {

    private Long id;
    private String firstName;

    private String lastName;

    private String email;

    private Set<Role> roles = new HashSet<>();


    public DTOUser() {
    }
    public DTOUser(User user){
        this.id = user.getId();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.email = user.getEmail();
        this.roles = user.getRoles();
    }

    public Long getId() {
        return id;
    }

    @SuppressWarnings("unused")
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @SuppressWarnings("unused")
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @SuppressWarnings("unused")
    public void setEmail(String email) {
        this.email = email;
    }


    @SuppressWarnings("unused")
    public void setRole(Role role) {
        this.roles.add(role);
    }


    @SuppressWarnings("unused")
    public Boolean hasRole(String roleName) {
        for (Role role : this.roles) {
            if (role.getName().equals(roleName)) {
                return true;
            }
        }
        return false;
    }

    @SuppressWarnings("unused")
    public String getFirstName() {
        return firstName;
    }

    @SuppressWarnings("unused")
    public String getLastName() {
        return lastName;
    }

    @SuppressWarnings("unused")
    public String getEmail() {
        return email;
    }


    @SuppressWarnings("unused")
    public Set<Role> getRoles() {
        return roles;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DTOUser dtoUser)) return false;
        return Objects.equals(firstName, dtoUser.firstName) && Objects.equals(lastName, dtoUser.lastName) && Objects.equals(email, dtoUser.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(firstName, lastName, email);
    }

    @Override
    public String toString() {
        return "DTOUser{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
