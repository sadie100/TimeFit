package com.project.controller.v1;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.domain.Center;
import com.project.domain.CenterEquipment;
import com.project.domain.Equipment;
import com.project.repository.*;
import com.project.request.*;
import com.project.service.EquipmentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@SpringBootTest
@AutoConfigureMockMvc
class EquipmentControllerTest {

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
    private CenterImgRepository centerImgRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private CustomeUserRepository userRepository;

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private CenterRepository centerRepository;

    EntityManager em;

    @BeforeEach
    void clean(){
        centerEquipmentRepository.deleteAll();
        equipmentRepository.deleteAll();
        centerRepository.deleteAll();
//        centerRepository.deleteAll();
//        centerImgRepository.deleteAll();
        userRepository.deleteAll();
//        centerEquipmentRepository.deleteAll();
//        equipmentRepository.deleteAll();
    }
    @Test
    void getEquipments() throws Exception {
        mockMvc.perform(get("/equipment")
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void addEquipmentCategory() throws Exception{
        EquipmentCategory equipmentCategory
                = EquipmentCategory.builder()
                .name("name")
                .img("img")
                .build();
        String json = objectMapper.writeValueAsString(equipmentCategory);
        mockMvc .perform(post("/equipment/add")
                .contentType(APPLICATION_JSON)
                .content(json))
                .andExpect(status().isOk());
        Assertions.assertEquals(1, equipmentRepository.count());
        equipmentRepository.deleteAll();
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

        mockMvc.perform(post("/equipment/add-center")
                        .contentType(APPLICATION_JSON)
                        .content(json)
                )
                .andExpect(status().isOk());
        Assertions.assertEquals(1, centerEquipmentRepository.count());
        centerEquipmentRepository.deleteAll();
        equipmentRepository.deleteAll();
        centerRepository.deleteAll();

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
                .name("ss")
                .img("sss")
                .build();
        centerRepository.save(center);
        equipmentRepository.save(equipment);
        CenterEquipment centerEquipment =
                CenterEquipment.builder().equipment(equipment).center(center).xLoc(30L).yLoc(20L).build();
        centerEquipmentRepository.save(centerEquipment);

        mockMvc.perform(get("/equipment/{centerId}",center.getId())
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk());
        centerEquipmentRepository.deleteAll();
        equipmentRepository.deleteAll();
        centerRepository.deleteAll();

    }
}