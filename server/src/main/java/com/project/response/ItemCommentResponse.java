package com.project.response;

import com.project.domain.ItemComment;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Getter
public class ItemCommentResponse {
    private Long id;
    private String comment;
    private String createdDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));

    private String modifiedDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm"));
    private String email;
    private Long itemId;

    private List<ItemCommentResponse> children = new ArrayList<>();


   public ItemCommentResponse(ItemComment itemComment){
       this.id = itemComment.getId();
       this.comment = itemComment.getComment();
       this.createdDate = itemComment.getCreatedDate();
       this.modifiedDate =itemComment.getModifiedDate();
       this.email = itemComment.getUser().getEmail();
       this.itemId = itemComment.getItem().getId();
   }

}
