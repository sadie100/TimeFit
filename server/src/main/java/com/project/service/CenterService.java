package com.project.service;


import com.project.domain.Center;
import com.project.domain.CenterEditor;
import com.project.exception.CenterNotFound;
import com.project.repository.CenterImgRepository;
import com.project.repository.CenterRepository;
import com.project.request.CenterInfo;
import com.project.request.CenterSearch;
import com.project.response.CenterDetailResponse;
import com.project.response.CenterEquipmentNumber;
import com.project.response.CenterImgResponse;
import com.project.response.CenterResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j //로그 작성
@Service  //서비스 레이어
@RequiredArgsConstructor  //lombok을 통해 생성자처리
public class CenterService {

    private final CenterRepository centerRepository;
    private final CenterImgRepository centerImgRepository;


    public List<CenterResponse> getList(CenterSearch centerSearch){
        return centerRepository.getList(centerSearch).stream()
                .map(CenterResponse::new)
                .collect(Collectors.toList());
    }

    public CenterDetailResponse get(Long centerId) {
        Center center = centerRepository.findById(centerId)
                .orElseThrow(CenterNotFound::new);
        List<CenterEquipmentNumber> equipNumber = centerRepository.getEquipNumber(centerId);
        CenterDetailResponse centerDetailResponse = new CenterDetailResponse(center, equipNumber);
        return centerDetailResponse;
    }

//    public List<CenterImgResponse> getImg(Long centerId){
//        Center center = centerRepository.findById(centerId)
//                .orElseThrow(CenterNotFound::new);
//        return centerImgRepository.findBycenter(center).stream()
//                .map(CenterImgResponse::new)
//                .collect(Collectors.toList());
//    }


    public void updateView(Long centerId) {
        centerRepository.updateView(centerId);
    }

    public List<Center> findAllCenter(){
        List<Center> center =centerRepository.findAll();
        return center;
    }

    public Center getCenterByID(Long centerId){
        Center center = centerRepository.findById(centerId)
                .orElseThrow(CenterNotFound::new);
        return center;
    }

    @Transactional
    public Center update(CenterInfo centerInfo){
        Center center = centerRepository.findById(centerInfo.getCenterId())
                .orElseThrow(CenterNotFound::new);
        CenterEditor.CenterEditorBuilder editorBuilder = center.toEditor(); //빌더클래스를 받음
        CenterEditor centerEditor = editorBuilder
                .address(centerInfo.getAddress())
                .region(centerInfo.getRegion())
                .name(centerInfo.getName())
                .price(centerInfo.getPrice())
                .phoneNumber(centerInfo.getPhoneNumber())
                .build();
        center.edit(centerEditor);
        return center;
    }
}
