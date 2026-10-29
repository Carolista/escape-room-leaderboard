package org.launchcode.escape_room_back_end.controllers;

import org.launchcode.escape_room_back_end.repositories.EscapeSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sessions")
public class EscapeSessionController {

    @Autowired
    EscapeSessionRepository escapeSessionRepository;

}
