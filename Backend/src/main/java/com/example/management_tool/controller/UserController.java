package com.example.management_tool.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.management_tool.model.User;
import com.example.management_tool.repository.UserRepository;

import com.example.management_tool.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
            logger.info("Validationerror: {}", bindingResult.getAllErrors().get(0).getDefaultMessage());
            return new ResponseEntity<>("Validation error: " + bindingResult.getAllErrors().get(0).getDefaultMessage(),
                    HttpStatus.BAD_REQUEST);
        }

        userRepository.save(user);
        logger.info("User registered successfully!");
        return ResponseEntity.ok("User registered succesfully");
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndPoint() {
        return ResponseEntity.ok("Test endpoint is working!");
    }

}
