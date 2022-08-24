package com.project.repository;

import com.project.domain.ItemComment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ItemCommentRepository extends JpaRepository<ItemComment, Long>,ItemCommentRepositoryCustom {

}
