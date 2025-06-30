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
import com.tap.serve.singapur.utils.exception.PermissionNotFoundException;
import com.tap.serve.singapur.utils.exception.UsernameAlreadyExistsException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Set;
import java.util.stream.Collectors;

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
    public SignupResponseDTO signup(SignupRequestDTO signupRequest) {
        if (userRepository.existsByUsername(signupRequest.username())) {
            throw new UsernameAlreadyExistsException("El nombre de usuario ya está en uso");
        }

        // Obtener o crear el rol con los permisos especificados
        RolModel rol = getOrCreateRolWithPermissions(signupRequest.rol(), signupRequest.permissions());

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

    private RolModel getOrCreateRolWithPermissions(RolEnum rolEnum, Set<Long> permissionIds) {
        // Buscar si ya existe un rol con este enum
        return rolRepository.findByRol(rolEnum)
                .map(existingRol -> updateRolPermissions(existingRol, permissionIds))
                .orElseGet(() -> createNewRolWithPermissions(rolEnum, permissionIds));
    }

    private RolModel updateRolPermissions(RolModel existingRol, Set<Long> permissionIds) {
        if (permissionIds != null && !permissionIds.isEmpty()) {
            // Obtener los permisos de la base de datos (entidades gestionadas)
            Set<PermissionModel> permissions = permissionRepository.findAllById(permissionIds)
                    .stream()
                    .collect(Collectors.toSet());

            if (permissions.size() != permissionIds.size()) {
                throw new PermissionNotFoundException("Uno o más permisos no existen");
            }

            // Actualizar los permisos del rol existente
            existingRol.getPermissionsList().clear();
            existingRol.getPermissionsList().addAll(permissions);
            return rolRepository.save(existingRol);
        }
        return existingRol;
    }

    private RolModel createNewRolWithPermissions(RolEnum rolEnum, Set<Long> permissionIds) {
        RolModel newRol = new RolModel();
        newRol.setRol(rolEnum);

        if (permissionIds != null && !permissionIds.isEmpty()) {
            // Obtener los permisos de la base de datos (entidades gestionadas)
            Set<PermissionModel> permissions = permissionRepository.findAllById(permissionIds)
                    .stream()
                    .collect(Collectors.toSet());

            if (permissions.size() != permissionIds.size()) {
                throw new PermissionNotFoundException("Uno o más permisos no existen");
            }

            newRol.setPermissionsList(permissions);
        }
        return rolRepository.save(newRol);
    }
}
