package com.tap.serve.singapur.controller;

import com.tap.serve.singapur.dto.ApiResp;
import com.tap.serve.singapur.dto.SignupRequestDTO;
import com.tap.serve.singapur.dto.LoginDTO;
import com.tap.serve.singapur.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;


@RestController
@RequestMapping("/api/auth")
public class AuthController{

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody SignupRequestDTO dto){
        try {
            authService.signup(dto);
            return ResponseEntity.ok("Usuario registrado");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().body("Error interno: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResp<Map<String, String>>> login(@RequestBody LoginDTO dto){
        ApiResp<Map<String, String>> response = authService.login(dto);
        return ResponseEntity.ok(response);
    }
}
