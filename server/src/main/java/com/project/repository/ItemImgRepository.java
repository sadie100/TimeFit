package com.project.repository;

import com.project.domain.Item;
import com.project.domain.ItemImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemImgRepository extends JpaRepository<ItemImages, Long> {
    List<ItemImages> findByItem(Item item);
}
