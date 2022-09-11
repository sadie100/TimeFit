package com.project.request;

import com.project.domain.Center;
import lombok.*;

import javax.persistence.*;
import java.io.File;


@Getter
@NoArgsConstructor
public class FileDto {
    private String originFileName;
    private String newFileName;
    private Center item;

    @Builder
    public FileDto(String originFileName, String newFileName, Center item ) {
        this.originFileName = originFileName;
        this.newFileName = newFileName;
        this.item = item;
    }


}

