package com.project.response;

import com.project.domain.Reservation;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ReservationResponse {

    private LocalDateTime start;
    private LocalDateTime end;

    public ReservationResponse(Reservation reservation){
        this.start = reservation.getStart();
        this.end = reservation.getEnd();
    }
}
