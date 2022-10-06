package com.project.response;

import com.project.domain.Center;
import lombok.Builder;
import lombok.Getter;

//응답 처리를 위한 클래스 생성
@Getter
public class EquipmentResponse {
    private Long id;

    private String name;
    private String img;

    @Builder
    public EquipmentResponse(long id, String name, String img) {
        this.id = id;
        this.name = name;
        this.img = img;
    }
}
