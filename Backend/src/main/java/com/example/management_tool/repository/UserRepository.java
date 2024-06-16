package com.example.management_tool.repository;

import com.example.management_tool.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByUsername(String username);

    @Query("SELECT r.roleType FROM User u JOIN u.role r WHERE u.username = :username")
    Optional<String> findRoleByUsername(@Param("username") String username);

}