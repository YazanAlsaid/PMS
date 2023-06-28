package edu.fra.uas.parking.jwt.model;

import edu.fra.uas.parking.entity.DTOUser;

import java.io.Serializable;

public record JwtResponse(String token, DTOUser user) implements Serializable {
    @Override
    public DTOUser user() {
        return user;
    }

    @Override
    @SuppressWarnings("unused")
    public String token() {
        return token;
    }
}
