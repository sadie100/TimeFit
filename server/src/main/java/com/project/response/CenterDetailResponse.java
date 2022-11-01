package com.project.response;

import com.project.domain.Center;
import com.project.domain.Trainer;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

// 헬스장 상세정보를 넘겨주기 위한 클래스
@Getter
public class CenterDetailResponse {

    private final Long id;
    private final String name;
    private final String phoneNumber;
    private final String address;
    private final Integer price;

    private final List<String> trainers;
    private final List<CenterImgResponse> images;
    private final List<CenterEquipmentNumber> equipmentNumbers;



    public CenterDetailResponse(Center center, List<CenterEquipmentNumber> eq) {
        this.id = center.getId();
        this.name = center.getName();
        this.phoneNumber = center.getPhoneNumber();
        this.address = center.getAddress();
        this.price = center.getPrice();
        this.trainers = center.getTrainers().stream()
                .map(Trainer::getName)
                .collect(Collectors.toList());
        this.equipmentNumbers = eq;
        this.images = center.getCenterImages().stream()
                .map(CenterImgResponse::new)
                .collect(Collectors.toList());
    }
}
