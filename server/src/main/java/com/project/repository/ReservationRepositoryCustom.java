package com.project.repository;

import com.project.domain.Reservation;
import com.project.domain.User;
import com.project.request.ReservationRequest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepositoryCustom {
    boolean check(Long id, ReservationRequest reservationRequest);

    List<Reservation> getReserve(Long id, String date, Long equipment);

    List<Reservation> getMyReserve(User user);

//    void saveReservation(Long id, ReservationRequest request);
}
