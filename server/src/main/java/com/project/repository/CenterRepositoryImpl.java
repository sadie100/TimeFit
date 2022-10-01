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
                        goePrice(centerSearch.getMinPrice()),
                        loePrice(centerSearch.getMaxPrice()),
                        eqCity(centerSearch.getRegion()),
                        findEquipment(centerSearch.getEquipmentId(), centerSearch.getMinNumber())
                )
                .groupBy(center.id)
                .limit(centerSearch.getSize())
                .offset(centerSearch.getOffset())
                .orderBy(center.id.desc())
                .fetch();
    }
    private BooleanExpression eqCity(String region){
        if(region == null){
            return null;
        }
        return center.region.eq(region);
    }
    private BooleanExpression goePrice(Integer minPrice){
        if(minPrice == null){
            return null;
        }
        return center.price.goe(minPrice);
    }
        private BooleanExpression loePrice(Integer maxPrice){
        if(maxPrice == null){
            return null;
        }
        return center.price.loe(maxPrice);
    }

    private BooleanExpression findEquipment(Long equipmentId, Integer number){
        if(equipmentId == null){
            return null;
        }
        if(number == null){
            number = 0;
        }
        List<Long> ids =
                jpaQueryFactory.select(centerEquipment.center.id).from(centerEquipment)
                .where(centerEquipment.equipment.id.eq(equipmentId))
                .groupBy(centerEquipment.center,centerEquipment.equipment)
                .having(centerEquipment.equipment.count().goe(number))
                .fetch();
        return center.id.in(ids);
    }
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
    public void updateView(Long itemId){
        jpaQueryFactory.update(center)
                .set(center.view, center.view.add(1))
                .where(center.id.eq(itemId))
                .execute();
    }

}

