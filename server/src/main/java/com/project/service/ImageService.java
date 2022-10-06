package com.project.service;

import com.project.domain.Center;
import com.project.domain.CenterEquipment;
import com.project.domain.CenterImages;
import com.project.repository.CenterEquipmentRepository;
import com.project.repository.CenterImgRepository;
import com.project.request.FileDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ImageService {
    private CenterImgRepository centerImgRepository;
    public ImageService(CenterImgRepository fileRepository) {
        this.centerImgRepository = fileRepository;
    }

    @Transactional
    public void saveFile(FileDto fileDto) {
        CenterImages centerImages = CenterImages.builder()
                .originFileName(fileDto.getOriginFileName())
                .newFileName(fileDto.getNewFileName())
                .filePath(fileDto.getFilePath())
                .item(fileDto.getItem()).build();
        centerImgRepository.save(centerImages).getId();
        return;
    }
    public List<FileDto> getFile(Center center) {
        List<CenterImages> centerImages = centerImgRepository.findByItem(center);
        List<FileDto> fileDtos = new ArrayList<>();
        for(CenterImages img : centerImages){
            fileDtos.add(FileDto.builder()
                    .id(img.getId())
                    .originFileName(img.getOriginFileName())
                    .newFileName(img.getNewFileName())
                    .filePath("http://localhost:8080/image/"+img.getFilePath())
                    .build());
        }
        return fileDtos;
    }
}
