package com.example.management_tool.model;

import java.util.UUID;

import jakarta.persistence.*;
import javax.validation.constraints.*;

import com.example.management_tool.validation.Alphanumeric;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.mindrot.jbcrypt.BCrypt;

import java.util.logging.Logger;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private UUID userId;

    @Column(nullable = false)
    @NotBlank(message = "Name is Required")
    private String name;

    @Column(nullable = false)
    @NotBlank(message = "Password hash is required")
    @Size(min = 8, message = " Pasword must be more than 8 characters and alphanumeric ")
    @Alphanumeric(message = "password must be alpahanumeric")

    private String hash;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Username is required")
    @Size(min = 5, max = 20, message = "Username must be between 5 and 20 characters")
    private String username;

    // a temporary variable to use in controller to check if roleId is valid in the
    // Role entity
    @Column(name = "user_role", insertable = false, updatable = false)
    private Integer roleId;

    @ManyToOne
    @JoinColumn(name = "user_role", nullable = false, referencedColumnName = "id")
    private Role role;

    public User() {

    }

    public User(String name, String hash, String username, Integer roleId) {
        this.name = name;
        this.hash = hash;
        this.username = username;
        this.roleId = roleId;
    }

    private static final Logger LOGGER = Logger.getLogger(User.class.getName());

    // getters and setters

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        LOGGER.info("Setting hash for user: " + this.username);
        this.hash = BCrypt.hashpw(hash, BCrypt.gensalt());
        LOGGER.info("Hash set successfully.");
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Role getUserRole() {
        return role;
    }

    public void setUserRole(Role role) {
        this.role = role;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    /**
     * Returns a string representation of the User object.
     * Format: "User{userId=<userId>, name='<name>', hash='<hash>',
     * username='<username>', useRole=<userRole>}"
     * Useful for debugging and logging purposes.
     */

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", name='" + name + '\'' +
                ", hash='" + hash + '\'' +
                ", username='" + username + '\'' +
                ", userRole=" + role +
                '}';
    }

}
