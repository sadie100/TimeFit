package com.project.controller.v1;

import com.project.domain.CenterEquipment;
import com.project.domain.Equipment;
import com.project.request.CenterSearch;
import com.project.request.EquipmentAdd;
import com.project.request.EquipmentCategory;
import com.project.response.CenterResponse;
import com.project.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class EquipmentController {
    private  final EquipmentService equipmentService;

    @GetMapping("/equipment")
    public List<Equipment> getEquipments(){
        return equipmentService.getAllEquipment();
    }

    @PostMapping("/equipment/add")
    public void addEquipment(@RequestBody EquipmentCategory request){
        System.out.println(request);
        equipmentService.add(request);
        return;
    }

    @PostMapping("/equipment/add/{centerId}")
    public void addCenterEquipment(@RequestBody Long centerId, Long equipmentId, List<EquipmentAdd> request){
        equipmentService.addEquipment(centerId, equipmentId, request);
    }

    @GetMapping("/equipment/{centerId}")
    public List<CenterEquipment> getEquipments(@PathVariable Long centerId){
        return equipmentService.getByCenter(centerId);
    }


}
