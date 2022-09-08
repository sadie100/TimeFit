package com.project.repository;

import com.project.domain.Center;
import org.springframework.data.jpa.repository.JpaRepository;

//JPARepository를 통해 DB에 접근, 엔티티와 PK를 값으로 가짐
public interface CenterRepository extends JpaRepository<Center, Long>, CenterRepositoryCustom {


}
