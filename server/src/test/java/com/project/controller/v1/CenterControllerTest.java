package com.project.controller.v1;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.domain.*;
import com.project.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;


import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.hamcrest.Matchers.is;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CenterControllerTest {

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CenterRepository centerRepository;
    @Autowired
    private CenterImgRepository centerImgRepository;
    @Autowired
    private CenterEquipmentRepository centerEquipmentRepository;
    @Autowired
    private EquipmentRepository equipmentRepository;
    @Autowired
    private TrainerRepository trainerRepository;
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void clean(){
        centerImgRepository.deleteAll();
        userRepository.deleteAll();
        centerEquipmentRepository.deleteAll();
        equipmentRepository.deleteAll();
        trainerRepository.deleteAll();
        centerRepository.deleteAll();
    }

    @Test
    @DisplayName("센터 페이지 조회")
    void test1() throws Exception {
        //given
        List<Center> requestCenter = IntStream.range(0,20)
                .mapToObj(i -> Center.builder()
                        .name("센터" +i)
                        .region("서울")
                        .price(i*10000)
                        .build()).collect(Collectors.toList());
        centerRepository.saveAll(requestCenter);

        //expected
        mockMvc.perform(get("/centers")
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()",is(10)))
                .andExpect(jsonPath("$[0].name").value("센터19"))
                .andDo(print());

    }
    @Test
    @DisplayName("센터 페이지 조회/페이지,갯수 추가")
    void test2() throws Exception {
        //given
        List<Center> requestCenter = IntStream.range(0,20)
                .mapToObj(i -> Center.builder()
                        .name("센터" +i)
                        .build()).collect(Collectors.toList());
        centerRepository.saveAll(requestCenter);

        //expected
        mockMvc.perform(get("/centers?page=2&size=10")
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()",is(10)))
                .andExpect(jsonPath("$[0].name").value("센터9"))

                .andDo(print());

    }
    @Test
    @DisplayName("센터 필터링 조회")
    void test3() throws Exception {
        //given
        List<Center> requestItems = IntStream.range(0,20)
                .mapToObj(i -> Center.builder()
                        .name("센터" +i)
                        .region("도시"+i)
                        .build()).collect(Collectors.toList());
        centerRepository.saveAll(requestItems);

        //expected
        mockMvc.perform(get("/centers?page=1&size=10&region=도시1")
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("센터1"))
                .andDo(print());

    }

    @Test
    @DisplayName("센터 상세정보")
    void test4() throws Exception {
        //given
        Center center = Center.builder()
                .name("센터")
                .region("서울")
                .address("서울시 마포구 신수동")
                .phoneNumber("010-1234-5678")
                .build();
        centerRepository.save(center);

        List<Equipment> equipments = IntStream.range(0,5)
                .mapToObj(i -> Equipment.builder()
                        .name("장비"+i)
                        .build()).collect(Collectors.toList());
        equipmentRepository.saveAll(equipments);

        List<CenterEquipment> requestEquip = IntStream.range(0,20)
                .mapToObj(i -> CenterEquipment.builder()
                        .center(center)
                        .equipment(equipments.get(i%3))
                        .build()).collect(Collectors.toList());
        centerEquipmentRepository.saveAll(requestEquip);

        List<Trainer> trainers = IntStream.range(1,4)
                .mapToObj(i -> Trainer.builder()
                        .center(center)
                        .name("아무개"+i)
                        .gender("성별")
                        .build()).collect(Collectors.toList());
        trainerRepository.saveAll(trainers);

        List<CenterImages> images =  IntStream.range(0,3)
                .mapToObj(i -> CenterImages.builder()
                        .item(center)
                        .originFileName("origin_name"+i)
                        .newFileName("new_name"+i)
                        .filePath("경로/"+i)
                        .build()).collect(Collectors.toList());
        centerImgRepository.saveAll(images);

        //expected
        mockMvc.perform(get("/centers/{centerId}",center.getId())
                    .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(center.getId()))
                .andExpect(jsonPath("$.name").value("센터"))
                .andDo(print());

    }
    @Test
    @DisplayName("기구 특정 개수이상 보유한 센터 찾기")
    void test5() throws Exception {
        //given
        List<Center> requestCenter = IntStream.range(0,20)
                .mapToObj(i -> Center.builder()
                        .name("센터" +i)
                        .region("도시"+i)
                        .build()).collect(Collectors.toList());
        centerRepository.saveAll(requestCenter);
        List<Equipment> equipments = IntStream.range(0,5)
                .mapToObj(i -> Equipment.builder()
                        .name("장비"+i)
                        .build()).collect(Collectors.toList());
        equipmentRepository.saveAll(equipments);
        List<CenterEquipment> requestEquip = IntStream.range(0,20)
                .mapToObj(i -> CenterEquipment.builder()
                        .center(requestCenter.get(i%5))
                        .equipment(equipments.get(i%3))
                        .build()).collect(Collectors.toList());
        centerEquipmentRepository.saveAll(requestEquip);

        //expected
        mockMvc.perform(get("/centers?equipmentId={id}",requestCenter.get(0).getId())
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }
//    @Test
//    @DisplayName("센터 상세정보 이미지")
//    void test5() throws Exception {
//        //given
//        Center center = Center.builder()
//                .name("상품")
//                .build();
//
//        centerRepository.save(center);
//
//        CenterImages images1 = CenterImages.builder()
//                .originFileName("123")
//                .newFileName("123")
//                .item(center).build();
//        itemImgRepository.save(images1);
//
//        CenterImages images2 = CenterImages.builder()
//                .originFileName("456")
//                .newFileName("444")
//                .item(center).build();
//        itemImgRepository.save(images2);
//
//        //expected
//        mockMvc.perform(get("/centers/{centerId}/img",center.getId())
//                        .contentType(APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andDo(print());
//    }


}