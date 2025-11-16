package com.quizapp.servlet;

import com.quizapp.util.DBConnection;
import com.quizapp.util.PasswordUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet("/signup")
public class SignupServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String name = request.getParameter("name").trim();
        String email = request.getParameter("email").trim();
        String password = request.getParameter("password").trim();
        String role = "user";

        // Basic validation
        if (name.isEmpty() || email.isEmpty() || password.isEmpty()) {
            request.setAttribute("error", "All fields are required.");
            request.getRequestDispatcher("signup.html").forward(request, response);
            return;
        }

        try (Connection conn = DBConnection.getConnection()) {

            // 1️⃣ Check if email already exists
            String checkEmailSQL = "SELECT * FROM users WHERE email=?";
            PreparedStatement checkStmt = conn.prepareStatement(checkEmailSQL);
            checkStmt.setString(1, email);
            ResultSet rs = checkStmt.executeQuery();
            if (rs.next()) {
                request.setAttribute("message", "Email is already registered!");
                request.setAttribute("redirectPage", "signup.html");
                request.getRequestDispatcher("signupMessage.jsp").forward(request, response);
                return;
            }

            // 2️⃣ Hash password
            String hashedPassword = PasswordUtil.hashPassword(password);

            // 3️⃣ Insert new user
            String insertSQL = "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)";
            PreparedStatement insertStmt = conn.prepareStatement(insertSQL);
            insertStmt.setString(1, name);
            insertStmt.setString(2, email);
            insertStmt.setString(3, hashedPassword);
            insertStmt.setString(4, role);

            int rowCount = insertStmt.executeUpdate();
            if (rowCount > 0) {
            	request.setAttribute("message", "Account created successfully! Now you can login.");
            	request.setAttribute("redirectPage", "login.html");
            	request.getRequestDispatcher("signupMessage.jsp").forward(request, response);
            } else {
            	request.setAttribute("message", "Registration failed! Please try again.");
            	request.setAttribute("redirectPage", "signup.html");
            	request.getRequestDispatcher("signupMessage.jsp").forward(request, response);
            }

        } catch (SQLException e) {
            e.printStackTrace();
            request.setAttribute("message", "Database error occurred. Please try again.");
            request.setAttribute("redirectPage", "signup.html");
            request.getRequestDispatcher("signupMessage.jsp").forward(request, response);
        } catch (Exception e) {
            e.printStackTrace();
            request.setAttribute("message", "Error hashing password. Please try again.");
            request.setAttribute("redirectPage", "signup.html");
            request.getRequestDispatcher("signupMessage.jsp").forward(request, response);
        }
    }
}
