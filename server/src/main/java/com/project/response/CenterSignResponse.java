package com.project.response;

import com.project.domain.Center;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

//응답 처리를 위한 클래스 생성
@Setter
@Getter
@ToString
public class CenterSignResponse {
    private final Long centerId;
    private final Long userId;

    @Builder
    public CenterSignResponse(Long centerId, Long userId) {
        this.centerId = centerId;
        this.userId = userId;
    }
}
