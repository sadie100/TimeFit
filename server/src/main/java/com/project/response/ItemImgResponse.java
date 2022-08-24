package com.project.response;

import com.project.domain.ItemImages;
import lombok.Getter;

@Getter
public class ItemImgResponse {

    private String newFileName;
//    private final String path = "src/main/resources/static/img/";

    public ItemImgResponse(ItemImages itemImages){
        this.newFileName = itemImages.getNewFileName();
    }


}
