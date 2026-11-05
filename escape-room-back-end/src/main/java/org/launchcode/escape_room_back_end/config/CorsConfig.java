package org.launchcode.escape_room_back_end.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

// TODO 5: Read only; no edits needed in this file.
//  Browsers block a page from one origin (like the React app on
//  http://localhost:5173) from reading responses from a different origin (like
//  this API on http://localhost:8080) unless the server explicitly allows it.
//  This class is how the back end grants that permission. Which origin is
//  allowed here? Which HTTP methods? Keep this in mind: if your front-end
//  fetch() calls fail later with a "CORS" error in the browser console, this is
//  the place to start looking. (Also check that your Vite dev server is
//  actually running on port 5173.)
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOriginPatterns(List.of("http://localhost:5173"));
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
