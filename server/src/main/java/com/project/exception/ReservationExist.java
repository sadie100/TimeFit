package com.project.exception;

public class ReservationExist extends RuntimeException {

    private static final String MESSAGE = "예약 불가한 시간입니다.";

    public ReservationExist(){
        super(MESSAGE);
    }
}
