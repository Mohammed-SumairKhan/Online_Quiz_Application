<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Message</title>
    <script>
        // Get the message and target page from request attributes
        var message = "<%= request.getAttribute("message") %>";
        var redirectPage = "<%= request.getAttribute("redirectPage") %>";
        
        // Show alert and redirect
        if(message && redirectPage){
            alert(message);
            window.location.href = redirectPage;
        }
    </script>
</head>
<body>
</body>
</html>
