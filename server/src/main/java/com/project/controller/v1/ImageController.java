package com.project.controller.v1;

import com.project.domain.Center;
import com.project.exception.FileUploadException;
import com.project.request.FileDto;
import com.project.service.CenterService;
import com.project.service.EquipmentService;
import com.project.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.io.File;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@RestController // 결과값을 JSON으로 출력
@RequiredArgsConstructor ////lombok을 통해 생성자처리
public class ImageController {
    private final ImageService imageService;
    private final CenterService centerService;
    private final EquipmentService equipmentService;
    @PostMapping("/upload-center")
    public void uploadCenter(@RequestParam("file") MultipartFile[] files, Long centerId) {
        Center center = centerService.getCenterByID(centerId);
        LocalDateTime localtime = LocalDateTime.now();
        String now
                = localtime.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
        try {
            //실행되는 위치의 'files' 폴더에 파일이 저장
            String basicPath = System.getProperty("user.dir")+ "/files";
//            String basicPath = System.getProperty("user.dir")+ "\\files";
            if (!new File(basicPath).exists()) {
                new File(basicPath).mkdir();
            }
            String savePath = basicPath+ "\\center";
            // 파일이 저장되는 폴더가 없으면 폴더를 생성
            if (!new File(savePath).exists()) {
                new File(savePath).mkdir();
            }
            for (MultipartFile file : files){
                String filename = file.getOriginalFilename();
                String newFilename =  now + filename ;
                String filePath = savePath + "\\" + newFilename;
                file.transferTo(new File(filePath));
                FileDto fileDto =
                        FileDto.builder().originFileName(filename).newFileName(newFilename).filePath("center/"+newFilename).item(center).build();
                imageService.saveFile(fileDto);
            }
        } catch(Exception e) {
            throw new FileUploadException();
        }
        return ;
    }

    @GetMapping("/get-center/{centerId}")
    public List<FileDto> getFiles(@PathVariable("centerId") Long centerId) {
        Center center = centerService.getCenterByID(centerId);
        List<FileDto> fileDto = imageService.getFile(center);

        return fileDto;
    }

    @PostMapping("/upload-equipment")
    public void uploadEquipment(@RequestParam("file") MultipartFile[] files, Long equipmentId) {
        LocalDateTime localtime = LocalDateTime.now();
        String now
                = localtime.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS"));
        try {
            //실행되는 위치의 'files' 폴더에 파일이 저장
            String basicPath = System.getProperty("user.dir")+ "\\files";
            if (!new File(basicPath).exists()) {
                new File(basicPath).mkdir();
            }
            String savePath = basicPath+ "\\equipment";
            // 파일이 저장되는 폴더가 없으면 폴더를 생성
            if (!new File(savePath).exists()) {
                new File(savePath).mkdir();
            }
            for (MultipartFile file : files){
                String filename = file.getOriginalFilename();
                String newFilename =  now + filename ;
                String filePath = savePath + "\\" + newFilename;
                file.transferTo(new File(filePath));
                equipmentService.setEquipmentImage(equipmentId,"equipment/"+newFilename);
            }
        } catch(Exception e) {
            throw new FileUploadException();
        }
        return ;
    }

}
