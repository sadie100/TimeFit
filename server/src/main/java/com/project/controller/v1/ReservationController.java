package com.project.controller.v1;

import com.project.request.ReservationRequest;
import com.project.response.ReservationResponse;
import com.project.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController // 결과값을 JSON으로 출력
@RequiredArgsConstructor ////lombok을 통해 생성자처리
public class ReservationController {

        private final ReservationService reservationService;
        @PostMapping("/center/{centerId}/reserve")
        public HashMap<Long,List<ReservationResponse>> requestReserve(@PathVariable Long centerId,
                                                                      @RequestBody ReservationRequest request){
            reservationService.requestReservation(centerId, request);
            return reservationService.getReservation(centerId, request);
        }

        @GetMapping("/center/{centerId}/reserve")
        public HashMap<Long,List<ReservationResponse>> getReservation(@PathVariable Long centerId,
                                                        @ModelAttribute ReservationRequest request){
            return reservationService.getReservation(centerId,request);
        }

        @DeleteMapping("/center/{centerId}/reserve")
        public HashMap<Long,List<ReservationResponse>> cancelReservation(@PathVariable Long centerId,
                                                                         @ModelAttribute ReservationRequest request){
            reservationService.cancelReservation(centerId,request);
            return reservationService.getReservation(centerId,request);
        }
}
