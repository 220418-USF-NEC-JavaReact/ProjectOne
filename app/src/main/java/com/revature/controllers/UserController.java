package com.revature.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.http.Handler;

public class UserController {
    private ObjectMapper om;

    public UserController() {
        this.om = new ObjectMapper();
    }

    public Handler handleLogin = ctx -> {

    };
}
