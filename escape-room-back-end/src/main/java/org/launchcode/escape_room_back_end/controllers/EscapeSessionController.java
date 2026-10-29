package org.launchcode.escape_room_back_end.controllers;

import jakarta.validation.Valid;
import org.launchcode.escape_room_back_end.models.EscapeSession;
import org.launchcode.escape_room_back_end.repositories.EscapeSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;

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

    // GET localhost:8080/sessions
    @GetMapping("")
    public ResponseEntity<?> getAllEscapeSessions() {
        List<EscapeSession> sessions = escapeSessionRepository.findAll();
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }

    // GET localhost:8080/sessions/42 (for example)
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getEscapeSessionById(@PathVariable int id) throws NoResourceFoundException {
        EscapeSession session = escapeSessionRepository.findById(id).orElse(null);
        if (session == null) {
            String path = "/session/" + id;
            throw new NoResourceFoundException(HttpMethod.GET, path, path);
        }
        return new ResponseEntity<>(session, HttpStatus.OK);
    }

    // DELETE localhost:8080/sessions/42 (for example)
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteEscapeSessionById(@PathVariable int id) throws NoResourceFoundException {
        EscapeSession session = escapeSessionRepository.findById(id).orElse(null);
        if (session == null) {
            String path = "/session/" + id;
            throw new NoResourceFoundException(HttpMethod.GET, path, path);
        }
        escapeSessionRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
