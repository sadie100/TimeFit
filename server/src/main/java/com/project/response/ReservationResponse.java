package com.project.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.project.domain.Reservation;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Getter
@Setter
@Data
public class ReservationResponse {

    private Long id;
    private List<ReservationDetailResponse> times;

    public ReservationResponse(Long equipID, List<ReservationDetailResponse> reserves){
        this.id = equipID;
        this.times = reserves;
    }
}
