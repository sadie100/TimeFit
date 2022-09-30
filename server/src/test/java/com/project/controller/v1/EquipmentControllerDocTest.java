package com.project.controller.v1;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.domain.Center;
import com.project.domain.CenterEquipment;
import com.project.domain.Equipment;
import com.project.repository.CenterEquipmentRepository;
import com.project.repository.CenterImgRepository;
import com.project.repository.CenterRepository;
import com.project.repository.EquipmentRepository;
import com.project.request.CenterEquipmentAdd;
import com.project.request.EquipmentCategory;
import com.project.service.EquipmentService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.request.RequestDocumentation;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs(uriScheme = "https", uriHost = "api.timefit.com",uriPort = 443)
@ExtendWith(RestDocumentationExtension.class)
class EquipmentControllerDocTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private EquipmentService equipmentService;

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private CenterEquipmentRepository centerEquipmentRepository;

    @Autowired
    private CenterRepository centerRepository;
    @Autowired
    private CenterImgRepository centerImgRepository;

    @BeforeEach
    void clean(){
        centerEquipmentRepository.deleteAll();
        equipmentRepository.deleteAll();
        centerRepository.deleteAll();
//        centerRepository.deleteAll();
//        centerImgRepository.deleteAll();
//        centerEquipmentRepository.deleteAll();
//        equipmentRepository.deleteAll();
    }

    @Test
    void getEquipments() throws Exception {
        mockMvc.perform(RestDocumentationRequestBuilders.get("/equipment")
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("/equipment"));
    }

    @Test
    void addEquipmentCategory() throws Exception{
        EquipmentCategory equipmentCategory
                = EquipmentCategory.builder()
                .name("name")
                .img("img")
                .build();
        String json = objectMapper.writeValueAsString(equipmentCategory);
        mockMvc .perform(RestDocumentationRequestBuilders.post("/equipment/add")
                .contentType(APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk())
                .andDo(document("equipment/add",
                        requestFields(
                                fieldWithPath("name").type(JsonFieldType.STRING).description("이름"),
                                fieldWithPath("img").type(JsonFieldType.STRING).description("이미지 이름, 파일 등록 후 수정 필요")
                                )
                        ))
        ;

    }

    @Test
    void addCenterEquipment() throws Exception {
        Center center= Center.builder()
                .name("이름")
                .region("지역")
                .address("주소")
//                .storeNumber(request.getStoreNumber())
                .build();

        Equipment equipment = Equipment.builder()
                .name("ss")
                .img("sss")
                .build();

        centerRepository.save(center);
        equipmentRepository.save(equipment);

        CenterEquipmentAdd centerEquipmentAdd =
                CenterEquipmentAdd.builder().equipment(equipment.getId()).center(center.getId()).xLoc(30L).yLoc(20L).build();

        String json = objectMapper.writeValueAsString(centerEquipmentAdd);

        mockMvc.perform(RestDocumentationRequestBuilders.post("/equipment/add-center")
                        .contentType(APPLICATION_JSON)
                        .content(json)
                )
                .andExpect(status().isOk())
                .andDo(document("/equipment/add-center",
                        requestFields(
                                fieldWithPath("center").type(JsonFieldType.NUMBER).description("센터 ID"),
                                fieldWithPath("equipment").type(JsonFieldType.NUMBER).description("기구 종류 ID"),
                                fieldWithPath("xloc").type(JsonFieldType.NUMBER).description("x 좌표"),
                                fieldWithPath("yloc").type(JsonFieldType.NUMBER).description("y 좌표")
                        )
                        ));
//        centerEquipmentRepository.deleteAll();
//        equipmentRepository.deleteAll();
//        centerRepository.deleteAll();
    }

    @Test
    void getCenterEquipments() throws Exception {
        Center center= Center.builder()
                .name("이름")
                .region("지역")
                .address("주소")
//                .storeNumber(request.getStoreNumber())
                .build();
        Equipment equipment = Equipment.builder()
                .name("sssss")
                .img("sssssssss")
                .build();
        centerRepository.save(center);
        equipmentRepository.save(equipment);
        CenterEquipment centerEquipment =
                CenterEquipment.builder().equipment(equipment).center(center).xLoc(30L).yLoc(20L).build();
        centerEquipmentRepository.save(centerEquipment);

        mockMvc.perform(RestDocumentationRequestBuilders.get("/equipment/{centerId}",center.getId())
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("/equipment/{centerId}",
                        pathParameters(RequestDocumentation.parameterWithName("centerId").description("센터 아이디"))));
//
//        centerEquipmentRepository.deleteAll();
//        equipmentRepository.deleteAll();
//        centerRepository.deleteAll();
    }
}