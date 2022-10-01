package com.project.response;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Getter
@Setter
@Data
public class CenterEquipmentNumber {
    private String equipment;
    private Long number;

    public CenterEquipmentNumber(String name, Long number){
        this.equipment = name;
        this.number = number;
    }
}
