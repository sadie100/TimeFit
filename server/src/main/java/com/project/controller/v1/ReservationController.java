package com.project.controller.v1;

import com.project.request.ReservationRequest;
import com.project.response.ReservationResponse;
import com.project.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController // 결과값을 JSON으로 출력
@RequiredArgsConstructor ////lombok을 통해 생성자처리
public class ReservationController {

        private final ReservationService reservationService;
        @PostMapping("/centers/{centerId}")
        public List<ReservationResponse> requestReserve(@ModelAttribute ReservationRequest reservationRequest,
                                   @ModelAttribute ReservationRequest request){
            reservationService.requestReservation(request);
            return reservationService.getReservation(request);
        }

        @GetMapping("/center/{centerId}")
        public List<ReservationResponse> getReservation(@PathVariable Long centerId,
                                                        @ModelAttribute ReservationRequest request){
            return reservationService.getReservation(request);
        }
}
