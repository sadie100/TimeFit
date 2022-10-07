package com.project.controller.v1;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.domain.User;
import com.project.repository.UserRepository;
import com.project.request.UserInfoRequest;
import com.project.request.UserSignIn;
import com.project.request.UserSignUp;
import com.project.response.TokenResponse;
import com.project.response.UserInfoResponse;
import com.project.service.SignService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {


    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SignService signService;

    @BeforeEach
    void clean(){
        userRepository.deleteAll();
    }



    @Test
    @DisplayName("로그인된 유저 조회")
    void get1() throws Exception{
        UserSignUp user = UserSignUp
                .builder()
                .email("id@naver.com")
                .password("1234")
                .name("이름")
                .phoneNumber("010-2323-3333")
                .build();
        signService.join(user);
        UserSignIn request = UserSignIn
                .builder()
                .email("id@naver.com")
                .password("1234")
                .build();
        String json = objectMapper.writeValueAsString(request);

        MvcResult result = mockMvc .perform(post("/signin")
                        .contentType(APPLICATION_JSON)
                        .content(json)
                )
                .andExpect(status().isOk())
                .andReturn();

        //reissue
        mockMvc .perform(get("/user")
                        .contentType(APPLICATION_JSON)
                        .cookie(result.getResponse().getCookies()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("이름"))
                .andDo(print());

    }

    @Test
    @DisplayName("비밀번호 변경")
    void changePassword() throws Exception{
        UserSignUp user = UserSignUp
                .builder()
                .email("id@naver.com")
                .password("1234")
                .name("이름")
                .phoneNumber("010-2323-3333")
                .build();
        signService.join(user);

        UserSignIn loginRequest = UserSignIn
                .builder()
                .email("id@naver.com")
                .password("1234")
                .build();
        String json = objectMapper.writeValueAsString(loginRequest);
        //로그인
        MvcResult result = mockMvc .perform(post("/signin")
                        .contentType(APPLICATION_JSON)
                        .content(json)
                )
                .andExpect(status().isOk())
                .andReturn();

        UserInfoRequest infoRequest = UserInfoRequest.builder()
                .email("id@naver.com")
                .password("12345")
                .build();

        String json2 = objectMapper.writeValueAsString(infoRequest);
        mockMvc .perform(post("/user/change-password")
                        .cookie(result.getResponse().getCookies())
                        .contentType(APPLICATION_JSON)
                        .content(json2))
                .andExpect(status().isOk())
                .andDo(print());

        UserSignIn request2 = UserSignIn
                .builder()
                .email("id@naver.com")
                .password("12345")
                .build();

        TokenResponse tokenResponse = signService.signIn(request2);
        assertEquals("Bearer",tokenResponse.getGrantType());

    }

}
