package com.project.repository;

import com.project.domain.Center;
import com.project.domain.CenterEquipment;
import com.project.domain.User;
import com.project.request.CenterSearch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CenterEquipmentRepository extends JpaRepository<CenterEquipment, Long> {


    List<CenterEquipment> findByCenter(Center center);

}
