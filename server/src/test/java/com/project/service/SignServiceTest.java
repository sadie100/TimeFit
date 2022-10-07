package com.project.service;

import com.project.domain.User;
import com.project.repository.UserRepository;
import com.project.request.TokenRequest;
import com.project.request.UserSignIn;
import com.project.request.UserSignUp;
import com.project.response.TokenResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Collections;

@SpringBootTest
class SignServiceTest {

    @Autowired
    private SignService signService;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void clean(){
        userRepository.deleteAll();
    }
    @Test
    @DisplayName("회원 가입")
    void join() {
        UserSignUp user = UserSignUp
                .builder()
                .email("id@naver.com")
                .password("1234")
                .phoneNumber("010-3333-3333")
                .name("이름")
                .build();
        signService.join(user);
        Assertions.assertEquals(1, userRepository.count());

    }
    @Test
    @DisplayName("로그인")
    void signIn() {
        UserSignUp user = UserSignUp
                .builder()
                .email("id@naver.com")
                .password("1234")
                .phoneNumber("010-3398-1830")
                .name("이름")
                .build();
        signService.join(user);
        UserSignIn request = UserSignIn
                .builder()
                .email("id@naver.com")
                .password("1234")
                .build();
        TokenResponse tokenResponse = signService.signIn(request);
        Assertions.assertNotNull(tokenResponse.getAccessToken());
        Assertions.assertNotNull(tokenResponse.getRefreshToken());

    }
    @Test
    void reissue() {
        UserSignUp user = UserSignUp
                .builder()
                .email("id@naver.com")
                .password("1234")
                .phoneNumber("0103333333")
                .name("이름")
                .build();
        signService.join(user);
        UserSignIn request = UserSignIn
                .builder()
                .email("id@naver.com")
                .password("1234")
                .build();
        TokenResponse tokenResponse = signService.signIn(request);
        TokenResponse reissuedTokenResponse = signService.reissue(
                TokenRequest.builder()
                        .accessToken(tokenResponse.getAccessToken())
                        .refreshToken(tokenResponse.getRefreshToken())
                        .build());
        System.out.println(reissuedTokenResponse.getAccessToken());
        System.out.println(tokenResponse.getAccessToken());

//        Assertions.assertNotEquals(reissuedTokenResponse.getAccessToken(),tokenResponse.getAccessToken());
        Assertions.assertNotNull(reissuedTokenResponse.getAccessToken());
        Assertions.assertNotNull(reissuedTokenResponse.getRefreshToken());

    }
}