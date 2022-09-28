package com.project.controller.v1;

import com.project.domain.User;
import com.project.exception.CookieNotFound;
import com.project.request.*;
import com.project.response.CommonResult;
import com.project.response.TokenResponse;
import com.project.service.ResponseService;
import com.project.response.SingleResult;
import com.project.service.SignService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import com.project.exception.UserExist;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
public class SignController {

    @Autowired
    private final ResponseService responseService;
    private final SignService signService;


    @PostMapping("/signup")
    public void signUp(@RequestBody @Valid UserSignUp request) {
//        request.setPassword(passwordEncoder.encode(request.getPassword()));
        signService.join(request);
        return;
    }


    @PostMapping("/signup-center")
    public void signUpCenter(@RequestBody @Valid CenterSignUp request) {
        System.out.println(request);
//        request.setPassword(passwordEncoder.encode(request.getPassword()));
        signService.joinCenter(request);
        return ;
    }

    @PostMapping("/signin")
    public TokenResponse signIn(@RequestBody @Valid UserSignIn request, HttpServletResponse response) {
        //Access Token, RefreshToken 발행
        TokenResponse tokenResponse = signService.signIn(request);
        Cookie accessCookie = new Cookie("AccessToken", tokenResponse.getAccessToken());
        accessCookie.setPath("/");
        //테스트를 위해 잠시 주석 처리
//         accessCookie.setHttpOnly(true);
//         accessCookie.setSecure(true);
        response.addCookie(accessCookie);
        Cookie resfreshCookie = new Cookie("RefreshToken", tokenResponse.getRefreshToken());
        resfreshCookie.setPath("/");
//        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
        response.addCookie(resfreshCookie);
        return tokenResponse;
    }

    @GetMapping("/signout")
    public CommonResult signOut(HttpServletResponse response){
//        Cookie cookie = new Cookie("X-AUTH-TOKEN", null);
        Cookie cookie = new Cookie("AccessToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        response.addCookie(cookie);
        return responseService.getSuccessResult();
    }

    @GetMapping("/signup/check-email")
    public void checkEmail(@RequestParam String email) {
//        request.setPassword(passwordEncoder.encode(request.getPassword()));
        System.out.println(email);
        Optional<User> user =signService.getByEmail(email);
        System.out.println(user);
        if(user.isEmpty()==false) throw new UserExist();
        //1. 인증번호 전송 로직
        //2. 인증번호 받기
        //3. 인증 처리
        return ;
    }

    @GetMapping("/signup/check-storeNumber")
    public void tempCheck(@RequestParam String number) {
        return ;
    }

    @GetMapping("/reissue")
    public void reissue(HttpServletRequest request, HttpServletResponse response) {
        String RefreshToken = null;
        Cookie cookie = WebUtils.getCookie(request, "RefreshToken");
        if(cookie == null)  throw new CookieNotFound();
        RefreshToken = cookie.getValue();
        TokenResponse tokenResponse = signService.reissue(TokenRequest.builder().refreshToken(RefreshToken).build());
        Cookie accessCookie = new Cookie("AccessToken", tokenResponse.getAccessToken());
        accessCookie.setPath("/");
        response.addCookie(accessCookie);
//        Cookie refreshCookie = new Cookie("RefreshToken", tokenResponse.getRefreshToken());
//        refreshCookie.setPath("/");
//        response.addCookie(refreshCookie);
        return;
    }

    @PostMapping("/signin/kakao")
    public SingleResult<TokenResponse> signInByProvider(
            @RequestParam String socialToken,
            HttpServletResponse response) {
        TokenResponse tokenResponse = signService.signInByKakao(socialToken);
//        response.setHeader("Set-Cookie", String.format("AccessToken=%s; Secure; SameSite=None",tokenResponse.getAccessToken()));
//        response.addHeader("Set-Cookie", String.format("RefreshToken=%s; Secure; SameSite=None",tokenResponse.getRefreshToken()));
        Cookie accessCookie = new Cookie("AccessToken", tokenResponse.getAccessToken());
        accessCookie.setPath("/");
////        accessCookie.setHttpOnly(true);
////        accessCookie.setSecure(true);
        response.addCookie(accessCookie);
        Cookie refreshCookie = new Cookie("RefreshToken", tokenResponse.getAccessToken());
        refreshCookie.setPath("/");
//        cookie.setHttpOnly(true);
//        cookie.setSecure(true);
        response.addCookie(refreshCookie);
        return responseService.
                getSingleResult(tokenResponse);
    }

    @GetMapping("/signin/find-email")
    public String findEmail(@RequestParam String phoneNumber) {
        User user = signService.getByPhoneNumber(phoneNumber).orElseThrow();
        return user.getEmail();
    }

    @GetMapping("/signin/find-password")
    public String findPassword(@RequestParam String email) {
        String password = signService.makeNewPassword(email);
        return password;
    }


    @PostMapping("/signup/add-trainer")
    public void addTrainer(Long centerId) {

    }

}




