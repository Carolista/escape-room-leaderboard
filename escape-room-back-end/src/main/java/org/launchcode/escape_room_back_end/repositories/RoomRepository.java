package org.launchcode.escape_room_back_end.repositories;

import org.launchcode.escape_room_back_end.models.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
}
