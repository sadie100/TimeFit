package com.project.service;

import com.project.domain.Center;
import com.project.domain.CenterEquipment;
import com.project.domain.Reservation;
import com.project.domain.User;
import com.project.exception.CenterNotFound;
import com.project.exception.ReservationExist;
import com.project.repository.CenterEquipmentRepository;
import com.project.repository.CenterRepository;
import com.project.repository.ReservationRepository;
import com.project.request.ReservationRequest;
import com.project.response.ReservationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j //로그 작성
@Service  //서비스 레이어
@RequiredArgsConstructor  //lombok을 통해 생성자처리
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final CenterRepository centerRepository;
    private final CenterEquipmentRepository centerEquipmentRepository;

    public HashMap<Long,List<ReservationResponse>> getReservation(Long id, ReservationRequest request){
        HashMap<Long,List<ReservationResponse>> reservationList = new HashMap<Long,List<ReservationResponse>>();
        for(Long equipment : request.getEquipments()){
            List<ReservationResponse> rv = reservationRepository.getReserve(id, equipment).stream()
                    .map(ReservationResponse::new)
                    .collect(Collectors.toList());

            reservationList.put(equipment,rv);
        }
        return reservationList;
    }

//    public List<ReservationResponse> getReservation(Long id, ReservationRequest request){
//        return reservationRepository.getReserve(id, request).stream()
//                .map(ReservationResponse::new)
//                .collect(Collectors.toList());
//    }
    public void requestReservation(Long id, ReservationRequest request){
        //예약 있을 시 예외처리 필요함

        if(!reservationRepository.check(id, request)){
            throw new ReservationExist();
        }
        Center center = centerRepository.findById(id)
                .orElseThrow(CenterNotFound::new);
        CenterEquipment ce = centerEquipmentRepository.findById(request.getEquipmentId())
                .orElseThrow();
        Reservation rv = Reservation.builder()
                .center(center)
                .equipment(ce)
                .start(request.getStart())
                .end(request.getEnd())
//                .user(user)
                .build();
        reservationRepository.save(rv);
    }

    public void cancelReservation(Long centerId, ReservationRequest request) {
        reservationRepository.deleteById(1L);
    }
}
