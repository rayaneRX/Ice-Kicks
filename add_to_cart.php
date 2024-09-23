<?php
session_start();
include 'db.php';

if (!isset($_SESSION['utilisateur'])) {
    header('location: connexion.php');
    exit();
}

$user_id = $_SESSION['utilisateur']['id'];
$product_id = $_POST['product_id'];
$quantity = $_POST['quantity'] ?? 1;

$sql = "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$user_id, $product_id, $quantity, $quantity]);

header('location: cart.php');
?>
