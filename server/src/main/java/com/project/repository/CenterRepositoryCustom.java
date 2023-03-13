package com.project.repository;

import com.project.domain.Center;
import com.project.request.CenterSearch;
import com.project.response.CenterEquipmentNumber;
import com.querydsl.core.Tuple;

import java.util.List;
import java.util.Optional;

public interface CenterRepositoryCustom {

    List<Center> getList(CenterSearch centerSearch);
    List<CenterEquipmentNumber> getEquipNumber(Long centerId);
    void updateView(Long centerId);

    Center findByIdFetchJoin(Long id);

}
