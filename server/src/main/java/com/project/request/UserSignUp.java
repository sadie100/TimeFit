package com.project.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

@Setter
@Getter
@ToString
public class UserSignUp {
    @NotBlank(message = "아이디를 입력해주세요")
    private String email;

    private String name;

    @NotBlank(message = "비밀번호를 입력해주세요")
    private String password;

    private java.sql.Timestamp birth;

    private String gender;
    @NotBlank(message = "연락처를 입력해주세요")
    private String phoneNumber;

    @Builder
    public UserSignUp(String email, String name, String password, java.sql.Timestamp birth,  String phoneNumber ) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.birth = birth;

    }
}