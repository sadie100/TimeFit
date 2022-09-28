package com.project.controller.v1;

import com.project.domain.CenterEquipment;
import com.project.domain.Equipment;
import com.project.request.CenterEquipmentAdd;
import com.project.request.EquipmentCategory;
import com.project.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class EquipmentController {
    private final EquipmentService equipmentService;

    @GetMapping("/equipment")
    public List<Equipment> getEquipments(){
        return equipmentService.getAllEquipment();
    }

    @PostMapping("/equipment/add-category")
    public void addEquipmentCategory(@RequestBody EquipmentCategory request){
        System.out.println(request);
        equipmentService.add(request);
        return;
    }

    @PostMapping("/equipment/add")
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
