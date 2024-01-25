package de.neuefische.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)


                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.DELETE,"/api/todo/*").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/todo").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/todo").permitAll()
                        .anyRequest().permitAll())


                .sessionManagement(sessions ->
                        sessions.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .oauth2Login(withDefaults());

        return http.build();
    }
}
