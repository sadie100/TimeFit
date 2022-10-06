package com.project.service;


import com.project.domain.Center;
import com.project.domain.CustomUser;
import com.project.exception.CenterNotFound;
import com.project.exception.UserNotFound;
import com.project.repository.CenterRepository;
import com.project.repository.CustomeUserRepository;
import com.project.request.UserInfoRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j //로그 작성
@Service  //서비스 레이어
@RequiredArgsConstructor  //lombok을 통해 생성자처리
public class UserInfoService {

    private final CustomeUserRepository userRepository;
    private final CenterRepository centerRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;


    public CustomUser get(Long msrl) {
        CustomUser user = userRepository.findById(msrl)
                .orElseThrow(UserNotFound::new);
        return user;
    }

    public CustomUser changePassword(UserInfoRequest request){
        //Long msrl, String Email
        CustomUser user= userRepository.findByEmail(request.getEmail()).orElseThrow(UserNotFound::new);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);
        return user;
    }
    public CustomUser changeCenter(UserInfoRequest request){
        //Long msrl, String Email
        CustomUser user= userRepository.findByEmail(request.getEmail()).orElseThrow(UserNotFound::new);
        Center center = centerRepository.findById(request.getCenterId()).orElseThrow(CenterNotFound::new);
        user.setCenter(center);
        userRepository.save(user);
        return user;
    }

}
