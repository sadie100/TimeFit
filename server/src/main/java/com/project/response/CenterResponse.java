package com.project.response;

import com.project.domain.Center;
import lombok.Getter;

//응답 처리를 위한 클래스 생성
@Getter
public class CenterResponse {
    private final String path = "/resources/static/img/";
    private final Long id;
    private final String name;

    private final String mainImg;


//    @Builder //빌더 패턴 새용
//    public ItemResponse(Long id, String name, String topNotes, String brand, String season) {
//        this.id = id;
//        this.name = name;
//        this.topNotes = topNotes;
////        this.brand = brand;
////        this.season = season;
//        this.mainImg = path+name+"main.jpg";
//    }

    public CenterResponse(Center item) {
        this.id = item.getId();
        this.name = item.getName();
        this.mainImg = path+item.getName()+"/main.jpg";
    }
}
