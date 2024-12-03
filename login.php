<?php
session_start();
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $email = $_POST['email'];
  $password = $_POST['password'];

  // Check if email and password are set
  if (!empty($email) && !empty($password)) {
    // Prepare and bind
    $stmt = $conn->prepare("SELECT * FROM login WHERE email = ? AND password = ?");
    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      echo "LOG IN SUCCESSFUL.";
      // Set session variables or any other login success actions
    } else {
      echo "Invalid email or password.";
    }

    $stmt->close();
  } else {
    echo "Please fill in all fields.";
  }

  $conn->close();
} else {
  echo "Invalid request method.";
}
?>
