package com.project.response;

import com.project.domain.CenterImages;
import lombok.Getter;

@Getter
public class CenterImgResponse {

    private String newFileName;
//    private final String path = "src/main/resources/static/img/";

    public CenterImgResponse(CenterImages itemImages){
        this.newFileName = itemImages.getNewFileName();
    }


}
