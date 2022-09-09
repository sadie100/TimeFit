package com.project.repository;

import com.project.domain.Reservation;
import com.project.request.ReservationRequest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ReservationRepositoryCustom {
    boolean check(ReservationRequest reservationRequest);

    List<Reservation> getReserve(ReservationRequest request);

    @Transactional
    void saveReservation(ReservationRequest request);
}
