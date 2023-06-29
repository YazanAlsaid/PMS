package edu.fra.uas.parking.jwt.controller;

// Java Spring Boot Controller (ResetPasswordController)

import edu.fra.uas.parking.entity.ResetToken;
import edu.fra.uas.parking.entity.User;
import edu.fra.uas.parking.repository.ResetTokenRepository;
import edu.fra.uas.parking.repository.UserRepository;
import edu.fra.uas.parking.service.EmailService;
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
    public ResponseEntity<String> resetPassword(@RequestBody String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User with the provided email does not exist");
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
        return ResponseEntity.ok("Password reset request submitted successfully");
    }

    private void sendResetTokenViaEmail(String email, String resetToken) {
        String host;
        try {
            URI uri = new URI(request.getRequestURL().toString());
            host = uri.getScheme() + "://" + uri.getAuthority();
        } catch (URISyntaxException e) {
            host = "http://localhost:8080"; // Fallback if URI syntax is invalid
        }

        String resetUrl = host + "/auth/reset-password?token=" + resetToken;

        String subject = "Password Reset";
        String text = "To reset your password, click on the following link: " + resetUrl;

        emailService.sendEmail(email, subject, text);
    }

    @GetMapping("/check-email-exists")
    public ResponseEntity<EmailExistsResponse> checkEmailExists(@RequestParam String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if (user.isPresent()) {
            return ResponseEntity.ok(new EmailExistsResponse(true));
        } else {
            return ResponseEntity.ok(new EmailExistsResponse(false));
        }
    }

    private static class EmailExistsResponse {
        private final boolean exists;

        public EmailExistsResponse(boolean exists) {
            this.exists = exists;
        }

        public boolean isExists() {
            return exists;
        }
    }
}
