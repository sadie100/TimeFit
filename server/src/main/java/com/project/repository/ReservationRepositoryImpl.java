package com.project.repository;

import com.project.domain.*;
import com.project.request.ReservationRequest;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.project.domain.QCenter.center;
import static com.project.domain.QCenterEquipment.centerEquipment;
import static com.project.domain.QReservation.reservation;

@RequiredArgsConstructor //자동으로 생성자 주입
@ToString
public class ReservationRepositoryImpl implements ReservationRepositoryCustom {


    private final JPAQueryFactory jpaQueryFactory;
    private final ReservationRepository reservationRepository;

    @Override
    public boolean check(ReservationRequest request){
        if (jpaQueryFactory.selectFrom(reservation)
                .where(reservation.center.id.eq(request.getCenterId()),
                        reservation.equipment.id.eq(request.getEquipmentId()),
                        reservation.start.between(request.getStart(),request.getEnd()),
                        reservation.end.between(request.getStart(),request.getStart()))
                .fetch() == null)
            return true;
        return false;
    }
    @Override
    public List<Reservation> getReserve(ReservationRequest request){
        return jpaQueryFactory.selectFrom(reservation)
                .where(reservation.center.id.eq(request.getCenterId()),
                        reservation.equipment.id.eq(request.getEquipmentId()))
                .fetch();
    }

    @Override
    @Transactional
    public void saveReservation(ReservationRequest request){
        Center ct = jpaQueryFactory.selectFrom(center)
                .where(center.id.eq(request.getCenterId())).fetchOne();
        CenterEquipment eq = jpaQueryFactory.selectFrom(centerEquipment)
                .where(centerEquipment.id.eq(request.getEquipmentId())).fetchOne();
        Reservation rv = Reservation.builder()
                .center(ct)
                .equipment(eq)
                .start(request.getStart())
                .end(request.getEnd())
                .build();
        reservationRepository.save(rv);
    }
}
