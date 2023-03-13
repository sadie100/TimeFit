package com.project.response;

import com.project.domain.Reservation;
import lombok.Getter;

import java.time.LocalDateTime;

// 나의 예약 정보를 넘겨주기 위한 클래스
@Getter
public class ReservationUserResponse {

    private final Long reservationId;
    private final Long centerEquipId;
    private final String equipName;
    private final LocalDateTime start;
    private final LocalDateTime end;

    public ReservationUserResponse(Reservation reservation) {
        this.reservationId = reservation.getId();
        this.centerEquipId = reservation.getCenterEquipment().getId();
        this.equipName = reservation.getCenterEquipment().getEquipment().getName();
        this.start = reservation.getStart();
        this.end = reservation.getEnd();
    }
}
