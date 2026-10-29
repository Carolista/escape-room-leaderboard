package org.launchcode.escape_room_back_end.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.Objects;

@Entity
public class EscapeSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Team name is required.")
    private String teamName;

    @NotBlank(message = "Room is required.")
    private String room;

    @NotNull(message = "Start time is required.")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private OffsetDateTime startTime;

    @NotNull(message = "End time is required.")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSX")
    private OffsetDateTime endTime;

    private double minutesToSolve;
    private boolean successful;

    public EscapeSession() {
    }

    public EscapeSession(String teamName, String room, OffsetDateTime startTime, OffsetDateTime endTime) {
        this.teamName = teamName;
        this.room = room;
        this.startTime = startTime;
        this.endTime = endTime;
        this.minutesToSolve = calculateSolveTime();
        this.successful = this.minutesToSolve <= 60;
    }

    public int getId() {
        return id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public OffsetDateTime getStartTime() {
        return startTime;
    }

    public OffsetDateTime getEndTime() {
        return endTime;
    }

    public double getMinutesToSolve() {
        return minutesToSolve;
    }

    @JsonProperty("successful")
    public boolean wasSuccessful() {
        return successful;
    }

    @Override
    public String toString() {
        return teamName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass())
            return false;
        EscapeSession that = (EscapeSession) o;
        return id == that.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    // I went down a rabbit hole and learned a few things!
    private double calculateSolveTime() {
        Duration duration = Duration.between(startTime, endTime);
        double rawMinutes = duration.toMillis() / 60000.0;
        return BigDecimal.valueOf(rawMinutes).setScale(3, RoundingMode.HALF_UP).doubleValue();
    }
}
