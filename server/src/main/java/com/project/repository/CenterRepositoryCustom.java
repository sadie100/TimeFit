package com.project.repository;

import com.project.domain.Center;
import com.project.request.CenterSearch;

import java.util.List;

public interface CenterRepositoryCustom {

    List<Center> getList(CenterSearch itemSearch);
    void updateView(Long itemId);


}
