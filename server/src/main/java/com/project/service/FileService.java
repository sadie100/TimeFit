package com.project.service;

import com.project.domain.Center;
import com.project.domain.CenterImages;
import com.project.exception.CenterNotFound;
import com.project.repository.CenterImgRepository;
import com.project.repository.CenterRepository;
import com.project.request.FileDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FileService {
    private CenterImgRepository centerImgRepository;

    public FileService(CenterImgRepository fileRepository) {
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


    @Transactional
    public List<FileDto> getFile(Center center) {
        List<CenterImages> centerImages = centerImgRepository.findByItem(center);
        List<FileDto> fileDtos = new ArrayList<>();
        for(CenterImages img : centerImages){
            fileDtos.add(FileDto.builder()
                    .id(img.getId())
                    .newFileName(img.getNewFileName())
                    .filePath(img.getFilePath())
                    .build());
        }
        centerImgRepository.findByItem(center);
        return fileDtos;
    }
}
