package edu.fra.uas.parking.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Entity
@Table(name = "users")
public class User extends BaseEntity {
    @Column(name = "first_name", nullable = false)
    @Size(min = 3, max = 50)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    @Size(min = 3, max = 50)
    private String lastName;
    @Column(name = "email", nullable = false, unique = true)
    @Size(min = 5, max = 250)
    @Email(flags = Pattern.Flag.CASE_INSENSITIVE, message = "You should give a unique email")
    private String email;
    @Column(name = "password", nullable = false)
    private String password;
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE, CascadeType.DETACH})
    @JoinTable(name = "role_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles = new ArrayList<>();
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = {CascadeType.MERGE, CascadeType.DETACH})
    private List<Reservation> reservations = new ArrayList<>();
    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = {CascadeType.MERGE, CascadeType.DETACH})
    private NfcCard nfcCard;

    public User() {
    }

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        this.password = bCryptPasswordEncoder.encode(password);
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
    public void setPassword(String password) {
        this.password = password;
    }

    @SuppressWarnings("unused")
    public void setRole(Role role) {
        if (!this.roles.contains(role)) {
            this.roles.add(role);
        }
    }

    @SuppressWarnings("unused")
    public void setHashedPassword(String password) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        this.password = bCryptPasswordEncoder.encode(password);
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
    public String getPassword() {
        return password;
    }

    @SuppressWarnings("unused")
    public List<Role> getRoles() {
        return roles;
    }

    @SuppressWarnings("unused")
    public List<Reservation> getReservations() {
        return reservations;
    }

    @SuppressWarnings("unused")
    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }

    @SuppressWarnings("unused")
    public void setReservation(Reservation reservation) {
        this.reservations.add(reservation);
    }

    @SuppressWarnings("unused")
    public NfcCard getNfcCard() {
        return nfcCard;
    }

    @SuppressWarnings("unused")
    public void setNfcCard(NfcCard nfcCard) {
        this.nfcCard = nfcCard;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return Objects.equals(firstName, user.firstName) &&
                Objects.equals(lastName, user.lastName) &&
                Objects.equals(email, user.email) &&
                Objects.equals(password, user.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(firstName, lastName, email, password);
    }

    @Override
    public String toString() {
        return "User{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                ", reservations=" + reservations +
                ", nfcCard=" + nfcCard +
                '}';
    }
}
