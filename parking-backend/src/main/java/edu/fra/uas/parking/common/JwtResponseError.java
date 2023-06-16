package edu.fra.uas.parking.common;

import java.time.LocalDateTime;

public record JwtResponseError(LocalDateTime timestamp, Integer status, String error, String message, String path) {

    @Override
    @SuppressWarnings("unused")
    public LocalDateTime timestamp() {
        return timestamp;
    }

    @Override
    @SuppressWarnings("unused")
    public Integer status() {
        return status;
    }

    @Override
    @SuppressWarnings("unused")
    public String error() {
        return error;
    }

    @Override
    @SuppressWarnings("unused")
    public String message() {
        return message;
    }

    @Override
    @SuppressWarnings("unused")
    public String path() {
        return path;
    }

    @Override
    public String toString() {
        return "{" +
                "\"timestamp\": " + timestamp +
                ", \"status\": " + status +
                ", \"error\": \"" + error + "\"" +
                ", \"message\": \"" + message + "\"" +
                ", \"path\": \"" + path + "\"" +
                '}';
    }
}
