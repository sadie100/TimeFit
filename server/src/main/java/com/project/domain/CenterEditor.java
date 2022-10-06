package com.project.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CenterEditor {
    private String name;
    private String region;
    private String address;
    private Integer price;

    private String phoneNumber;

    @Builder
    public CenterEditor(String name, String region, String address, Integer price, String phoneNumber) {
        this.name = name;
        this.region = region;
        this.address = address;
        this.price = price;
        this.phoneNumber = phoneNumber;
    }
}