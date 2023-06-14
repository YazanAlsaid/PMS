package edu.fra.uas.parking.common;

public record ResponseMessage(String message, Object data) {

    @Override
    @SuppressWarnings("unused")
    public String message() {
        return message;
    }

    @Override
    @SuppressWarnings("unused")
    public Object data() {
        return data;
    }
}
