package com.project.response;

import com.project.domain.Center;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;


@Getter
public class CenterDetailResponse {

    private final Long id;
    private final String name;

    private List<CenterImgResponse> images;

    private final int view;

//    private List<ItemNotesList> notes;

    public CenterDetailResponse(Center item) {
        this.id = item.getId();
        this.name = item.getName();

        this.images = item.getImages().stream()
                .map(CenterImgResponse::new)
                .collect(Collectors.toList());
        this.view = item.getView();

//        this.notes = item.getTmpNotes().stream()
//                .map(ItemNotesList::new)
//                .collect(Collectors.toList());
    }
}
