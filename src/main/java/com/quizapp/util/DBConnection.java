package com.quizapp.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Utility class responsible for managing the application's database connection.
 * This class provides a single shared Connection instance (Singleton pattern)
 * for interacting with the MySQL database.
 *
 * Database: online_quiz_application
 */
public class DBConnection {

	/** JDBC URL pointing to the MySQL database */
	private static final String URL = "jdbc:mysql://localhost:3306/online_quiz_application";

	/** MySQL database username */
	private static final String USER = "root";

	/** MySQL database password */
	private static final String PASSWORD = "Sumair@1";

	/** Reusable single Connection instance */
	private static Connection connection = null;

	/**
	 * Returns a database connection.
	 * <p>
	 * This method checks if an existing connection is available, otherwise creates
	 * a new one. It also loads the MySQL JDBC driver before establishing the
	 * connection.
	 * </p>
	 *
	 * @return Connection object for interacting with the database
	 */
	public static Connection getConnection() {
		try {
			// If connection is null or closed, create a new connection
			if (connection == null || connection.isClosed()) {
				Class.forName("com.mysql.cj.jdbc.Driver"); // Load MySQL driver
				connection = DriverManager.getConnection(URL, USER, PASSWORD);
				System.out.println("Database Connected Successfully!");
			}
		} catch (ClassNotFoundException | SQLException e) {
			e.printStackTrace(); // Print error if connection fails
		}

		return connection;
	}
}
