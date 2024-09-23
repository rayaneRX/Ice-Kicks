<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT); // Hash the password

    try {
        // Use prepared statements to prevent SQL injection
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $password]);

        // Registration successful
        echo "Registration successful!";
        header('Location: login.html'); // Redirect to login page
        exit();
    } catch (PDOException $e) {
        // Handle database errors gracefully
        echo "Error: Unable to register. Please try again later.";
        // Optional: log the error message for debugging
        // error_log($e->getMessage());
    }
}
?>
