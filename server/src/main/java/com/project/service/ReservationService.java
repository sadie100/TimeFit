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
import com.project.request.ReservationSearch;
import com.project.response.ReservationDetailResponse;
import com.project.response.ReservationResponse;
import com.project.response.ReservationUserResponse;
import com.project.response.TempResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j //로그 작성
@Service  //서비스 레이어
@RequiredArgsConstructor  //lombok을 통해 생성자처리
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final CenterRepository centerRepository;
    private final CenterEquipmentRepository centerEquipmentRepository;

    public List<ReservationResponse> getReservation(Long id, ReservationSearch request){
        List<ReservationResponse> reservationList = new ArrayList<>();
        for(Long equipment : request.getSearchIds()){
            List<ReservationDetailResponse> rv =
                    reservationRepository.getReserve(id, request.getSearchDate(),equipment).stream()
                            .map(ReservationDetailResponse::new)
                            .collect(Collectors.toList());
            reservationList.add(new ReservationResponse(equipment,rv));
        }
        return reservationList;
    }
    public void requestReservation(Long id, ReservationRequest request, User user){
        //예약 있을 시 예외처리 필요함

        if(!reservationRepository.check(id, request)){
            throw new ReservationExist();
        }
        Center center = centerRepository.findById(id)
                .orElseThrow(CenterNotFound::new);
        CenterEquipment ce = centerEquipmentRepository.findById(request.getCenterEquipmentId())
                .orElseThrow();
        Reservation rv = Reservation.builder()
                .center(center)
                .centerEquipment(ce)
                .start(request.getStart())
                .end(request.getEnd())
                .user(user)
                .build();
        reservationRepository.save(rv);
    }

    public void cancelReservation(Long centerId, Long reservationId) {
        reservationRepository.deleteById(reservationId);
    }

    public List<ReservationUserResponse> getMyReservation(User user){
        return reservationRepository.getMyReserve(user).stream()
                .map(ReservationUserResponse::new)
                .collect(Collectors.toList());
    }
}
