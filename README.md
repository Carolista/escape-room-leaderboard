# Escape Room Leaderboard

## The Point of This Assignment

So far you've built React apps that work with data you wrote yourself. Real apps get their data from somewhere else, so in this assignment you'll connect a React front end to a **real back end and database** and replace hard-coded mock data with data fetched over HTTP.

Along the way you'll practice:

- Setting up a **MySQL database** and connecting a **Spring Boot** app to it with environment variables
- Using **`fetch()`** and **`useEffect()`** to load data when a component mounts
- Managing **loading** and **error** states so users aren't left guessing
- **Lifting state up** to the nearest common ancestor when several components need the same data
- Passing data down through **props**

## What You're Building

This is the website for _Escape Artists_, a (fictional) programmer-themed escape room. It has three pages that use data:

| Page        | Uses              |
| ----------- | ----------------- |
| Home        | rooms             |
| Rooms       | rooms             |
| Leaderboard | sessions + rooms  |

The app has two parts, plus a database script:

```
escape-room-leaderboard/
├── database/               seed script that fills your tables with data
├── escape-room-back-end/   Spring Boot REST API (talks to MySQL)
└── escape-room-front-end/  React app (talks to the API)
```

Right now the front end works, but it imports everything from the JSON files in `escape-room-front-end/src/mock-data`. By the end, the front end will get that same data from your back end instead, and the mock data will no longer be used.

### The Big Picture

1. **Back end:** Get the database and Spring Boot app running so there's real data to ask for.
2. **Sessions:** Fetch sessions on the Leaderboard page, with loading and error states.
3. **Rooms:** Three pages need rooms. Rather than fetching three times, lift that state up to `App.jsx` and pass it down.
4. **Polish:** Make sure every page handles loading and errors gracefully.

## How to Work Through It

Search each project for `TODO` comments. They're **numbered in the order you should do them** and appear right where you need to make changes. The TODOs ask questions and point you in a direction rather than telling you exactly what to write. This README gives the matching step-by-step overview.

Tip: in VS Code, use **Ctrl/Cmd + Shift + F** and search for `TODO` to see them all.

## Part 1: Back End and Database (TODOs 1-5)

You will need MySQL Server and MySQL Workbench installed, and Java 21.

### Step 1: Create the database (TODO 1)

Open MySQL Workbench and create an empty schema named **`escape_room`**. Spring Boot can create _tables_ for you, but not the database itself.

📍 `escape-room-back-end/src/main/resources/application.properties`

### Step 2: Configure your `.env` file (TODO 2)

Create a file named `.env` in the root of the back-end project (next to `pom.xml`). It needs a value for each variable that `application.properties` references. Look for the `${...}` placeholders to find them all.

Use this format (replace the values with your own MySQL settings):

```
NAME_OF_VARIABLE=value
```

- No quotes and no spaces around the `=`.
- `.env` is already listed in `.gitignore`. **Do not commit it**, because it holds your password.

📍 `escape-room-back-end/src/main/resources/application.properties`

### Step 3: Start the app and check the tables (TODO 3)

Run `EscapeRoomBackEndApplication` from the back-end project folder (so it can find `.env`). If the console shows a connection error, double-check Steps 1 and 2.

Once it's running, refresh the schemas in Workbench. You should see two tables in `escape_room`. Compare their columns with the fields in the entity classes, `Room` and `EscapeSession` (in the `models` package). Notice what Hibernate did to the names.

📍 `escape-room-back-end/src/main/java/org/launchcode/escape_room_back_end/EscapeRoomBackEndApplication.java`

### Step 4: Seed the database (TODO 4)

Open `database/seed_script.sql` in Workbench and run it. Then check the row counts in both tables (**7 rooms** and **109 sessions**).

With the back end still running, visit these in your browser and confirm you get JSON back:

- <http://localhost:8080/rooms>
- <http://localhost:8080/sessions>

Compare the property names in this JSON with the objects in `src/mock-data`. They should match, which is what lets you swap the data source without rewriting your components.

📍 `database/seed_script.sql`

### Step 5: Read about CORS (TODO 5)

You don't need to change anything here, but you do need to know it exists. Browsers block a page from reading responses from a different origin unless the server allows it. This config class is how the back end allows your React app (on port 5173) to call it (on port 8080). If you see a CORS error later, this is where to look.

📍 `escape-room-back-end/src/main/java/org/launchcode/escape_room_back_end/config/CorsConfig.java`

## Part 2: Front End (TODOs 6-16)

Leave the back end running. In a second terminal:

```bash
cd escape-room-front-end
npm install
npm run dev
```

Then open <http://localhost:5173>. At this point everything looks right but is using mock data.

You'll find `Loading` and `ErrorMessage` components in `src/components` that are ready to use but aren't used anywhere yet.

### Step 6: Fetch sessions (TODO 6)

On the Leaderboard page, replace the sessions mock data with data fetched from your back end. Think about what needs to be in state and what it should start as, when the request should happen (and how many times), and how you'll tell whether a response was actually successful.

📍 `src/pages/Leaderboard.jsx`

### Step 7: Show a loading state (TODO 7)

Users shouldn't stare at an empty table while data loads. Use the `Loading` component to show something while waiting.

📍 `src/pages/Leaderboard.jsx`

### Step 8: Show an error state (TODO 8)

Things go wrong! Handle a failed request and show the `ErrorMessage` component. Test it by stopping the back end and reloading the page. Also think about whether the "No sessions recorded yet" message ever shows when it shouldn't.

📍 `src/pages/Leaderboard.jsx`

### Steps 9-10: Lift rooms state up to `App.jsx` (TODOs 9 and 10)

Home, Rooms, and Leaderboard all need the rooms, and each currently imports its own copy. Instead of fetching three times, decide where the **single source of truth** should live (hint: what's the nearest component that contains all three pages?). Fetch there, with loading and error state just like you did for sessions, and pass what the pages need down as props.

📍 `src/App.jsx`

### Steps 11-14: Use rooms from props on Home and Rooms (TODOs 11-14)

Remove the mock-data import from each page, receive rooms through props instead, and add the loading and error messages.

📍 `src/pages/Home.jsx` (TODOs 11 and 12) and `src/pages/Rooms.jsx` (TODOs 13 and 14)

### Steps 15-16: Finish the Leaderboard (TODOs 15 and 16)

The Leaderboard now depends on **two** data sources: sessions it fetches itself and rooms it receives from `App`. Switch its rooms to props, then work out how to combine the two loading states and the two error states so the page behaves sensibly.

📍 `src/pages/Leaderboard.jsx`

## Check Your Work

When you're done, you should be able to confirm all of these:

- [ ] No file in `src/pages` or `src/components` imports from `src/mock-data` anymore.
- [ ] The Network tab shows one request to `/rooms` (not three) and one request to `/sessions`. (React's `StrictMode` runs effects twice in development, so you may see each one twice. That's expected.)
- [ ] All three pages show the real data from your database.
- [ ] With the back end stopped, every page shows an error message rather than breaking or showing nothing.
- [ ] While data loads, each page shows a loading message.
- [ ] The Leaderboard filters and ranking still work.
- [ ] `npm run lint` passes.

## Stretch Ideas

- Move the back-end URL into an environment variable (Vite uses `VITE_`-prefixed variables in a `.env` file) instead of hard-coding `http://localhost:8080` in `fetch()` calls.
- Write a custom hook (such as `useFetch(url)`) that handles data, loading, and error state in one place.
- Cancel in-flight requests in your `useEffect` cleanup function using an `AbortController`.
