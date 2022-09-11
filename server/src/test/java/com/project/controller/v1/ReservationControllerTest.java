package com.project.controller.v1;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.domain.Center;
import com.project.domain.CenterEquipment;
import com.project.domain.Reservation;
import com.project.repository.CenterEquipmentRepository;
import com.project.repository.CenterRepository;
import com.project.repository.ReservationRepository;
import com.project.request.ReservationRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ReservationControllerTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private CenterRepository centerRepository;
    @Autowired
    private CenterEquipmentRepository centerEquipmentRepository;

    @BeforeEach
    void clean(){
        reservationRepository.deleteAll();
        centerRepository.deleteAll();
    }

    @Test
    @DisplayName("예약 확인")
    void test1() throws Exception{
        //given
        List<Center> requestCenter = IntStream.range(0,20)
                .mapToObj(i -> Center.builder()
                        .name("센터" +i)
                        .region("서울")
                        .price(i*10000)
                        .build()).collect(Collectors.toList());
        centerRepository.saveAll(requestCenter);

        List<CenterEquipment> requestEquip = IntStream.range(0,20)
                .mapToObj(i -> CenterEquipment.builder()
                        .center(requestCenter.get(i%5))
                        .build()).collect(Collectors.toList());
        centerEquipmentRepository.saveAll(requestEquip);

        List<Reservation> requestReserve = IntStream.range(0,20)
                .mapToObj(i -> Reservation.builder()
                        .center(requestCenter.get(i%5))
                        .equipment(requestEquip.get(i%5))
                        .start(LocalDateTime.parse("2022-09-11T10:15:30"))
                        .end(LocalDateTime.parse("2022-09-11T10:15:30"))
                        .build()).collect(Collectors.toList());
        reservationRepository.saveAll(requestReserve);


        mockMvc.perform(get("/center/{centerId}/reserve?equipments=1",1L)
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());

    }
    @Test
    @DisplayName("예약 신청")
    void test2() throws Exception{
        //given
        List<Center> requestCenter = IntStream.range(0,20)
                .mapToObj(i -> Center.builder()
                        .name("센터" +i)
                        .region("서울")
                        .price(i*10000)
                        .build()).collect(Collectors.toList());
        centerRepository.saveAll(requestCenter);

        List<CenterEquipment> requestEquip = IntStream.range(0,20)
                .mapToObj(i -> CenterEquipment.builder()
                        .center(requestCenter.get(i%5))
                        .build()).collect(Collectors.toList());
        centerEquipmentRepository.saveAll(requestEquip);

        LocalDate now = LocalDate.now();
        List<Reservation> requestReserve = IntStream.range(0,20)
                .mapToObj(i -> Reservation.builder()
                        .center(requestCenter.get(i%5))
                        .equipment(requestEquip.get(i%5))
                        .start(LocalDateTime.parse(now+"T10:15:30"))
                        .end(LocalDateTime.parse(now+"T10:25:30"))
                        .build()).collect(Collectors.toList());
        reservationRepository.saveAll(requestReserve);

        List<Long> ids = new ArrayList<>();
        ids.add(1l);
        ReservationRequest request = ReservationRequest.builder()
                .equipmentId(1L)
                .equipments(ids)
                .start(LocalDateTime.parse(now+"T10:45:30"))
                .end(LocalDateTime.parse(now+"T10:55:30"))
                .build();


        mockMvc.perform(post("/center/{centerId}/reserve",1L)
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @DisplayName("예약 차있을 때")
    void test3() throws Exception{
        //given
        List<Center> requestCenter = IntStream.range(0,20)
                .mapToObj(i -> Center.builder()
                        .name("센터" +i)
                        .region("서울")
                        .price(i*10000)
                        .build()).collect(Collectors.toList());
        centerRepository.saveAll(requestCenter);

        List<CenterEquipment> requestEquip = IntStream.range(0,20)
                .mapToObj(i -> CenterEquipment.builder()
                        .center(requestCenter.get(i%5))
                        .build()).collect(Collectors.toList());
        centerEquipmentRepository.saveAll(requestEquip);

        LocalDate now = LocalDate.now();
        List<Reservation> requestReserve = IntStream.range(0,20)
                .mapToObj(i -> Reservation.builder()
                        .center(requestCenter.get(i%5))
                        .equipment(requestEquip.get(i%5))
                        .start(LocalDateTime.parse(now+"T10:15:30"))
                        .end(LocalDateTime.parse(now+"T10:25:30"))
                        .build()).collect(Collectors.toList());
        reservationRepository.saveAll(requestReserve);

        List<Long> ids = new ArrayList<>();
        ids.add(1l);
        ReservationRequest request = ReservationRequest.builder()
                .equipmentId(1L)
                .equipments(ids)
                .start(LocalDateTime.parse(now+"T10:15:30"))
                .end(LocalDateTime.parse(now+"T10:20:30"))
                .build();


        mockMvc.perform(post("/center/{centerId}/reserve",1L)
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }
}