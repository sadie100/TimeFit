package com.project.response;

import lombok.Getter;

// 헬스장의 기구와 기구 개수를 넘겨주기 위한 클래스
@Getter
public class CenterEquipmentNumber {
    private final String equipment;
    private final Long number;

    public CenterEquipmentNumber(String name, Long number){
        this.equipment = name;
        this.number = number;
    }
}
