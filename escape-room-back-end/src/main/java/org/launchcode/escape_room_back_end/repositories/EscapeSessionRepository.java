package org.launchcode.escape_room_back_end.repositories;

import org.launchcode.escape_room_back_end.models.EscapeSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EscapeSessionRepository extends JpaRepository<EscapeSession, Integer> {
}
