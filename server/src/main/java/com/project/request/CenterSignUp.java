package com.project.request;

import com.project.domain.CenterImages;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Setter
@Getter
@ToString
public class CenterSignUp {
    @NotBlank(message = "아이디를 입력해주세요")
    private String email;

    @NotBlank(message = "이름을 입력해주세요")
    private String name;

    @NotBlank(message = "비밀번호를 입력해주세요")
    private String password;

    @NotBlank(message = "도시를 입력해주세요")
    private String city;

    @NotBlank(message = "주소를 입력해주세요")
    private String address;

    @NotBlank(message = "연락처를 입력해주세요")
    private String phoneNumber;

    @NotBlank(message = "사업장등록번호를 입력해주세요")
    private String storeNumber;

    @Builder
    public CenterSignUp(String email, String name, String password,String city, String address, String phoneNumber, String storeNumber) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.city = city;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.storeNumber = storeNumber;
    }
}
