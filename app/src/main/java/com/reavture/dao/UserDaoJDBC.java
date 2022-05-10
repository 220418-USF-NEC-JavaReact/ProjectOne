package com.reavture.dao;

import com.reavture.models.User;
import com.reavture.utils.ConnectionSingleton;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.*;

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
    public User readUserByUsername(String username, String password) {
        Connection c = cs.getConnection();

        String sql = "select * from public.users where username=? and password=?";

        User loggedIn = null;
        try {
            PreparedStatement ps = c.prepareStatement(sql);
            ps.setString(1, username);
            ps.setString(2, password);
            ResultSet rs = ps.executeQuery();

            while(rs.next()){
                loggedIn = new User(rs.getInt(1), rs.getString(2), rs.getString(3), rs.getString(4), rs.getString(5), rs.getString(6), rs.getInt(7));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            logger.info("#3. User data retrieved!");
        }
        return loggedIn;
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
