<?php
session_start();
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php'); // Redirect to login if not logged in
    exit();
}

$user_id = $_SESSION['user_id'];
$product_id = $_POST['product_id'];
$quantity = $_POST['quantity'];

$stmt = $pdo->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)
                       ON DUPLICATE KEY UPDATE quantity = quantity + ?");
$stmt->execute([$user_id, $product_id, $quantity, $quantity]);

header('Location: cart.php');
?>
