package com.project.response;

import com.project.domain.Reservation;
import lombok.Getter;

import java.time.LocalDateTime;

// 예약 정보를 넘겨주기 위한 클래스
@Getter
public class ReservationDetailResponse {

    private final Long reservationId;
    private final String userName;
    private final LocalDateTime start;
    private final LocalDateTime end;

    public ReservationDetailResponse(Reservation reservation) {
        this.reservationId = reservation.getId();
        this.userName = reservation.getUser().getName();
        this.start = reservation.getStart();
        this.end = reservation.getEnd();
    }
}
