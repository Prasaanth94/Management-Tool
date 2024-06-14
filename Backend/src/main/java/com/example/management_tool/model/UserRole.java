package com.example.management_tool.model;

public enum UserRole {
    ADMIN(1),
    MANAGER(2),
    FT_STAFF(3),
    PT_STAFF(4);

    private final int value;

    UserRole(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static UserRole fromValue(int value) {
        for (UserRole role : UserRole.values()) {
            if (role.value == value) {
                return role;
            }
        }
        throw new IllegalArgumentException("Invalid UserRole value: " + value);
    }
}
