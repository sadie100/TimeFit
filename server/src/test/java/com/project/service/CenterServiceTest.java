package com.project.service;

import com.project.domain.CenterImages;
import com.project.domain.Center;
import com.project.repository.CenterEquipmentRepository;
import com.project.repository.CenterImgRepository;
import com.project.repository.CenterRepository;
import com.project.repository.ReservationRepository;
import com.project.request.CenterSearch;
import com.project.response.CenterResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CenterServiceTest {

    @Autowired
    private CenterService centerService;

    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private CenterRepository centerRepository;
    @Autowired
    private CenterEquipmentRepository centerEquipmentRepository;

    @BeforeEach
    void clean(){
        reservationRepository.deleteAll();
        centerEquipmentRepository.deleteAll();
        centerRepository.deleteAll();
    }

    @Test
    @DisplayName("아이템 등록")
    void test1(){
        Center requestcenter = Center.builder()
                .name("상품")
                .build();

        centerRepository.save(requestcenter);

        Assertions.assertEquals(1L,centerRepository.count());
        Center center = centerRepository.findAll().get(0);
        assertEquals("상품", center.getName());
    }

    @Test
    @DisplayName("페이지 불러오기")
    void test2(){
        //given
        List<Center> requestcenters = IntStream.range(0,20)
                .mapToObj(i -> Center.builder()
                        .name("상품 " +i)
                        .build()).collect(Collectors.toList());
        centerRepository.saveAll(requestcenters);
        CenterSearch centerSearch = CenterSearch.builder()
                .page(1)
                .build();

        //when
        List<CenterResponse> centers = centerService.getList(centerSearch);

        //then
        assertEquals(10L, centers.size());
        assertEquals("상품 19", centers.get(0).getName());
        assertEquals("상품 15", centers.get(4).getName());


    }
//    @Test
//    @DisplayName("아이템 이미지 불러오기")
//    void test3(){
//        //given
//        Center requestcenter = Center.builder()
//                .name("상품")
//                .build();
//
//        centerRepository.save(requestcenter);
//
//
//
//        CenterImages images1 = CenterImages.builder()
//                .originFileName("123")
//                .newFileName("123")
//                .center(requestcenter).build();
//        centerImgRepository.save(images1);
//
//        CenterImages images2 = CenterImages.builder()
//                .originFileName("456")
//                .newFileName("444")
//                .center(requestcenter).build();
//        centerImgRepository.save(images2);
//
//        Center center = centerRepository.findAll().get(0);
//        assertEquals("상품", center.getName());
//        Set<CenterImages> centerImages = center.getImages();
//        System.out.println(center.getImages());
//    }


}