package com.project.request;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

import static java.lang.Math.max;
import static java.lang.Math.min;

//페이지서치를 위한 클래스 구현
@Getter //getter, setter 사용
@Setter
public class CenterSearch {

    private static final int MAX_SIZE = 2000;


    private Integer page;
    private Integer size;
    private String name;
    private String region;
    private Integer minPrice;
    private Integer maxPrice;

    private Long equipmentId;
    private Integer minNumber;

    private List<String> searchKey;


    @Builder
    public CenterSearch(Integer page, Integer size,String name, String region,Integer maxPrice, Integer minPrice,
                        Long equipmentId, Integer minNumber, List<String> searchKey) {
        this.page = page == null ? 1 : page;
        this.size = size == null ? 10 :size;
        this.name = name;
        this.region = region;
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
        this.equipmentId = equipmentId;
        this.minNumber = minNumber;
        this.searchKey = searchKey;
    }

    public long getOffset(){
        //페이지 0이 요청될 시 1페이지 반환
        return (long) (max(1,page) - 1) * min(size,MAX_SIZE);
    }

}
