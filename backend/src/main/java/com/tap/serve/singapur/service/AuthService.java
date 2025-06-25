package com.tap.serve.singapur.service;

import com.tap.serve.singapur.config.JwtUtil;
import com.tap.serve.singapur.dto.LoginDTO;
import com.tap.serve.singapur.dto.SignupRequestDTO;
import com.tap.serve.singapur.model.PermissionModel;
import com.tap.serve.singapur.model.RolModel;
import com.tap.serve.singapur.model.UserModel;
import com.tap.serve.singapur.repository.PermissionRepository;
import com.tap.serve.singapur.repository.RolRepository;
import com.tap.serve.singapur.repository.UserRepository;
import com.tap.serve.singapur.security.CustomUserDetails;
import com.tap.serve.singapur.utils.error.UsuarioYaExisteException;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RolRepository rolRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final PermissionRepository permissionRepository;

    public String login(LoginDTO dto) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                dto.username(), dto.password()));

        var userDetails = userRepository.findUserModelByUsername(dto.username())
                .map(CustomUserDetails::new)
                .orElseThrow();

        return jwtUtil.generateToken(userDetails);
    }

    public UserModel signup(SignupRequestDTO dto) {
        // Verificar que no exista el username
        if (userRepository.findUserModelByUsername(dto.username()).isPresent()) {
            throw new UsuarioYaExisteException("Username already exists");
        }

        // Buscar el rol
        RolModel rol = rolRepository.findByRol(dto.rol())
                .orElseThrow(() -> new IllegalArgumentException("Rol " + dto.rol() + " not found"));

        Set<PermissionModel> permisos = dto.permissions().stream()
                .map(perm -> permissionRepository.findByPermissionName(perm.getPermissionName())
                        .orElseThrow(() -> new IllegalArgumentException("Permiso " + perm + " no encontrado")))
                .collect(Collectors.toSet());

        rol.setPermissionsList(permisos);
        rolRepository.save(rol);

        // Crear usuario
        UserModel user = new UserModel();
        user.setUsername(dto.username());
        user.setPassword(passwordEncoder.encode(dto.password()));
        user.setName(dto.name());
        user.setLastname(dto.lastname());
        user.setRol(rol);
        user.setEnabled(true);
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);

        return userRepository.save(user);
    }
}
