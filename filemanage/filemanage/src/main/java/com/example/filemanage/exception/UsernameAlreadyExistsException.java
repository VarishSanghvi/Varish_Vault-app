package com.example.filemanage.exception;

public class UsernameAlreadyExistsException extends RuntimeException {
    private static final long serialVersionUID = 1L; // You can use any unique long value

    public UsernameAlreadyExistsException(String message) {
        super(message);
    }
}
