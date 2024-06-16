package com.example.management_tool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import com.example.management_tool.model.User;
import com.example.management_tool.model.Role;
import com.example.management_tool.repository.UserRepository;

import com.example.management_tool.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    @Autowired
    public UserController(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody User user, BindingResult bindingResult) {
        logger.info("Attempting to register user: {}", user);

        if (bindingResult.hasErrors()) {
            logger.info("Validation error: {}", bindingResult.getAllErrors().get(0).getDefaultMessage());
            return new ResponseEntity<>("Validation error: " + bindingResult.getAllErrors().get(0).getDefaultMessage(),
                    HttpStatus.BAD_REQUEST);
        }

        // Fetch the Role from repository based on some identifier (e.g., roleType)
        Optional<Role> optionalRole = roleRepository.findByRoleType("admin"); // Example: Fetching role by roleType
                                                                              // "admin"
        Role role = optionalRole.orElseThrow(() -> new IllegalArgumentException("Role not found"));

        // Set the fetched Role to the User object
        user.setUserRole(role);

        // Save the user to the database
        userRepository.save(user);

        logger.info("User registered successfully!");
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndPoint() {
        return ResponseEntity.ok("Test endpoint is working!");
    }

}
