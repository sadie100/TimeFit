package com.project.response;

import lombok.Getter;

import java.util.List;

// 헬스장 기구 별로 예약 정보의 리스트를 넘겨주기 위한 클래스
@Getter
public class ReservationResponse {

    private final Long id;
    private final List<ReservationDetailResponse> times;

    public ReservationResponse(Long equipID, List<ReservationDetailResponse> reserves){
        this.id = equipID;
        this.times = reserves;
    }
}
