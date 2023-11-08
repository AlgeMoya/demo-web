package com.demo.group.demoweb.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class SessionController {
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam("username") String username, HttpSession session) {
        // 사용자 인증을 직접 처리합니다. 예를 들어, 데이터베이스에서 사용자 정보가 있는지 확인합시다.
        // ...

        System.out.println(username);
        session.setAttribute("username", username);
        return new ResponseEntity<>("Logged in", HttpStatus.OK);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return new ResponseEntity<>("Logged out", HttpStatus.OK);
    }

    @GetMapping("/session-info")
    public ResponseEntity<String> sessionInfo(HttpSession session) {
        String username = (String) session.getAttribute("username");
        return new ResponseEntity<>(username, HttpStatus.OK);
    }
}
