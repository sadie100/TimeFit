package com.project.controller.v1;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.domain.Center;
import com.project.domain.CenterImages;
import com.project.repository.CenterImgRepository;
import com.project.repository.CenterRepository;
import com.project.repository.UserRepository;
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
    private UserRepository userRepository;

    @BeforeEach
    void clean(){
        centerRepository.deleteAll();
        centerImgRepository.deleteAll();
        userRepository.deleteAll();
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
                .build();

        centerRepository.save(center);

        //expected
        mockMvc.perform(get("/centers/{centerId}",center.getId())
                    .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(center.getId()))
                .andExpect(jsonPath("$.name").value("센터"))
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