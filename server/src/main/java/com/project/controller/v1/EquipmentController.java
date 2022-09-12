package com.project.controller.v1;

import com.project.domain.CenterEquipment;
import com.project.request.CenterSearch;
import com.project.request.EquipmentAdd;
import com.project.response.CenterResponse;
import com.project.service.EquipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class EquipmentController {
    private  final EquipmentService equipmentService;

    @PostMapping("/equipment/add")
    public void addEquipment(@RequestBody Long centerId, Long equipmentId, List<EquipmentAdd> request){
        equipmentService.addEquipment(centerId, equipmentId, request);
    }

    @GetMapping("/equipment/{centerId}")
    public List<CenterEquipment> getEquipments(@PathVariable Long centerId){
        return equipmentService.getByCenter(centerId);
    }
}
