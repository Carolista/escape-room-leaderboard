package org.launchcode.escape_room_back_end.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Objects;

@Entity
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank(message = "Name of room is required")
    @Size(min = 2, max = 50, message = "Name must be 2-50 characters long.")
    private String name;

    @NotBlank(message = "First description of room is required")
    @Column(name = "desc_1")
    private String desc1;

    @NotBlank(message = "Second description of room is required")
    @Column(name = "desc_2")
    private String desc2;

    @NotBlank(message = "Tagline is required")
    private String tagline;

    @NotBlank(message = "Image filepath is required")
    private String image;

    @NotBlank(message = "Alt text for image is required")
    private String alt;

    public Room() {
    }

    public Room(String name, String desc1, String desc2, String tagline, String image, String alt) {
        this.name = name;
        this.desc1 = desc1;
        this.desc2 = desc2;
        this.tagline = tagline;
        this.image = image;
        this.alt = alt;
    }

    public int getId() {
        return id;
    }

    public @NotBlank(message = "Name of room is required") @Size(min = 2, max = 50, message = "Name must be 2-50 characters long.") String getName() {
        return name;
    }

    public void setName(@NotBlank(message = "Name of room is required") @Size(min = 2, max = 50, message = "Name must be 2-50 characters long.") String name) {
        this.name = name;
    }

    public String getDesc1() {
        return desc1;
    }

    public void setDesc1(String desc1) {
        this.desc1 = desc1;
    }

    public String getDesc2() {
        return desc2;
    }

    public void setDesc2(String desc2) {
        this.desc2 = desc2;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    @Override
    public String toString() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Room room = (Room) o;
        return id == room.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
