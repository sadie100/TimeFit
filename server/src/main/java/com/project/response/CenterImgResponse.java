package com.project.response;

import com.project.domain.CenterImages;
import lombok.Getter;

@Getter
public class CenterImgResponse {

//    private String newFileName;
    private final String path;

    public CenterImgResponse(CenterImages centerImages){
//        this.newFileName = centerImages.getNewFileName();
        this.path = centerImages.getFilePath();
    }


}
