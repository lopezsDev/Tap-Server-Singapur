package com.tap.serve.singapur.service;

import com.tap.serve.singapur.config.CustomUserDetails;
import com.tap.serve.singapur.model.UserModel;
import com.tap.serve.singapur.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserModel user = userRepository.findUserModelByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("El usuario " + username + " no existe"));

        return new CustomUserDetails(user);
    }
}
