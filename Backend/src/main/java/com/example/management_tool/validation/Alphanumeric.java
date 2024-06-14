package com.example.management_tool.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.ReportAsSingleViolation;
import javax.validation.constraints.Pattern;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = {})
@Pattern(regexp = "^[a-zA-Z0-9]*$", message = "Username must be alphanumeric")
@ReportAsSingleViolation
@Target({ ElementType.METHOD, ElementType.FIELD, ElementType.PARAMETER })
@Retention(RetentionPolicy.RUNTIME)
public @interface Alphanumeric {
    String message() default "Username must be alphanumeric";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
