package com.project.repository;

import com.project.domain.Center;
import com.project.domain.QCenter;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.project.request.CenterSearch;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.project.domain.QCenter.center;


@RequiredArgsConstructor //자동으로 생성자 주입
@ToString
public class CenterRepositoryImpl implements CenterRepositoryCustom {


    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public List<Center> getList(CenterSearch itemSearch){
        //JPAQueryFactory의 내무 메소드를 통해 페이지 규격 설정
        return jpaQueryFactory
                .selectFrom(center)
                .where(
//                        eqtopNotes(itemSearch.getTopNotes()),
//                        search(itemSearch.getSearchKey())
                )
                .limit(itemSearch.getSize())
                .offset(itemSearch.getOffset())
                .orderBy(center.id.desc())
                .fetch();
    }




//    private BooleanExpression goeMinPrice(Integer minPrice){
//        if(minPrice == null){
//            return null;
//        }
//        return item.minPrice.goe(minPrice);
//    }
    //    private BooleanExpression loeMinPrice(Integer minPrice){
//        if(minPrice == null){
//            return null;
//        }
//        return item.minPrice.loe(minPrice);
//    }
    @Override
    @Transactional
    public void updateView(Long itemId){
        jpaQueryFactory.update(center)
                .set(center.view, center.view.add(1))
                .where(center.id.eq(itemId))
                .execute();

    }

}

