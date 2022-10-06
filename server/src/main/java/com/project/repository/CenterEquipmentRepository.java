package com.project.repository;

import com.project.domain.Center;
import com.project.domain.CenterEquipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CenterEquipmentRepository extends JpaRepository<CenterEquipment, Long> {


    List<CenterEquipment> findByCenter(Center center);

}
