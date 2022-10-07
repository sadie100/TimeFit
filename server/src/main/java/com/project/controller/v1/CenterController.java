package com.project.controller.v1;


import com.project.domain.Center;
import com.project.request.CenterInfo;
import com.project.request.CenterSearch;
import com.project.request.ReservationRequest;
import com.project.response.CenterDetailResponse;
import com.project.response.CenterResponse;
import com.project.response.ReservationResponse;
import com.project.service.CenterService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController // 결과값을 JSON으로 출력
@RequiredArgsConstructor ////lombok을 통해 생성자처리
public class CenterController {

    private final CenterService centerService;

    @GetMapping("/centers")
    public List<CenterResponse> getList(@ModelAttribute CenterSearch centerSearch){
        return centerService.getList(centerSearch);
    }

    @GetMapping("/centers/{centerId}")
    public CenterDetailResponse get(@PathVariable Long centerId){
        centerService.updateView(centerId);
        return centerService.get(centerId);
    }

    @GetMapping("/get-centers")
    public List<Center> getCenterId(){
        return centerService.findAllCenter();
    }

    @PostMapping("/center/update")
    public void update(@RequestBody CenterInfo request){
        centerService.update(request);
    }
}
