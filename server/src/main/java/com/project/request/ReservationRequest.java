package com.project.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
public class ReservationRequest {

    private final Long equipmentId;
    private final List<Long> equipments;
    private final LocalDateTime start;
    private final LocalDateTime end;
//    private final Long reservationId;


}
