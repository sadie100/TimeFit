package com.project.repository;

import com.project.domain.*;
import com.project.request.ReservationRequest;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static com.project.domain.QCenter.center;
import static com.project.domain.QCenterEquipment.centerEquipment;
import static com.project.domain.QReservation.reservation;

@RequiredArgsConstructor //자동으로 생성자 주입
@ToString
public class ReservationRepositoryImpl implements ReservationRepositoryCustom {


    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public boolean check(Long id, ReservationRequest request){
        if (jpaQueryFactory.selectFrom(reservation)
                .where(reservation.center.id.eq(id),
                        reservation.centerEquipment.id.eq(request.getCenterEquipmentId()),
                        reservation.start.between(request.getStart(),request.getEnd())
                                .or(reservation.end.between(request.getStart(),request.getStart()))                        )
                .fetch().size() == 0)
            return true;
        return false;
    }
    @Override
    public List<Reservation> getReserve(Long id, LocalDate date, Long equipment){

        LocalDate now = LocalDate.now();
        if(date != null){
            now = date;
        }
        LocalDateTime st = LocalDateTime.parse(now+"T00:00:00");
        LocalDateTime end = LocalDateTime.parse(now+"T23:59:59");
        return jpaQueryFactory.selectFrom(reservation)
                .where(reservation.center.id.eq(id),
                        reservation.centerEquipment.id.eq(equipment),
                        reservation.start.between(st,end))
                .orderBy(reservation.start.asc())
                .fetch();
    }

//    @Override
//    @Transactional
//    public void saveReservation(Long id, ReservationRequest request){
//        Center ct = jpaQueryFactory.selectFrom(center)
//                .where(center.id.eq(id)).fetchOne();
//        CenterEquipment eq = jpaQueryFactory.selectFrom(centerEquipment)
//                .where(centerEquipment.id.eq(request.getEquipmentId())).fetchOne();
//        Reservation rv = Reservation.builder()
//                .center(ct)
//                .equipment(eq)
//                .start(request.getStart())
//                .end(request.getEnd())
//                .build();
////        reservationRepository.save(rv);
//    }
}
