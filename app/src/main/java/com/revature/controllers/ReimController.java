package com.revature.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.models.Reimbursement;
import com.revature.services.ReimService;
import com.revature.services.UserService;
import io.javalin.http.Handler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ReimController {
    private ObjectMapper om;
    private ReimService rService;
    public ReimController(ReimService rService) {
        this.rService = rService;
        this.om = new ObjectMapper();
    }

    public Handler handleCreateReim = ctx -> {

        //First check to see if the use already logged in
        if(ctx.req.getSession().getAttribute("user_id") == null){
            ctx.status(401);
            ctx.result("You must login to create reimbursement requests");
        } else {
            int author = Integer.parseInt(ctx.req.getSession().getAttribute("user_id").toString());

            Reimbursement r = om.readValue(ctx.body(), Reimbursement.class);
            r.setReimbursement_author(author);

            rService.createReim(r);
            ctx.status(201);
            ctx.result("Reimbursement request created");
        }

    };

    public Handler handleViewReim = ctx -> {

        //First check to see if the use already logged in
        if(ctx.req.getSession().getAttribute("user_id") == null){
            ctx.status(401);
            ctx.result("You must login to view reimbursements");
        } else {
            int author = Integer.parseInt(ctx.req.getSession().getAttribute("user_id").toString());

            ctx.status(200);
            ctx.result(om.writeValueAsString(rService.getAllUsersReimbursements(author)));
        }

    };
}
