package org.launchcode.escape_room_back_end.controllers;

import jakarta.validation.Valid;
import org.launchcode.escape_room_back_end.models.Room;
import org.launchcode.escape_room_back_end.repositories.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    RoomRepository roomRepository;

    // POST localhost:8080/rooms
    @PostMapping(value = "", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> addNewRoom(@Valid @RequestBody Room room) {
        roomRepository.save(room);
        return new ResponseEntity<>(room, HttpStatus.CREATED);
    }

    // GET localhost:8080/rooms
    @GetMapping("")
    public ResponseEntity<?> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    // GET localhost:8080/rooms/7 (for example)
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getRoomById(@PathVariable int id) throws NoResourceFoundException {
        Room room = roomRepository.findById(id).orElse(null);
        if (room == null) {
            String path = "/rooms/" + id;
            throw new NoResourceFoundException(HttpMethod.GET, path, path);
        }
        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    // DELETE localhost:8080/sessions/42 (for example)
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> deleteRoomById(@PathVariable int id) throws NoResourceFoundException {
        Room room = roomRepository.findById(id).orElse(null);
        if (room == null) {
            String path = "/rooms/" + id;
            throw new NoResourceFoundException(HttpMethod.GET, path, path);
        }
        roomRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
