package com.project.repository;

import com.project.domain.Center;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//JPARepository를 통해 DB에 접근, 엔티티와 PK를 값으로 가짐
public interface CenterRepository extends JpaRepository<Center, Long>, CenterRepositoryCustom {

    Optional<Center> findByName(String name);

}
