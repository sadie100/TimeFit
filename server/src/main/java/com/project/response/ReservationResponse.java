package com.project.response;

import com.project.domain.Reservation;
import lombok.Getter;

import java.util.List;

@Getter
public class ReservationResponse {

    private Long equipmentId;
    private Long name;
    private List<ReservationTime> reservationTime;

    public ReservationResponse(Reservation reservation){
        this.equipmentId = reservation.getId();
    }
}
