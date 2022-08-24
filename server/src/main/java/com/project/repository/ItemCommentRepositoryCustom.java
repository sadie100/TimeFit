package com.project.repository;

import com.project.domain.ItemComment;

import java.util.List;

public interface ItemCommentRepositoryCustom {
    List<ItemComment> getComment(Long itemId);


}
