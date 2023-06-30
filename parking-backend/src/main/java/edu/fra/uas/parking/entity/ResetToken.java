package edu.fra.uas.parking.entity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
public class ResetToken extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String token;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @Column(nullable = false)
    private LocalDateTime expirationDateTime;

    // Constructors, getters, and setters

    public ResetToken() {
        // Default constructor
    }

    public ResetToken(String token, User user, LocalDateTime expirationDateTime) {
        this.token = token;
        this.user = user;
        this.expirationDateTime = expirationDateTime;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getExpirationDateTime() {
        return expirationDateTime;
    }

    public void setExpirationDateTime(LocalDateTime expirationDateTime) {
        this.expirationDateTime = expirationDateTime;
    }

    public Long getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ResetToken that)) return false;
        return Objects.equals(token, that.token) && Objects.equals(user, that.user) && Objects.equals(expirationDateTime, that.expirationDateTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(token, user, expirationDateTime);
    }

    @Override
    public String toString() {
        return "ResetToken{" +
                "token='" + token + '\'' +
                ", user=" + user +
                ", expirationDateTime=" + expirationDateTime +
                '}';
    }
}
