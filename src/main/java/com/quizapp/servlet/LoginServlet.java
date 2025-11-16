package com.quizapp.servlet;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.quizapp.util.DBConnection;
import com.quizapp.util.PasswordUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String email = request.getParameter("email").trim();
        String password = request.getParameter("password").trim();

        if (email.isEmpty() || password.isEmpty()) {
            request.setAttribute("loginError", "Both fields are required!");
            request.getRequestDispatcher("login.jsp").forward(request, response);
            return;
        }

        try (Connection conn = DBConnection.getConnection()) {
            // Get user from DB
            String sql = "SELECT * FROM users WHERE email=?";
            PreparedStatement pst = conn.prepareStatement(sql);
            pst.setString(1, email);
            ResultSet rs = pst.executeQuery();

            if (rs.next()) {
                String storedHashedPassword = rs.getString("password_hash");

                // Compare hashed passwords
                if (PasswordUtil.hashPassword(password).equals(storedHashedPassword)) {
                    // Login successful, create session
                    HttpSession session = request.getSession();
                    session.setAttribute("userName", rs.getString("name"));
                    session.setAttribute("userEmail", email);
                    session.setAttribute("userRole", rs.getString("role"));

                    response.sendRedirect("dashboard.jsp"); // Redirect to user dashboard
                } else {
                    // Password incorrect
                    request.setAttribute("loginError", "Invalid email or password!");
                    request.getRequestDispatcher("login.jsp").forward(request, response);
                }
            } else {
                // Email not found
                request.setAttribute("loginError", "Invalid email or password!");
                request.getRequestDispatcher("login.jsp").forward(request, response);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            request.setAttribute("loginError", "Database error! Try again later.");
            request.getRequestDispatcher("login.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            request.setAttribute("loginError", "An error occurred! Try again later.");
            request.getRequestDispatcher("login.jsp").forward(request, response);
        }
    }
}
