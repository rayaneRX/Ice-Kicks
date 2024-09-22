<?php
$host = 'localhost';
$user = 'root';              // Default user for XAMPP
$password = '';              // Default password is empty for XAMPP
$dbname = 'ice_kicks_db';    // Your database name

// Create a new connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
