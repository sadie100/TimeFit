package com.project.controller.v1;


import com.project.request.CenterSearch;
import com.project.response.CenterDetailResponse;
import com.project.response.CenterImgResponse;
import com.project.response.CenterResponse;
import com.project.service.CenterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RestController // 결과값을 JSON으로 출력
@RequiredArgsConstructor ////lombok을 통해 생성자처리
public class ItemController {

    private final CenterService itemService;

    @GetMapping("/items")
    public List<CenterResponse> getList(@ModelAttribute CenterSearch itemSearch){
        return itemService.getList(itemSearch);
    }

    @GetMapping("/items/{itemId}")
    public CenterDetailResponse get(@PathVariable Long itemId){
        itemService.updateView(itemId);
        return itemService.get(itemId);
    }
    @GetMapping("/items/{itemId}/img")
    public List<CenterImgResponse> getImg(@PathVariable Long itemId){
        return itemService.getImg(itemId);
    }
    @GetMapping("/items/{itemId}/comments") //User
    public List<ItemCommentResponse> getComment(@PathVariable Long itemId){
        return itemService.getComment(itemId);
    }
    @PostMapping("/items/{itemId}/comments") //User
    public ResponseEntity commentSave(@PathVariable Long id, @RequestBody ItemCommentCreate create){
        return ResponseEntity.ok(itemService.write(id,create));
    }

    @PatchMapping("/items/{itemId}/comments/{id}")
    public void editComment(@PathVariable Long id, @RequestBody @Valid ItemCommentCreate edit){
        itemService.commentEdit(id,edit);
    }
    @DeleteMapping("/items/{itemId}/comments/{id}")
    public ResponseEntity commentDelete(@PathVariable Long id){
        itemService.commentDelete(id);
        return ResponseEntity.ok(id);
    }
}
