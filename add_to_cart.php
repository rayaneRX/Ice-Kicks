<?php
session_start();
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo "You must be logged in to add items to the cart.";
    header('Location: login.html');
    exit();
}

$user_id = $_SESSION['user_id'];
$product_id = $_POST['product_id'];
$quantity = $_POST['quantity'] ?? 1;

// Check if the product is already in the cart
$sql = "SELECT * FROM cart WHERE user_id = $user_id AND product_id = $product_id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Update quantity if already in cart
    $sql = "UPDATE cart SET quantity = quantity + $quantity WHERE user_id = $user_id AND product_id = $product_id";
} else {
    // Add new item to cart
    $sql = "INSERT INTO cart (user_id, product_id, quantity) VALUES ($user_id, $product_id, $quantity)";
}

if ($conn->query($sql) === TRUE) {
    echo "Product added to cart!";
    header('Location: cart.html');
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
