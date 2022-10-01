package com.project.controller.v1;

import com.project.domain.Center;
import com.project.domain.User;
import com.project.exception.CookieNotFound;
import com.project.exception.UserExist;
import com.project.request.*;
import com.project.response.CenterSignResponse;
import com.project.response.TokenResponse;
import com.project.service.CenterService;
import com.project.service.SignService;
import com.project.service.UserInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/user/{msrl}")
    public User get(@PathVariable Long msrl) {
        User user = userInfoService.get(msrl);
        return user;
    }
    @PostMapping("/user/change-password")
    public User changePassword(@RequestBody UserInfoRequest userInfoRequest ) {
        User user = userInfoService.changePassword(userInfoRequest);
        return user;
    }

    @PostMapping("/user/change-center")
    public User changeCenter(@RequestBody UserInfoRequest userInfoRequest ) {
        User user = userInfoService.changeCenter(userInfoRequest);
        return user;
    }

}




