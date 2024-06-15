package com.example.management_tool.service;

import com.example.management_tool.config.JwtConfig;
import com.example.management_tool.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    private final JwtUtil jwtUtil;
    private final JwtConfig jwtConfig;

    @Autowired
    public JwtService(JwtUtil jwtUtil, JwtConfig jwtConfig) {
        this.jwtUtil = jwtUtil;
        this.jwtConfig = jwtConfig;
    }

    public String createAccessToken(String username) {
        return jwtUtil.generateAccessToken(username);
    }

    public String createRefreshToken(String username) {
        return jwtUtil.generateRefreshToken(username);
    }

    public boolean validateAccessToken(String token, String username) {
        return jwtUtil.validateToken(token, username, jwtConfig.getAccess());
    }

    public boolean validateRefreshToken(String token, String username) {
        return jwtUtil.validateToken(token, username, jwtConfig.getRefresh());
    }

    public String extractUsernameFromAccessToken(String token) {
        return jwtUtil.extractUsername(token, jwtConfig.getAccess());
    }

    public String extractUsernameFromRefreshToken(String token) {
        return jwtUtil.extractUsername(token, jwtConfig.getRefresh());
    }
}
