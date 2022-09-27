package com.project.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ReservationExist extends TimeFitException {

    private static final String MESSAGE = "예약 불가한 시간입니다.";

    public ReservationExist(){
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 405;
    }
}
