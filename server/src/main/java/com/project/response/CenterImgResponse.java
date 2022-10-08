package com.project.response;

import com.project.domain.CenterImages;
import lombok.Getter;

@Getter
public class CenterImgResponse {

//    private String newFileName;
    private final String path;

    private final String local;

    public CenterImgResponse(CenterImages centerImages){
//        this.newFileName = centerImages.getNewFileName();
        this.local = "http://localhost:8080/image/"; //나중에 AWS시 .env로 변경
        this.path = centerImages.getFilePath();
    }


}
