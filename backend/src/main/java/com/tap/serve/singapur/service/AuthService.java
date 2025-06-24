package com.tap.serve.singapur.service;

import com.tap.serve.singapur.config.JwtUtil;
import com.tap.serve.singapur.dto.ApiResp;
import com.tap.serve.singapur.dto.LoginDTO;
import com.tap.serve.singapur.dto.SignupRequestDTO;
import com.tap.serve.singapur.model.RolModel;
import com.tap.serve.singapur.model.UserModel;
import com.tap.serve.singapur.repository.RolRepository;
import com.tap.serve.singapur.repository.UserRepository;
import com.tap.serve.singapur.security.CustomUserDetails;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RolRepository rolRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, RolRepository rolRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.rolRepository = rolRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    public ApiResp<Map<String, String>> login(LoginDTO dto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                dto.username(), dto.password()));

        var userDetails = userRepository.findUserModelByUsername(dto.username())
                .map(CustomUserDetails::new)
                .orElseThrow();

        var jwt = jwtUtil.generateToken(userDetails);
        return ApiResp.success("Login successful", Map.of("token", jwt));
    }

    public ApiResp<UserModel> signup(SignupRequestDTO dto) {
        // Verificar que no exista el username
        if (userRepository.findUserModelByUsername(dto.username()).isPresent()) {
            return ApiResp.error("Username already exists");
        }

        // Buscar el rol
        RolModel rol = rolRepository.findByRol(dto.rol())
                .orElseThrow(() -> new RuntimeException("Rol " + dto.rol() + " not found"));

        // Crear usuario
        UserModel user = new UserModel();
        user.setUsername(dto.username());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setName(dto.name());
        user.setLastname(dto.lastname());
        user.setRoles(Set.of(rol));

        var savedUser = userRepository.save(user);
        return ApiResp.success("User registered successfully", savedUser);
    }
}
