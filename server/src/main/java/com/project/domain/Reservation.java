package com.project.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Builder
@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PUBLIC)
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name="center_id")
    private Center center;

    @ManyToOne
    @JoinColumn(name="center_equipmentId")
    private CenterEquipment equipment;

    private LocalDateTime start;
    private LocalDateTime end;

}
