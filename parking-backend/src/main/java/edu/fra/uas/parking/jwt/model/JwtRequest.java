package edu.fra.uas.parking.jwt.model;

import java.io.Serializable;

public class JwtRequest implements Serializable {
    private String email;
    private String password;

    @SuppressWarnings("unused")
    public JwtRequest() {
    }

    @SuppressWarnings("unused")
    public JwtRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    @SuppressWarnings("unused")
    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    @SuppressWarnings("unused")
    public void setPassword(String password) {
        this.password = password;
    }
}
