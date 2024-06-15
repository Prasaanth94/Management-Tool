package com.example.management_tool.util;

import com.example.management_tool.config.JwtConfig;
import com.example.management_tool.config.JwtExpirationConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    private final JwtConfig jwtConfig;
    private final JwtExpirationConfig jwtExpirationConfig;

    public JwtUtil(JwtConfig jwtConfig, JwtExpirationConfig jwtExpirationConfig) {
        this.jwtConfig = jwtConfig;
        this.jwtExpirationConfig = jwtExpirationConfig;
    }

    public JwtConfig getJwtConfig() {
        return jwtConfig;
    }

    public JwtExpirationConfig getJwtExpirationConfig() {
        return jwtExpirationConfig;
    }

    public String generateAccessToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username, jwtConfig.getAccess(), jwtExpirationConfig.getAccess());
    }

    public String generateRefreshToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username, jwtConfig.getRefresh(), jwtExpirationConfig.getRefresh());
    }

    private String createToken(Map<String, Object> claims, String subject, String secret, int expiration) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public boolean validateToken(String token, String username, String secret) {
        final String extractedUsername = extractUsername(token, secret);
        return (extractedUsername.equals(username) && !isTokenExpired(token, secret));
    }

    public String extractUsername(String token, String secret) {
        return extractClaim(token, Claims::getSubject, secret);
    }

    public Date extractExpiration(String token, String secret) {
        return extractClaim(token, Claims::getExpiration, secret);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver, String secret) {
        final Claims claims = extractAllClaims(token, secret);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token, String secret) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    private boolean isTokenExpired(String token, String secret) {
        return extractExpiration(token, secret).before(new Date());
    }
}
