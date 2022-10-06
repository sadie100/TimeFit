package com.project.controller.v1;

import com.project.domain.Center;
import com.project.domain.CustomUser;
import com.project.request.*;
import com.project.response.UserInfoResponse;
import com.project.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class UserController {

    @Autowired
    private final UserInfoService userInfoService;

    @GetMapping("/user/{msrl}")
    public UserInfoResponse getByMsrl(@PathVariable Long msrl) {
        CustomUser user = userInfoService.get(msrl);
        return UserInfoResponse.builder().email(user.getEmail())
                .gender(user.getGender())
                .birth(user.getBirth())
                .name(user.getName())
                .center(user.getCenter())
                .msrl(user.getMsrl())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }

    @GetMapping("/user")
    public UserInfoResponse get(@AuthenticationPrincipal CustomUser customUser) {
        return UserInfoResponse.builder().email(customUser.getEmail())
                .gender(customUser.getGender())
                .birth(customUser.getBirth())
                .name(customUser.getName())
                .center(customUser.getCenter())
                .msrl(customUser.getMsrl())
                .phoneNumber(customUser.getPhoneNumber())
                .build();
    }
    @PostMapping("/user/change-password")
    public UserInfoResponse changePassword(@RequestBody UserInfoRequest userInfoRequest ) {
        CustomUser user = userInfoService.changePassword(userInfoRequest);
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
        CustomUser user = userInfoService.changeCenter(userInfoRequest);
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




