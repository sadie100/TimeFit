package com.project.controller.v1;

import com.project.request.ReservationRequest;
import com.project.request.ReservationSearch;
import com.project.response.ReservationResponse;
import com.project.response.TempResponse;
import com.project.service.ReservationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController // 결과값을 JSON으로 출력
@RequiredArgsConstructor ////lombok을 통해 생성자처리
public class ReservationController {

        private final ReservationService reservationService;
        @PostMapping("/center/{centerId}/reserve")
        public void requestReserve(@PathVariable Long centerId,
                                                                  @RequestBody ReservationRequest request){
//            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            reservationService.requestReservation(centerId, request);
        }

        @GetMapping("/center/{centerId}/reserve")
        public List<ReservationResponse> getReservation(@PathVariable Long centerId,
                                                        @RequestBody ReservationSearch request){
            return reservationService.getReservation(centerId,request);
        }

        @DeleteMapping("/center/{centerId}/reserve/{reservationId}")
        public void cancelReservation(@PathVariable Long centerId, @PathVariable Long reservationId){
            reservationService.cancelReservation(centerId,reservationId);
        }
}
