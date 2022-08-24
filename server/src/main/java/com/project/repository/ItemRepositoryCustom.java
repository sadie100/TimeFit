package com.project.repository;

import com.project.domain.Item;
import com.project.request.ItemSearch;

import java.util.List;

public interface ItemRepositoryCustom {

    List<Item> getList(ItemSearch itemSearch);
    void updateView(Long itemId);


}
