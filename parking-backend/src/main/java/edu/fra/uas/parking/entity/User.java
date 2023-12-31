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
import java.util.HashSet;
import java.util.Set;
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
    @Column(name = "gender", nullable = false)
    private Gender gender;
    @Column(name = "email", nullable = false, unique = true)
    @Size(min = 5, max = 250)
    @Email(flags = Pattern.Flag.CASE_INSENSITIVE, message = "You should give a unique email")
    private String email;
    @Column(name = "password", nullable = false)
    private String password;
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "role_user",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private Set<Reservation> reservations = new HashSet<>();
    @JsonIgnore
    @OneToOne(mappedBy = "user", cascade = CascadeType.MERGE)
    private NfcCard nfcCard;

    public User() {
    }

    public User(String firstName, String lastName, Gender gender, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
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
    public Gender getGender() {
        return gender;
    }

    @SuppressWarnings("unused")
    public void setGender(Gender gender) {
        this.gender = gender;
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
        this.roles.add(role);
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
    public Set<Role> getRoles() {
        return roles;
    }

    @SuppressWarnings("unused")
    public Set<Reservation> getReservations() {
        return reservations;
    }

    @SuppressWarnings("unused")
    public void setReservations(Set<Reservation> reservations) {
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
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        User user = (User) o;
        return Objects.equals(firstName, user.firstName) && Objects.equals(lastName, user.lastName) && Objects.equals(email, user.email) && Objects.equals(password, user.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), firstName, lastName, email, password);
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
