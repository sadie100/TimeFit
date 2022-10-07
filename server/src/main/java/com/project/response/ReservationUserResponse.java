package com.project.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.project.domain.Reservation;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Getter
@Setter
@Data
public class ReservationUserResponse {

    private Long reservationId;
    private Long centerEquipId;
    private String equipName;
    private LocalDateTime start;
    private LocalDateTime end;

    public ReservationUserResponse(Reservation reservation) {
        this.reservationId = reservation.getId();
        this.centerEquipId = reservation.getCenterEquipment().getId();
        this.equipName = reservation.getCenterEquipment().getEquipment().getName();
        this.start = reservation.getStart();
        this.end = reservation.getEnd();
    }
}
