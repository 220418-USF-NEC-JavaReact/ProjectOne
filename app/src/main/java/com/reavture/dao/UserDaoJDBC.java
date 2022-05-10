package com.reavture.dao;

import com.reavture.models.User;
import com.reavture.utils.ConnectionSingleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class UserDaoJDBC implements IUserDao{

    public static final ConnectionSingleton cs = ConnectionSingleton.getConnectionSingleton();
    private static final Logger logger = LoggerFactory.getLogger(UserDaoJDBC.class);
    @Override
    public void createUser(User u) {
        Connection c = cs.getConnection();

        String sql = "insert into public.users (username, password, first_name, last_name, email, role) values " +
                "('" + u.getUsername() +"','" +  u.getPassword() +"','" + u.getFirst_name() +"','" + u.getLast_name() + "','" + u.getEmail() +"','" + u.getRole() + "')";

        try {
            Statement s = c.createStatement();
            s.execute(sql);
            s.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            logger.info("#1. New User created!");
        }
    }

    @Override
    public User readUserByUserId(int user_id) {
        return null;
    }

    @Override
    public User updateUser(User u) {
        return null;
    }

    @Override
    public void deleteUser(User u) {
        // TO be implemented later
    }
}
