package com.tap.serve.singapur.controller;

import com.tap.serve.singapur.config.CustomUserDetails;
import com.tap.serve.singapur.config.JwtUtil;
import com.tap.serve.singapur.dto.SignupDTO;
import com.tap.serve.singapur.dto.LoginDTO;
import com.tap.serve.singapur.enums.RolEnum;
import com.tap.serve.singapur.model.RolModel;
import com.tap.serve.singapur.model.UserModel;
import com.tap.serve.singapur.repository.RolRepository;
import com.tap.serve.singapur.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RolRepository rolRepository;

    public AuthController(AuthenticationManager authenticationManager,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil, RolRepository rolRepository) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.rolRepository = rolRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody SignupDTO dto){
        UserModel user = new UserModel();
        user.setUsername(dto.username());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setEnabled(true);
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);

        RolModel rolPorDefecto = rolRepository.findByRol(RolEnum.USER)
                        .orElseThrow(()-> new RuntimeException("Rol por defecto no encontrado"));

        user.setRoles(Set.of(rolPorDefecto));
        userRepository.save(user);

        return ResponseEntity.ok("Usuario registrado");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                dto.username(),
                dto.password()));

        final UserDetails userDetails = userRepository.findUserModelByUsername(dto.username())
                .map(CustomUserDetails::new)
                .orElseThrow();
        final String jwt = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(Map.of("token", jwt));
    }
}
