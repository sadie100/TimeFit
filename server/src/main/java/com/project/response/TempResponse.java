package com.project.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Getter
@Setter
@Data
public class TempResponse {

    private Long id;
    private List<ReservationDetailResponse> times;

    public TempResponse(Long equipID, List<ReservationDetailResponse> reserves){
        this.id = equipID;
        this.times = reserves;
    }
}
