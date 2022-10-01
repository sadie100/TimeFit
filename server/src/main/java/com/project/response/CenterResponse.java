package com.project.response;

import com.project.domain.Center;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

//응답 처리를 위한 클래스 생성
@Getter
public class CenterResponse {
    private final Long id;
    private final String name;
    private final String address;
    private final List<CenterImgResponse> images;

//    @Builder //빌더 패턴 새용
//    public ItemResponse(Long id, String name, String topNotes, String brand, String season) {
//        this.id = id;
//        this.name = name;
//        this.topNotes = topNotes;
////        this.brand = brand;
////        this.season = season;
//        this.mainImg = path+name+"main.jpg";
//    }

    public CenterResponse(Center center) {
        this.id = center.getId();
        this.name = center.getName();
        this.address = center.getAddress();
        this.images = center.getCenterImages().stream()
                .map(CenterImgResponse::new)
                .collect(Collectors.toList());
    }
}
