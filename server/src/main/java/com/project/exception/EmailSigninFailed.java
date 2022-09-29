package com.project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EmailSigninFailed extends TimeFitException {
    private static final String MESSAGE = "로그인 정보가 일치하지 않습니다.";

    public EmailSigninFailed() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 404;
    }
}