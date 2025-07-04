package com.tap.serve.singapur.controller;

import com.tap.serve.singapur.dto.LoginResponseDTO;
import com.tap.serve.singapur.dto.SignupRequestDTO;
import com.tap.serve.singapur.dto.LoginRequestDTO;
import com.tap.serve.singapur.dto.SignupResponseDTO;
import com.tap.serve.singapur.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        LoginResponseDTO response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDTO> signup(@Valid @RequestBody SignupRequestDTO signupRequest) throws BadRequestException {
        SignupResponseDTO response = authService.signup(signupRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/check")
    public ResponseEntity<?> check(@RequestParam String token) {
        return ResponseEntity.ok().build();
    }


}
