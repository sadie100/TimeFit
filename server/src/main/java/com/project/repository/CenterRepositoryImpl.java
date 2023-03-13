package com.project.repository;

import com.project.domain.Center;
import com.project.domain.CenterEquipment;
import com.project.domain.QCenter;
import com.project.domain.QCenterEquipment;
import com.project.response.CenterEquipmentNumber;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.project.request.CenterSearch;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.project.domain.QCenter.center;
import static com.project.domain.QCenterEquipment.centerEquipment;


@RequiredArgsConstructor //자동으로 생성자 주입
@ToString
public class CenterRepositoryImpl implements CenterRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public List<Center> getList(CenterSearch centerSearch){
        //JPAQueryFactory의 내무 메소드를 통해 페이지 규격 설정
        return jpaQueryFactory
                .selectFrom(center)
                .where(
                        containsName(centerSearch.getName()),
                        goePrice(centerSearch.getMinPrice()),
                        loePrice(centerSearch.getMaxPrice()),
                        eqRegion(centerSearch.getRegion()),
                        findEquipment(centerSearch.getEquipmentId(), centerSearch.getMinNumber())
                )
                .groupBy(center.id)
                .limit(centerSearch.getSize())
                .offset(centerSearch.getOffset())
                .orderBy(center.id.desc())
                .fetch();
    }
    // 동적 쿼리 처리를 위한 BooleanExpression
    private BooleanExpression containsName(String name){
        if(name == null) return null;
        return center.name.contains(name);
    }
    private BooleanExpression eqRegion(String region){
        if(region == null) return null;
        return center.region.eq(region);
    }
    private BooleanExpression goePrice(Integer minPrice){
        if(minPrice == null) return null;
        return center.price.goe(minPrice);
    }
    private BooleanExpression loePrice(Integer maxPrice){
        if(maxPrice == null) return null;
        return center.price.loe(maxPrice);
    }
    //헬스 기구의 개수 이상인 헬스장의 ID 리스트를 리턴하도록 함
    private BooleanExpression findEquipment(Long equipmentId, Integer number){
        if(equipmentId == null) return null;
        if(number == null) number = 0;
        List<Long> ids =
                jpaQueryFactory.select(centerEquipment.center.id).from(centerEquipment)
                .where(centerEquipment.equipment.id.eq(equipmentId))
                .groupBy(centerEquipment.center,centerEquipment.equipment)
                .having(centerEquipment.equipment.count().goe(number))
                .fetch();
        return center.id.in(ids);
    }
    //DTO에 알맞게 결과를 출력하도록 Projection.constructor를 통해 처리
    @Override
    public List<CenterEquipmentNumber> getEquipNumber(Long centerId){
         return jpaQueryFactory.select(Projections.constructor(CenterEquipmentNumber.class,
                 centerEquipment.equipment.name.as("equipment"),
                         centerEquipment.equipment.count().as("number")))
                .from(centerEquipment)
                .where(centerEquipment.center.id.eq(centerId))
                .groupBy(centerEquipment.equipment)
                .fetch();
    }

    @Override
    @Transactional
    public void updateView(Long centerId){
        jpaQueryFactory.update(center)
                .set(center.view, center.view.add(1))
                .where(center.id.eq(centerId))
                .execute();
    }
    @Override
    public Center findByIdFetchJoin(Long id){
        return jpaQueryFactory.selectFrom(center).where(center.id.eq(id)).fetchOne();
    }

}

