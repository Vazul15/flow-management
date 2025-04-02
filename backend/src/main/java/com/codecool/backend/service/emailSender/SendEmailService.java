package com.codecool.backend.service.emailSender;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SendEmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmailId;

    @Autowired
    public SendEmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public String sendEmail(String recipient, String subject, String body) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();

            message.setFrom(fromEmailId);
            message.setTo(recipient);
            message.setSubject(subject);
            message.setText(body);

            mailSender.send(message);
            return "success";
        } catch(Exception e) {
            return "Error sending email: " + e.getMessage();
        }
    }
}
