package com.project.repository;

import com.project.domain.Reservation;
import com.project.request.ReservationRequest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ReservationRepositoryCustom {
    boolean check(Long id, ReservationRequest reservationRequest);

    List<Reservation> getReserve(Long id, ReservationRequest request);

//    void saveReservation(Long id, ReservationRequest request);
}
