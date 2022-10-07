package com.project.controller.v1;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.domain.*;
import com.project.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.restdocs.request.RequestDocumentation;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs(uriScheme = "https", uriHost = "api.timefit.com",uriPort = 443)
@ExtendWith(RestDocumentationExtension.class)
public class CenterControllerDocTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
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



//    @Test
//    @DisplayName("센터 조회")
//    void test1() throws Exception{
//        List<Center> requestCenter = IntStream.range(0,20)
//                .mapToObj(i -> Center.builder()
//                        .name("센터" +i)
//                        .region("서울")
//                        .address("서울시 어딘가")
//                        .price(i*10000)
//                        .build()).collect(Collectors.toList());
//        centerRepository.saveAll(requestCenter);
//
//        this.mockMvc.perform(get("/centers")
//                        .accept(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andDo(print())
//                .andDo(document("search-center"
////                        , pathParameters(RequestDocumentation.parameterWithName("").description("1"))
//                        , responseFields(
//                                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("센터 ID"),
//                                fieldWithPath("[].name").type(JsonFieldType.STRING).description("센터 이름"),
//                                fieldWithPath("[].address").type(JsonFieldType.STRING).description("센터 주소")
//                        )
//                ));
//    }


    @Test
    @DisplayName("기구 특정 개수이상 보유한 센터 찾기&필터링")
    void test2() throws Exception {
        //given
        List<Center> requestCenter = IntStream.range(0, 20)
                .mapToObj(i -> Center.builder()
                        .name("센터" + i)
                        .region("서울")
                        .address("서울시 어딘가")
                        .price(i * 10000)
                        .build()).collect(Collectors.toList());
        centerRepository.saveAll(requestCenter);

        List<Equipment> equipments = IntStream.range(0, 5)
                .mapToObj(i -> Equipment.builder()
                        .name("장비" + i)
                        .build()).collect(Collectors.toList());
        equipmentRepository.saveAll(equipments);

        List<CenterEquipment> requestEquip = IntStream.range(0, 20)
                .mapToObj(i -> CenterEquipment.builder()
                        .center(requestCenter.get(i % 5))
                        .equipment(equipments.get(i % 3))
                        .build()).collect(Collectors.toList());
        centerEquipmentRepository.saveAll(requestEquip);

        List<CenterImages> images =  IntStream.range(0, 20)
                .mapToObj(i -> CenterImages.builder()
                        .center(requestCenter.get(i))
                        .originFileName("origin_name"+i)
                        .newFileName("new_name"+i)
                        .filePath("경로/"+i+"/img.png")
                        .build()).collect(Collectors.toList());
        centerImgRepository.saveAll(images);
        //expected
        this.mockMvc.perform(get("/centers?region=서울&minPrice=10000&maxPrice=20000&equipmentId=1&minNumber=1")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(document("center/search"
                        , pathParameters(
                                parameterWithName("region").optional().description("지역"),
                                parameterWithName("minPrice").description("최소 가격").optional(),
                                parameterWithName("maxPrice").description("최대 가격").optional(),
                                parameterWithName("equipmentId").description("헬스 기구 ID").optional(),
                                parameterWithName("minNumber").description("최소 갯수").optional()
                                        .attributes(key("constraint").value("미입력시 헬스기구 보유한 헬스장 필터링"))
                        )
                        , responseFields(
                                fieldWithPath("[].id").type(JsonFieldType.NUMBER).description("센터 ID"),
                                fieldWithPath("[].name").type(JsonFieldType.STRING).description("센터 이름"),
                                fieldWithPath("[].address").type(JsonFieldType.STRING).description("센터 주소"),
                                fieldWithPath("[].images").description("센터 이미지 목록"),
                                fieldWithPath("[].images[].path").description("이미지 경로")
                        )
                ));
    }

    @Test
    @DisplayName("센터 상세정보")
    void test3() throws Exception {
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
                        .center(center)
                        .originFileName("origin_name"+i)
                        .newFileName("new_name"+i)
                        .filePath("경로/"+i)
                        .build()).collect(Collectors.toList());
        centerImgRepository.saveAll(images);
        //expected
        mockMvc.perform(get("/centers/{centerId}",center.getId())
                        .contentType(APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(document("center/detail"
                        , pathParameters(
                                parameterWithName("centerId").description("센터 ID")
                        )
                        , responseFields(
                                fieldWithPath("id").description("센터 ID"),
                                fieldWithPath("name").description("센터 이름"),
                                fieldWithPath("phoneNumber").description("센터 전화번호"),
                                fieldWithPath("address").description("센터 주소"),
                                fieldWithPath("trainers").description("센터 트레이너 명단"),
                                fieldWithPath("images").description("센터 이미지 목록"),
                                fieldWithPath("images[].path").description("이미지 경로"),
                                fieldWithPath("equipmentNumbers").description("센터 기구"),
                                fieldWithPath("equipmentNumbers[].equipment").description("기구 이름"),
                                fieldWithPath("equipmentNumbers[].number").description("기구 수")

                        )
                ));

    }
}
