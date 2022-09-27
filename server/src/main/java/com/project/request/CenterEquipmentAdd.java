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
public class CenterEquipmentAdd {

    private Long center;
    private Long equipment;
    private Long xLoc;
    private Long yLoc;

    @Builder
    public CenterEquipmentAdd(Long center, Long equipment, Long xLoc, Long yLoc) {
        this.center = center;
        this.equipment = equipment;
        this.xLoc = xLoc;
        this.yLoc = yLoc;
    }

}
