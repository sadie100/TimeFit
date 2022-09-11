package com.project.controller.v1;

import com.project.domain.Center;
import com.project.request.FileDto;
import com.project.service.FileService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public class FileController {

    private FileService fileService;
    @PostMapping("/post")
    public String write(@RequestParam("file") MultipartFile files, long centerId) {
        try {
            String origFilename = files.getOriginalFilename();
            String filename = origFilename;
            /* 실행되는 위치의 'files' 폴더에 파일이 저장됩니다. */
            String savePath = System.getProperty("user.dir") + "\\files";
            /* 파일이 저장되는 폴더가 없으면 폴더를 생성합니다. */
            if (!new File(savePath).exists()) {
                try{
                    new File(savePath).mkdir();
                }
                catch(Exception e){
                    e.getStackTrace();
                }
            }
            String filePath = savePath + "\\" + filename;
            files.transferTo(new File(filePath));

            Center center = fileService.getCenter(centerId);
            FileDto fileDto =
                    FileDto.builder().originFileName(filename).newFileName(filePath).item(center).build();

            Long fileId = fileService.saveFile(fileDto);
//            boardDto.setFileId(fileId);
//            boardService.savePost(boardDto);

        } catch(Exception e) {
            e.printStackTrace();
        }
        return "redirect:/";
    }
}
