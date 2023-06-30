package edu.fra.uas.parking.jwt.controller;

// Java Spring Boot Controller (ResetPasswordController)

import edu.fra.uas.parking.common.ResponseMessage;
import edu.fra.uas.parking.entity.ChangePassword;
import edu.fra.uas.parking.entity.ResetToken;
import edu.fra.uas.parking.entity.User;
import edu.fra.uas.parking.repository.ResetTokenRepository;
import edu.fra.uas.parking.repository.UserRepository;
import edu.fra.uas.parking.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/reset")
public class ResetPasswordController {

    private final Logger logger = LoggerFactory.getLogger(ResetPasswordController.class);
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final ResetTokenRepository resetTokenRepository;
    private final HttpServletRequest request;

    @Autowired
    public ResetPasswordController(UserRepository userRepository, EmailService emailService,
                                   ResetTokenRepository resetTokenRepository, HttpServletRequest request) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.resetTokenRepository = resetTokenRepository;
        this.request = request;
    }


    @PostMapping("/reset-password")
    public ResponseEntity<ResponseMessage> resetPassword(@RequestBody String email) {
        logger.debug("POST /reset/reset-password");
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isEmpty()) {
            return new ResponseEntity<>(new ResponseMessage("User with the provided email does not exist", null), HttpStatus.NOT_FOUND);
        }


        ResetToken existingToken = resetTokenRepository.findByUser(user.get());
        if (existingToken != null) {
            resetTokenRepository.delete(existingToken);
        }

        String resetToken = UUID.randomUUID().toString();
        ResetToken resetTokenObj = new ResetToken();
        resetTokenObj.setToken(resetToken);
        resetTokenObj.setUser(user.get());
        resetTokenObj.setExpirationDateTime(LocalDateTime.now().plusMinutes(60));
        resetTokenRepository.save(resetTokenObj);

        sendResetTokenViaEmail(user.get().getEmail(), resetToken);
        return new ResponseEntity<>(new ResponseMessage("Password reset request submitted successfully", null), HttpStatus.OK);
    }

    @PostMapping("/change-password")
    public ResponseEntity<ResponseMessage> changePasswordPerToken(@RequestBody ChangePassword changePassword) {
        String token = changePassword.getToken();
        String newPassword = changePassword.getPassword();
        String confirmPassword = changePassword.getConfirmPassword();

        if (token == null || token.isEmpty()) {
            return new ResponseEntity<>(new ResponseMessage("Token cannot be empty", null), HttpStatus.BAD_REQUEST);
        }

        if (newPassword == null || newPassword.isEmpty()) {
            return new ResponseEntity<>(new ResponseMessage("New password cannot be empty", null), HttpStatus.BAD_REQUEST);
        }

        if (confirmPassword == null || confirmPassword.isEmpty()) {
            return new ResponseEntity<>(new ResponseMessage("Confirm password cannot be empty", null), HttpStatus.BAD_REQUEST);
        }

        if (!newPassword.equals(confirmPassword)) {
            return new ResponseEntity<>(new ResponseMessage("New password and confirm password do not match", null), HttpStatus.BAD_REQUEST);
        }

        ResetToken resetToken = resetTokenRepository.findByToken(token);
        if (resetToken == null) {
            return new ResponseEntity<>(new ResponseMessage("Invalid token", null), HttpStatus.BAD_REQUEST);
        }

        if (resetToken.getExpirationDateTime().isBefore(LocalDateTime.now())) {
            return new ResponseEntity<>(new ResponseMessage("Token has expired", null), HttpStatus.BAD_REQUEST);
        }

        User user = resetToken.getUser();
        user.setHashedPassword(newPassword);
        this.userRepository.save(user);
        this.resetTokenRepository.delete(resetToken);

        // Invalidate the token by updating its status
        this.resetTokenRepository.delete(resetToken);

        return new ResponseEntity<>(new ResponseMessage("Password changed successfully", null), HttpStatus.ACCEPTED);
    }
    private void sendResetTokenViaEmail(String email, String resetToken) {
        String host;
        if (request.getRequestURL().toString().contains("localhost")) {
            host = "http://localhost:4200"; // Application running locally
        } else {
            try {
                URI uri = new URI(request.getRequestURL().toString());
                host = uri.getScheme() + "://" + uri.getAuthority(); // Domain in production
            } catch (URISyntaxException e) {
                host = "http://localhost:4200"; // Fallback to localhost if URI syntax is invalid
            }
        }

        String resetUrl = host + "/auth/change-password?token=" + resetToken;

        String subject = "Password Reset";
        String text = "To reset your password, click on the following link: " + resetUrl;

        emailService.sendEmail(email, subject, text);
    }


}
