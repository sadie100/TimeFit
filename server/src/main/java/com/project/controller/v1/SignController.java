package com.project.controller.v1;

import com.project.domain.User;
import com.project.exception.CookieNotFoundException;
import com.project.request.CenterSignUp;
import com.project.request.TokenRequest;
import com.project.request.UserSignIn;
import com.project.request.UserSignUp;
import com.project.response.CommonResult;
import com.project.response.TokenResponse;
import com.project.service.ResponseService;
import com.project.response.SingleResult;
import com.project.service.SignService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import com.project.exception.UserExistException;

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
    public CommonResult signUp(@RequestBody @Valid UserSignUp request) {
//        request.setPassword(passwordEncoder.encode(request.getPassword()));
        signService.join(request);
        return responseService.getSuccessResult();
    }

    @PostMapping("/signup")
    public CommonResult signUp(@RequestBody @Valid CenterSignUp request) {
//        request.setPassword(passwordEncoder.encode(request.getPassword()));
        signService.join(request);
        return responseService.getSuccessResult();
    }


    @GetMapping("/signup/check-email")
    public CommonResult checkEmail(@RequestParam String email) {
//        request.setPassword(passwordEncoder.encode(request.getPassword()));
        System.out.println(email);
        Optional<User> user =signService.getByEmail(email);
        System.out.println(user);
        if(user.isEmpty()==false) throw new UserExistException("이메일이 중복되었습니다");
        //1. 인증번호 전송 로직
        //2. 인증번호 받기
        //3. 인증 처리
        return responseService.getSuccessResult();
    }


    @PostMapping("/signup/{provider}")
    public CommonResult signupProvider( @PathVariable String provider,
                                        @RequestParam String accessToken,
                                        @RequestParam String name) {
        signService.joinByKakao(provider, accessToken, name);
        return responseService.getSuccessResult();
    }

    @PostMapping("/signin")
    public SingleResult<TokenResponse> signIn(@RequestBody @Valid UserSignIn request, HttpServletResponse response) {
        System.out.println("로그인을 시도");
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

        return responseService.
                getSingleResult(tokenResponse);
        //        response.setHeader("X-AUTH-TOKEN", tokenResponse.getAccessToken());
        //        Cookie cookie = new Cookie("X-AUTH-TOKEN", tokenResponse.getAccessToken());
    }

    @PostMapping("/signout")
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

    @GetMapping("/reissue")
    public CommonResult reissue(HttpServletRequest request, HttpServletResponse response) {
        String RefreshToken = null;
        Cookie cookie = WebUtils.getCookie(request, "RefreshToken");
        if(cookie == null)  throw new CookieNotFoundException("쿠키가 존재하지 않습니다");

        RefreshToken = cookie.getValue();
        TokenResponse tokenResponse = signService.reissue(TokenRequest.builder().refreshToken(RefreshToken).build());
        Cookie accessCookie = new Cookie("AccessToken", tokenResponse.getAccessToken());
        accessCookie.setPath("/");
        response.addCookie(accessCookie);
//        Cookie refreshCookie = new Cookie("RefreshToken", tokenResponse.getRefreshToken());
//        refreshCookie.setPath("/");
//        response.addCookie(refreshCookie);
        return responseService.getSuccessResult();
    }


    @PostMapping("/signin/{provider}")
    public SingleResult<TokenResponse> signInByProvider(
            @PathVariable String provider,
            @RequestParam String socialToken,
            HttpServletResponse response) {
        TokenResponse tokenResponse = signService.signInByKakao(provider,socialToken);

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
    public CommonResult findEmail(@RequestParam String phoneNumber) {
        Optional<User> user = signService.getByPhoneNumner(phoneNumber);
        return responseService.getSuccessResult();
    }
    @GetMapping("/signin/find-password")
    public CommonResult findPassword(@RequestParam String email) {
        Optional<User> user = signService.getByEmail(email);
        return responseService.getSuccessResult();
    }

}




