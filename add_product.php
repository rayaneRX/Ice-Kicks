<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $price = $_POST['price'];
    $description = $_POST['description'];
    $image = $_FILES['image']['name'];
    $target = 'uploads/' . basename($image);
    
    if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
        $stmt = $pdo->prepare("INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $price, $description, $image]);
        header('Location: products.php');
    } else {
        echo "Failed to upload image.";
    }
}
?>
