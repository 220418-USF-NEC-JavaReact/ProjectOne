package com.revature.dao;

import com.revature.models.Reimbursement;
import com.revature.utils.ConnectionSingleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class ReimDaoJDBC implements IReimDao {
    public static final ConnectionSingleton cs = ConnectionSingleton.getConnectionSingleton();
    private static final Logger logger = LoggerFactory.getLogger(UserDaoJDBC.class);


    @Override
    public void createReim(Reimbursement r) {
        Connection c = cs.getConnection();

        String sql = "insert into reimbursement (amount, description, reimbursement_author, reimbursement_type) values " +
                "("+r.getAmount()+", '"+r.getDescription()+"', "+r.getReimbursement_author()+", "+r.getReimbursement_type()+");";

        try {
            Statement s = c.createStatement();
            s.execute(sql);
            s.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            logger.info("#6. New Reimbursement request created!");
        }
    }

    @Override
    public Reimbursement getReim(int reimbursement_id) {
        return null;
    }
}
