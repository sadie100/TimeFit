package com.project.response;

import com.project.domain.Center;
import com.project.domain.Trainer;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;


@Getter
public class CenterDetailResponse {

    private final Long id;
    private final String name;
    private final String phoneNumber;
    private final String address;

    private final List<String> trainers;
    private List<CenterImgResponse> images;
    private List<CenterEquipmentNumber> equipmentNumbers;



    public CenterDetailResponse(Center center, List<CenterEquipmentNumber> eq) {
        this.id = center.getId();
        this.name = center.getName();
        this.phoneNumber = center.getPhoneNumber();
        this.address = center.getAddress();
        this.trainers = center.getTrainers().stream()
                .map(o -> o.getName())
                .collect(Collectors.toList());
        this.equipmentNumbers = eq;
        this.images = center.getCenterImages().stream()
                .map(CenterImgResponse::new)
                .collect(Collectors.toList());
    }
}
