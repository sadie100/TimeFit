package com.project.response;

import com.project.domain.Note;

public class ItemNotesList {

    private final String name;
    private final String img;

    public ItemNotesList(Note note){
        this.name = note.getName();
        this.img = note.getImg();
    }
}
