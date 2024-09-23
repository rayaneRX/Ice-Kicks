<?php
// Database connection
$host = 'localhost';
$user = 'root'; // Change if your MySQL username is different
$password = ''; // Change if your MySQL password is set
$dbname = 'ice_kicks_db'; // Make sure this matches your database name

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>
