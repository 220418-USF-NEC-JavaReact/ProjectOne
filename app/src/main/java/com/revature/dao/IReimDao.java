package com.revature.dao;

import com.revature.models.Reimbursement;

public interface IReimDao {
    //CRUD
    //create
    public void createReim(Reimbursement r);

    //read
    public Reimbursement getReim(int reimbursement_id);
}
