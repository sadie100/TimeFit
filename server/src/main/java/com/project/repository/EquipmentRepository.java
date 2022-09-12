package com.project.repository;

import com.project.domain.Center;
import com.project.domain.CenterEquipment;
import com.project.domain.Equipment;
import com.project.request.CenterSearch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//JPARepository를 통해 DB에 접근, 엔티티와 PK를 값으로 가짐
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {


}
