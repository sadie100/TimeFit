package com.project.exception;

public class CenterNotFound extends TimeFitException {

    private static final String MESSAGE = "헬스장이 존재하지 않습니다.";

    public CenterNotFound() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 404;
    }
}
