package com.tap.serve.singapur.service;

import com.tap.serve.singapur.config.JwtTokenProvider;
import com.tap.serve.singapur.dto.LoginRequestDTO;
import com.tap.serve.singapur.dto.LoginResponseDTO;
import com.tap.serve.singapur.dto.SignupRequestDTO;
import com.tap.serve.singapur.dto.SignupResponseDTO;
import com.tap.serve.singapur.enums.RolEnum;
import com.tap.serve.singapur.model.PermissionModel;
import com.tap.serve.singapur.model.RolModel;
import com.tap.serve.singapur.model.UserModel;
import com.tap.serve.singapur.repository.PermissionRepository;
import com.tap.serve.singapur.repository.RolRepository;
import com.tap.serve.singapur.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RolRepository rolRepository;
    private final PermissionRepository permissionRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public LoginResponseDTO login(LoginRequestDTO loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.username(),
                        loginRequest.password()
                )
        );

        String jwt = tokenProvider.generateToken(authentication);

        return new LoginResponseDTO(
                jwt,
                "Bearer",
                loginRequest.username()
        );
    }

    @Transactional
    public SignupResponseDTO signup(SignupRequestDTO signupRequest) throws BadRequestException {
        if (userRepository.existsByUsername(signupRequest.username())) {
            throw new BadRequestException("El nombre de usuario ya está en uso");
        }

        // Crear o encontrar el rol
        RolModel rol = rolRepository.findByRol(signupRequest.rol())
                .orElseGet(() -> createRolWithPermissions(signupRequest.rol(), signupRequest.permissions()));

        // Crear el usuario
        UserModel user = new UserModel();
        user.setUsername(signupRequest.username());
        user.setPassword(passwordEncoder.encode(signupRequest.password()));
        user.setName(signupRequest.name());
        user.setLastname(signupRequest.lastname());
        user.setRol(rol);
        user.setEnabled(true);
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);

        userRepository.save(user);

        return new SignupResponseDTO("Usuario registrado exitosamente");
    }

    private RolModel createRolWithPermissions(RolEnum rolEnum, Set<PermissionModel> permissions) {
        RolModel rol = new RolModel();
        rol.setRol(rolEnum);

        // Validar que los permisos existen
        Set<PermissionModel> validPermissions = permissionRepository.findAllByIdIn(
                permissions.stream().map(PermissionModel::getId).toList()
        );

        rol.setPermissionsList(validPermissions);
        return rolRepository.save(rol);
    }
}
