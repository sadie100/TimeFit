package com.project.service;


import com.project.domain.Center;
import com.project.domain.CenterEquipment;
import com.project.domain.Equipment;
import com.project.domain.User;
import com.project.exception.CenterNotFound;
import com.project.exception.UserNotFoundException;
import com.project.repository.CenterEquipmentRepository;
import com.project.repository.CenterRepository;
import com.project.repository.EquipmentRepository;
import com.project.request.EquipmentAdd;
import com.project.request.UserSignUp;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.management.openmbean.ArrayType;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class EquipmentService {

    private final CenterEquipmentRepository centerEquipmentRepository;

    private final CenterRepository centerRepository;
    private final EquipmentRepository equipmentRepository;


    public void addEquipment(Long centerId, Long equipmentId, List<EquipmentAdd> request){
        for (EquipmentAdd r: request
             ) {
            Center center = centerRepository.findById(centerId).orElseThrow(CenterNotFound::new);
            Equipment equipment = equipmentRepository.findById(centerId).orElseThrow(CenterNotFound::new);
            centerEquipmentRepository.save(
                    CenterEquipment.builder()
                            .center(center)
                            .equipment(equipment)
                            .xLoc(r.getXLoc())
                            .yLoc(r.getYLoc())
                            .build());
        }
    }

    public List<CenterEquipment> getByCenter(Long centerId) {
        Center center = centerRepository.findById(centerId).orElseThrow(CenterNotFound::new);
        return centerEquipmentRepository.findByCenter(center);
    }
}
