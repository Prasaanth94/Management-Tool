package com.example.management_tool.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

@Value("${jwt.secret.access}")
private String jwtSecretAccess;

@Value("${jwt.secret.refresh}")
private String jwtSecretRefresh;

@Value("${jwt.expiration.access}")
private int jwtExpirationAccess;

@Value("${jwt.expiration.refresh}")
private int jwtExpirationRefresh;

public String getJwtSecretAccess() {
return jwtSecretAccess;
}

public String getJwtSecretRefresh() {
return jwtSecretRefresh;
}

public int getJwtExpirationAccess() {
return jwtExpirationAccess;
}

public int getJwtExpirationRefresh() {
return jwtExpirationRefresh;
}

}
