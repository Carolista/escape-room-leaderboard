package org.launchcode.escape_room_back_end;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// TODO 3: Start this application (run from the back-end project folder so the
//  .env file can be found). Watch the console: does it connect, or do you see
//  a connection error? If it fails, re-check TODO 1 and TODO 2.
//  Once it's running, go back to MySQL Workbench, refresh the schemas panel,
//  and look inside `escape_room`. You should see two tables. Compare their
//  columns to the fields in models/Room.java and models/EscapeSession.java.
//  Do the names match? Look for where Java's camelCase became snake_case,
//  and for any column that's named differently because of an annotation.
@SpringBootApplication
public class EscapeRoomBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(EscapeRoomBackEndApplication.class, args);
	}

}
