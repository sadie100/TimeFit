package com.project.repository;

import com.project.domain.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomeUserRepository extends JpaRepository<CustomUser, Long> {
    Optional<CustomUser> findByEmail(String email);
    Optional<CustomUser> findByPhoneNumber(String phoneNumber);

    Optional<CustomUser> findByKakao(long kakao);
}