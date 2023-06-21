package edu.fra.uas.parking.jwt.model;

import java.io.Serializable;

public record JwtResponse(String token) implements Serializable {

    @Override
    @SuppressWarnings("unused")
    public String token() {
        return token;
    }
}
