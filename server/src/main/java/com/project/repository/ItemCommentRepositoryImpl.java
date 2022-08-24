package com.project.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.project.domain.ItemComment;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.util.List;

import static com.project.domain.QItemComment.itemComment;


@RequiredArgsConstructor //자동으로 생성자 주입
@ToString
public class ItemCommentRepositoryImpl implements ItemCommentRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public List<ItemComment> getComment(Long itemId){
        return jpaQueryFactory
                .selectFrom(itemComment)
                .leftJoin(itemComment.parent)
                .fetchJoin()
                .where(itemComment.item.id.eq(itemId))
                .orderBy(
                        itemComment.parent.id.asc().nullsFirst(),
                        itemComment.createdDate.asc()
                ).fetch();
    };

}
