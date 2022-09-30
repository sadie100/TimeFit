package com.project.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.project.domain.Reservation;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Getter
@Setter
@Data
public class ReservationDetailResponse {

    private Long reservationId;
    private LocalDateTime start;
    private LocalDateTime end;

    public ReservationDetailResponse(Reservation reservation) {
        this.reservationId = reservation.getId();
        this.start = reservation.getStart();
        this.end = reservation.getEnd();
    }
}
