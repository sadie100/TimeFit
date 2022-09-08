package com.project.service;

import com.project.domain.CenterImages;
import com.project.domain.Center;
import com.project.repository.CenterImgRepository;
import com.project.repository.CenterRepository;
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
    private CenterService itemService;

    @Autowired
    private CenterRepository itemRepository;

    @Autowired
    private CenterImgRepository itemImgRepository;

    @BeforeEach
    void clean(){
        itemRepository.deleteAll();
    }

    @Test
    @DisplayName("아이템 등록")
    void test1(){
        Center requestItem = Center.builder()
                .name("상품")
                .build();

        itemRepository.save(requestItem);

        Assertions.assertEquals(1L,itemRepository.count());
        Center item = itemRepository.findAll().get(0);
        assertEquals("상품", item.getName());
    }

    @Test
    @DisplayName("페이지 불러오기")
    void test2(){
        //given
        List<Center> requestItems = IntStream.range(0,20)
                .mapToObj(i -> Center.builder()
                        .name("상품 " +i)
                        .build()).collect(Collectors.toList());
        itemRepository.saveAll(requestItems);
        CenterSearch itemSearch = CenterSearch.builder()
                .page(1)
                .build();

        //when
        List<CenterResponse> items = itemService.getList(itemSearch);

        //then
        assertEquals(10L, items.size());
        assertEquals("상품 19", items.get(0).getName());
        assertEquals("상품 15", items.get(4).getName());


    }
    @Test
    @DisplayName("아이템 이미지 불러오기")
    void test3(){
        //given
        Center requestItem = Center.builder()
                .name("상품")
                .build();

        itemRepository.save(requestItem);



        CenterImages images1 = CenterImages.builder()
                .originFileName("123")
                .newFileName("123")
                .item(requestItem).build();
        itemImgRepository.save(images1);

        CenterImages images2 = CenterImages.builder()
                .originFileName("456")
                .newFileName("444")
                .item(requestItem).build();
        itemImgRepository.save(images2);

        Center item = itemRepository.findAll().get(0);
        assertEquals("상품", item.getName());
        Set<CenterImages> itemImages = item.getImages();
        System.out.println(item.getImages());
    }


}