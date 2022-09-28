package com.project.controller.v1;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.request.CenterEquipmentAdd;
import com.project.service.EquipmentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;

class EquipmentControllerTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private EquipmentService equipmentService;

    @Test
    void getEquipments() {

    }

    @Test
    void addEquipmentCategory() {
    }

    @Test
    void addCenterEquipment() {
    }

    @Test
    void getCenterEquipments() {
    }
}