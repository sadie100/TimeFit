package com.project.service;

import com.project.domain.Reservation;
import com.project.repository.ReservationRepository;
import com.project.request.ReservationRequest;
import com.project.response.ReservationResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j //로그 작성
@Service  //서비스 레이어
@RequiredArgsConstructor  //lombok을 통해 생성자처리
public class ReservationService {

    private final ReservationRepository reservationRepository;

    public boolean reserve(ReservationRequest reservationRequest){
        if (!reservationRepository.check(reservationRequest))
            return false;
        return true;
    }

    public List<ReservationResponse> getReservation(ReservationRequest request){

        return reservationRepository.getReserve(request).stream()
                .map(ReservationResponse::new)
                .collect(Collectors.toList());
    }

    public void requestReservation(ReservationRequest request) {
        if(!reservationRepository.check(request));
        reservationRepository.saveReservation(request);
    }
}
