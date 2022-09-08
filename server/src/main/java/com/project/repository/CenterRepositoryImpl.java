package com.project.repository;

import com.project.domain.Center;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.project.request.CenterSearch;
import lombok.RequiredArgsConstructor;
import lombok.ToString;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.project.domain.QItem.item;

@RequiredArgsConstructor //자동으로 생성자 주입
@ToString
public class CenterRepositoryImpl implements CenterRepositoryCustom {


    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public List<Center> getList(CenterSearch itemSearch){
        //JPAQueryFactory의 내무 메소드를 통해 페이지 규격 설정
        return jpaQueryFactory
                .selectFrom(item)
                .where(
//                        eqtopNotes(itemSearch.getTopNotes()),
                        eqbrand(itemSearch.getBrand())
//                        search(itemSearch.getSearchKey())
                )
                .limit(itemSearch.getSize())
                .offset(itemSearch.getOffset())
                .orderBy(item.id.desc())
                .fetch();
    }


    private BooleanExpression eqbrand(List<String> brand){
        if(brand == null){
            return null;
        }
        return item.brand.in(brand);
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
        jpaQueryFactory.update(item)
                .set(item.view, item.view.add(1))
                .where(item.id.eq(itemId))
                .execute();

    }

}

