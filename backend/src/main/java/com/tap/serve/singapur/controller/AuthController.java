package com.tap.serve.singapur.controller;

import com.tap.serve.singapur.dto.ApiResp;
import com.tap.serve.singapur.dto.SignupRequestDTO;
import com.tap.serve.singapur.dto.LoginDTO;
import com.tap.serve.singapur.model.UserModel;
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

    @PostMapping("/login")
    public ResponseEntity<ApiResp<Map<String, String>>> login(@RequestBody LoginDTO dto){
        String data = authService.login(dto);
        return ResponseEntity.ok(ApiResp.success("Login successful", Map.of("token", data)));
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResp<UserModel>> signup(@RequestBody SignupRequestDTO dto){
        UserModel user = authService.signup(dto);
        return ResponseEntity.ok(ApiResp.success("Signup successful", user));
    }
}
