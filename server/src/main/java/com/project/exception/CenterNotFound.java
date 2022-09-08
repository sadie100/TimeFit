package com.project.exception;

public class CenterNotFound extends RuntimeException {

    private static final String MESSAGE = "존재하지 않는 글입니다.";

    public CenterNotFound() {
        super(MESSAGE);
    }
}
