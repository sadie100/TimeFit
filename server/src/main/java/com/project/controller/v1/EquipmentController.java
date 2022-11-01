package com.project.controller.v1;

import com.project.domain.CenterEquipment;
import com.project.domain.Equipment;
import com.project.request.CenterEquipmentAdd;
import com.project.request.EquipmentCategory;
import com.project.response.EquipmentResponse;
import com.project.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class EquipmentController {
    private final EquipmentService equipmentService;

    @GetMapping("/equipment")
    public List<EquipmentResponse> getEquipments(){
        return equipmentService.getAllEquipment();
    }

    @PostMapping("/equipment/add")
    public Long addEquipmentCategory(@RequestBody EquipmentCategory request){
        System.out.println(request);
        return equipmentService.add(request);
    }

    @PostMapping("/equipment/add-center")
    public void addCenterEquipment(@RequestBody CenterEquipmentAdd request){
        System.out.println(request);
        equipmentService.addEquipment(request);
        return;
    }

    @GetMapping("/equipment/{centerId}")
    public List<CenterEquipment> getCenterEquipments(@PathVariable Long centerId){
        return equipmentService.getByCenter(centerId);
    }


}
