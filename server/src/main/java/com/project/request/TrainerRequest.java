package com.project.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class TrainerRequest {
    private String name;

    private String gender;
    @Builder
    public TrainerRequest(String name, String gender) {
        this.name = name;
        this.gender = gender;
    }
}
