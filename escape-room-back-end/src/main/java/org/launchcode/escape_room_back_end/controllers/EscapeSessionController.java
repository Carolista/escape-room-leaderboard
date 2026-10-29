package org.launchcode.escape_room_back_end.controllers;

import jakarta.validation.Valid;
import org.launchcode.escape_room_back_end.models.EscapeSession;
import org.launchcode.escape_room_back_end.repositories.EscapeSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sessions")
public class EscapeSessionController {

    @Autowired
    EscapeSessionRepository escapeSessionRepository;

    // POST localhost:8080/sessions
    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewEscapeSession(@Valid @RequestBody EscapeSession session) {
        escapeSessionRepository.save(session);
        return new ResponseEntity<>(session, HttpStatus.CREATED);
    }

}
