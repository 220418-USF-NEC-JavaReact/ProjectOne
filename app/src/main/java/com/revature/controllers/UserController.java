package com.revature.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.App;
import com.revature.models.LoginObject;
import com.revature.models.User;
import com.revature.services.UserService;
import io.javalin.http.Handler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class UserController {
    private ObjectMapper om;
    private UserService uService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService uService) {
        this.uService = uService;
        this.om = new ObjectMapper();
    }

    public Handler handleLogin = ctx -> {
        LoginObject lo = om.readValue(ctx.body(),LoginObject.class);
        System.out.println(lo.username+" "+  lo.password);
        User u = uService.loginUser(lo.username, lo.password);

        if(u != null){
            //set up a session for logged user
            ctx.req.getSession().setAttribute("loggedIn", u.getUsername());
            ctx.req.getSession().setAttribute("loggedIn", u.getPassword());
            ctx.result(om.writeValueAsString(u));
            logger.info("5. Login Successful!");
        } else{
            logger.info("4. Incorrect username and password, please enter your details carefully!");
            ctx.status(403);
            ctx.result("Username or password was incorrect");
        }
    };
}
