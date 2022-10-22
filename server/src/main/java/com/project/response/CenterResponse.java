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

    public CenterResponse(Center center) {
        this.id = center.getId();
        this.name = center.getName();
        this.address = center.getAddress();
        this.images = center.getCenterImages().stream()
                .map(CenterImgResponse::new)
                .collect(Collectors.toList());
    }
}
