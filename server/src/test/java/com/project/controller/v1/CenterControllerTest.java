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
    private CenterRepository itemRepository;



    @Autowired
    private CenterImgRepository itemImgRepository;
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void clean(){
        itemRepository.deleteAll();
        itemImgRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("아이템 페이지 조회")
    void test1() throws Exception {
        //given
        List<Center> requestItems = IntStream.range(0,20)
                .mapToObj(i -> Center.builder()
                        .name("상품" +i)
                        .build()).collect(Collectors.toList());
        itemRepository.saveAll(requestItems);

        //expected
        mockMvc.perform(get("/items")
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()",is(10)))
                .andExpect(jsonPath("$[0].name").value("상품19"))
                .andExpect(jsonPath("$[0].brand").value("브랜드19"))
                .andDo(print());

    }
    @Test
    @DisplayName("아이템 페이지 조회/페이지,갯수 추가")
    void test2() throws Exception {
        //given
        List<Center> requestItems = IntStream.range(0,20)
                .mapToObj(i -> Center.builder()
                        .name("상품" +i)
                        .build()).collect(Collectors.toList());
        itemRepository.saveAll(requestItems);

        //expected
        mockMvc.perform(get("/items?page=2&size=10")
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()",is(10)))
                .andExpect(jsonPath("$[0].name").value("상품9"))
                .andExpect(jsonPath("$[0].brand").value("브랜드9"))
                .andDo(print());

    }
    @Test
    @DisplayName("아이템 필터링 조회")
    void test3() throws Exception {
        //given
        List<Center> requestItems = IntStream.range(0,20)
                .mapToObj(i -> Center.builder()
                        .name("상품" +i)
                        .build()).collect(Collectors.toList());
        itemRepository.saveAll(requestItems);

        //expected
        mockMvc.perform(get("/items?page=1&size=10&brand=브랜드1,브랜드2")
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].brand").value("브랜드2"))
                .andDo(print());

    }

    @Test
    @DisplayName("아이템 상세정보")
    void test4() throws Exception {
        //given
        Center item = Center.builder()
                .name("상품")
                .build();

        itemRepository.save(item);

        //expected
        mockMvc.perform(get("/items/{itemId}",item.getId())
                    .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(item.getId()))
                .andExpect(jsonPath("$.name").value("상품"))
                .andDo(print());

    }

    @Test
    @DisplayName("아이템 상세정보 이미지")
    void test5() throws Exception {
        //given
        Center item = Center.builder()
                .name("상품")
                .build();

        itemRepository.save(item);

        CenterImages images1 = CenterImages.builder()
                .originFileName("123")
                .newFileName("123")
                .item(item).build();
        itemImgRepository.save(images1);

        CenterImages images2 = CenterImages.builder()
                .originFileName("456")
                .newFileName("444")
                .item(item).build();
        itemImgRepository.save(images2);

        //expected
        mockMvc.perform(get("/items/{itemId}/img",item.getId())
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }


}