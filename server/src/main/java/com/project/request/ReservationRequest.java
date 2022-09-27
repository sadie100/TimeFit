package com.project.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Builder
@Getter
@Setter
public class ReservationRequest {

    private final Long centerEquipmentId;
    private final LocalDateTime start;
    private final LocalDateTime end;
//    private final Long reservationId;


}
