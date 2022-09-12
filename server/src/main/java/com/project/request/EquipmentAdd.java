package com.project.request;

import com.project.domain.Center;
import com.project.domain.Equipment;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Setter
@Getter
@ToString
public class EquipmentAdd {


    private Center center;

    private Equipment equipment;

    private Long xLoc;
    private Long yLoc;

    @Builder
    public EquipmentAdd(Center center, Equipment equipment, Long xLoc, Long yLoc) {
        this.center = center;
        this.equipment = equipment;
        this.xLoc = xLoc;
        this.yLoc = yLoc;
    }

}
