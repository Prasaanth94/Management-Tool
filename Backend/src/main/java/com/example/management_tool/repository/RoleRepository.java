package com.example.management_tool.repository;

import com.example.management_tool.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByRoleType(String roleType);

    Optional<Role> findById(Role id);

}
