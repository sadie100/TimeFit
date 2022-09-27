package com.project.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Builder
@Getter
@Setter
public class ReservationSearch {

    private final List<Long> searchIds;
    private final LocalDate searchDate;

}
