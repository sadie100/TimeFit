package com.project.controller.v1;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.domain.Center;
import com.project.domain.CenterEquipment;
import com.project.domain.Reservation;
import com.project.exception.ReservationExist;
import com.project.repository.CenterEquipmentRepository;
import com.project.repository.CenterRepository;
import com.project.repository.ReservationRepository;
import com.project.request.ReservationRequest;
import com.project.request.ReservationSearch;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
        centerEquipmentRepository.deleteAll();
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

        LocalDate now = LocalDate.now();
        List<Reservation> requestReserve = IntStream.range(0,20)
                .mapToObj(i -> Reservation.builder()
                        .center(requestCenter.get(0))
                        .centerEquipment(requestEquip.get(i%5))
                        .start(LocalDateTime.parse(now+"T10:15:"+(10+i)))
                        .end(LocalDateTime.parse(now+"T10:25:"+(10+i)))
                        .build()).collect(Collectors.toList());
        reservationRepository.saveAll(requestReserve);

        List<Long> ids = new ArrayList<>();
        ids.add(requestEquip.get(1).getId());
        ids.add(requestEquip.get(2).getId());
        ReservationSearch request = ReservationSearch.builder()
                .searchIds(ids)
//                .searchDate(LocalDate.parse("2022-09-25"))
                .build();

        mockMvc.perform(get("/center/{centerId}/reserve?searchIds={1},{2}&searchDate={d}"
                        ,requestCenter.get(0).getId(),requestEquip.get(1).getId(),requestEquip.get(2).getId(),now)
//                        .content(objectMapper.writeValueAsString(request))
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
                        .centerEquipment(requestEquip.get(i%5))
                        .start(LocalDateTime.parse(now+"T10:15:30"))
                        .end(LocalDateTime.parse(now+"T10:25:30"))
                        .build()).collect(Collectors.toList());
        reservationRepository.saveAll(requestReserve);

        List<Long> ids = new ArrayList<>();
        ids.add(requestEquip.get(1).getId());
        ReservationRequest request = ReservationRequest.builder()
                .centerEquipmentId(requestEquip.get(1).getId())
                .start(LocalDateTime.parse(now+"T10:45:30"))
                .end(LocalDateTime.parse(now+"T10:55:30"))
                .build();


        mockMvc.perform(post("/center/{centerId}/reserve",requestCenter.get(1).getId())
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
                        .centerEquipment(requestEquip.get(i%5))
                        .start(LocalDateTime.parse(now+"T10:15:30"))
                        .end(LocalDateTime.parse(now+"T10:25:30"))
                        .build()).collect(Collectors.toList());
        reservationRepository.saveAll(requestReserve);

        List<Long> ids = new ArrayList<>();
        ids.add(requestEquip.get(1).getId());
        ReservationRequest request = ReservationRequest.builder()
                .centerEquipmentId(requestEquip.get(1).getId())
                .start(LocalDateTime.parse(now+"T10:15:30"))
                .end(LocalDateTime.parse(now+"T10:20:30"))
                .build();

//        assertThatThrownBy(() ->
//                mockMvc.perform(post("/center/{centerId}/reserve",requestCenter.get(1).getId())
//                                .content(objectMapper.writeValueAsString(request))
//                                .contentType(APPLICATION_JSON))
//                        .andExpect(status().isOk())
//                        .andDo(print())).hasCause(new ReservationExist());
        mockMvc.perform(post("/center/{centerId}/reserve",requestCenter.get(1).getId())
                        .content(objectMapper.writeValueAsString(request))
                        .contentType(APPLICATION_JSON))
//                .andExpect(result -> assertTrue(result.getResolvedException() instanceof RuntimeException))
                .andExpect(status().isMethodNotAllowed())
                .andDo(print());
    }

    @Test
    @DisplayName("예약 취소")
    void test4() throws Exception{
       Center requestCenter = Center.builder()
                        .name("센터")
                        .region("서울")
                        .price(10000)
                        .build();
        centerRepository.save(requestCenter);

        CenterEquipment requestEquip = CenterEquipment.builder()
                        .center(requestCenter)
                        .build();
        centerEquipmentRepository.save(requestEquip);

        LocalDate now = LocalDate.now();
        Reservation requestReserve = Reservation.builder()
                        .center(requestCenter)
                        .centerEquipment(requestEquip)
                        .start(LocalDateTime.parse(now+"T10:15:30"))
                        .end(LocalDateTime.parse(now+"T10:25:30"))
                        .build();
        reservationRepository.save(requestReserve);

        mockMvc.perform(delete("/center/{centerId}/reserve/{reservationId}",requestCenter.getId(),requestReserve.getId())
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }
}