package edu.fra.uas.parking.entity;

public class ChangePassword {

    private String token;
    private String password;
    private String confirmPassword;

    public String getToken() {
        return token;
    }

    public String getPassword() {
        return password;
    }

    public String getConfirmPassword() {
            return confirmPassword;
    }
}
