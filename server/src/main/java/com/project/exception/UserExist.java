package com.project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class UserExist extends TimeFitException {

    private static final String MESSAGE = "중복된 이메일입니다.";

    public UserExist() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 409;
    }
}