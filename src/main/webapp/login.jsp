<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/login.css">
    <script src="js/login.js"></script>
</head>
<body>

<div class="container">
    <div class="login-card">
        <div class="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7L12 12L22 7L12 2Z"></path>
                <path d="M2 17L12 22L22 17"></path>
                <path d="M2 12L12 17L22 12"></path>
            </svg>
        </div>

        <h1>Welcome Back</h1>
        <p class="subtitle">Challenge yourself again — sign in to start your next quiz.</p>

        <!-- Form submits to LoginServlet -->
        <form class="loginForm" action="login" method="post">
            <div class="input-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email"
                       value="<%= request.getAttribute("email") != null ? request.getAttribute("email") : "" %>"
                       placeholder="you@example.com" required>
            </div>

            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password"
                       placeholder="••••••••" required>
            </div>

            <!-- Error message display -->
            <div class="error-message" style="color: red; margin-bottom: 10px;">
                <%= request.getAttribute("loginError") != null ? request.getAttribute("loginError") : "" %>
            </div>

            <div class="options">
                <label class="checkbox">
                    <input type="checkbox" id="remember">
                    <span>Remember me</span>
                </label>
                <a href="#" class="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" class="btn-login">Sign In</button>
        </form>

        <p class="signup-link">
            Don't have an account? <a href="signup.html">Sign up</a>
        </p>
    </div>
</div>

</body>
</html>
