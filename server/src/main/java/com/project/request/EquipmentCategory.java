package com.project.request;

import com.project.domain.Center;
import com.project.domain.Equipment;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class EquipmentCategory {


    private String name;
    private String img;

    @Builder
    public EquipmentCategory(String name, String img) {
        this.name = name;
        this.img = img;
    }

}
