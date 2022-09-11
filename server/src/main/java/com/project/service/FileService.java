package com.project.service;

import com.project.domain.Center;
import com.project.domain.CenterImages;
import com.project.exception.CenterNotFound;
import com.project.repository.CenterImgRepository;
import com.project.repository.CenterRepository;
import com.project.request.FileDto;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class FileService {
    private CenterImgRepository fileRepository;
    private CenterRepository centerRepository;

    public FileService(CenterImgRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @Transactional
    public Long saveFile(FileDto fileDto) {
        CenterImages centerImages = CenterImages.builder()
                .originFileName(fileDto.getOriginFileName())
                .newFileName(fileDto.getNewFileName())
                .item(fileDto.getItem()).build();
        return fileRepository.save(centerImages).getId();
    }

    public Center getCenter(Long id){
        Center center = centerRepository.findById(id).orElseThrow(()-> new CenterNotFound());;
        return  center;
    }

//    @Transactional
//    public FileDto getFile(Long id) {
//        File file = fileRepository.findById(id).get();
//
//        FileDto fileDto = FileDto.builder()
//                .id(id)
//                .origFilename(file.getOrigFilename())
//                .filename(file.getFilename())
//                .filePath(file.getFilePath())
//                .build();
//        return fileDto;
//    }
}
