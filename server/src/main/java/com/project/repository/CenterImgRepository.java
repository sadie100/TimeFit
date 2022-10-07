package com.project.repository;

import com.project.domain.Center;
import com.project.domain.CenterImages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CenterImgRepository extends JpaRepository<CenterImages, Long> {
    List<CenterImages> findBycenter(Center center);

}
