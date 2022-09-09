package com.project.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class ReservationRequest {

    private final Long centerId;
    private final Long equipmentId;
    private final LocalDateTime start;
    private final LocalDateTime end;


}
