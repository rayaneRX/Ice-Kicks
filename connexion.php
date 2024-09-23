<?php
session_start();
include 'db.php';

if (isset($_POST['connexion'])) {
    $login = $_POST['login'];
    $pwd = $_POST['password'];

    if (!empty($login) && !empty($pwd)) {
        $sqlState = $pdo->prepare('SELECT * FROM utilisateur WHERE login = ? AND password = ?');
        $sqlState->execute([$login, $pwd]);

        if ($sqlState->rowCount() >= 1) {
            $_SESSION['utilisateur'] = $sqlState->fetch();
            header('location: admin.php');
            exit();
        } else {
            echo "<div class='alert alert-danger'>Login or password incorrect.</div>";
        }
    } else {
        echo "<div class='alert alert-danger'>Both fields are required.</div>";
    }
}
?>

<!doctype html>
<html lang="en">
<head>
    <?php include 'include/head.php' ?>
    <title>Connexion</title>
</head>
<body>
<?php include 'include/nav.php' ?>
<div class="container py-2">
    <h4>Connexion</h4>
    <form method="post">
        <label class="form-label">Login</label>
        <input type="text" class="form-control" name="login">

        <label class="form-label">Password</label>
        <input type="password" class="form-control" name="password">

        <input type="submit" value="Connexion" class="btn btn-primary my-2" name="connexion">
    </form>
</div>
</body>
</html>
