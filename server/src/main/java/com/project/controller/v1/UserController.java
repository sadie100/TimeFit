package com.project.controller.v1;

import com.project.domain.Center;
import com.project.domain.User;
import com.project.exception.CookieNotFound;
import com.project.exception.UserExist;
import com.project.request.*;
import com.project.response.CenterSignResponse;
import com.project.response.TokenResponse;
import com.project.response.UserInfoResponse;
import com.project.service.CenterService;
import com.project.service.SignService;
import com.project.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
public class UserController {

    @Autowired
    private final UserInfoService userInfoService;

    @GetMapping("/user")
    public UserInfoResponse get(@AuthenticationPrincipal User user) {
        return UserInfoResponse.builder().email(user.getEmail())
                .gender(user.getGender())
                .birth(user.getBirth())
                .name(user.getName())
                .center(user.getCenter())
                .msrl(user.getMsrl())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    @GetMapping("/user/{msrl}")
    public UserInfoResponse get(@PathVariable Long msrl) {
        User user = userInfoService.get(msrl);
        return UserInfoResponse.builder().email(user.getEmail())
                .gender(user.getGender())
                .birth(user.getBirth())
                .name(user.getName())
                .center(user.getCenter())
                .msrl(user.getMsrl())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }
    @PostMapping("/user/change-password")
    public UserInfoResponse changePassword(@RequestBody UserInfoRequest userInfoRequest ) {
        User user = userInfoService.changePassword(userInfoRequest);
        return UserInfoResponse.builder().email(user.getEmail())
                .gender(user.getGender())
                .birth(user.getBirth())
                .name(user.getName())
                .center(user.getCenter())
                .msrl(user.getMsrl())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    @PostMapping("/user/change-center")
    public UserInfoResponse changeCenter(@RequestBody UserInfoRequest userInfoRequest ) {
        User user = userInfoService.changeCenter(userInfoRequest);
        return UserInfoResponse.builder().email(user.getEmail())
                .gender(user.getGender())
                .birth(user.getBirth())
                .name(user.getName())
                .center(user.getCenter())
                .msrl(user.getMsrl())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

}




