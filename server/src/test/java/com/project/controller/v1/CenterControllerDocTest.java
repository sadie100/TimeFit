package com.project.controller.v1;

import com.project.domain.Center;
import com.project.repository.CenterImgRepository;
import com.project.repository.CenterRepository;
import com.project.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.restdocs.RestDocumentationContextProvider;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.documentationConfiguration;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ExtendWith(RestDocumentationExtension.class)
public class CenterControllerDocTest {
    private MockMvc mockMvc;
    @Autowired
    private CenterRepository centerRepository;
    @Autowired
    private CenterImgRepository centerImgRepository;
    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void clean(){
        centerRepository.deleteAll();
        centerImgRepository.deleteAll();
        userRepository.deleteAll();
    }

    @BeforeEach
    public void setUp(WebApplicationContext webApplicationContext, RestDocumentationContextProvider restDocumentation) {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext)
                .apply(documentationConfiguration(restDocumentation))
                .build();
    }

    @Test
    @DisplayName("센터 조회")
    void test1() throws Exception{
        List<Center> requestCenter = IntStream.range(0,20)
                .mapToObj(i -> Center.builder()
                        .name("센터" +i)
                        .region("서울")
                        .price(i*10000)
                        .build()).collect(Collectors.toList());
        centerRepository.saveAll(requestCenter);

        this.mockMvc.perform(get("/centers")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print())
                .andDo(document("index"));
    }
}
