<?php
// Updated database connection
$host = 'localhost';
$user = 'root'; // Update with your MySQL username if different
$password = ''; // Update with your MySQL password if set
$dbname = 'ice_kicks_db'; // Ensure this matches the new database name

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
