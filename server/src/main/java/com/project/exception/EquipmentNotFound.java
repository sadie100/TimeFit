package com.project.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EquipmentNotFound extends TimeFitException {

    private static final String MESSAGE = "존재하지 않는 기구 정보입니다.";

    public EquipmentNotFound() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 404;
    }
}