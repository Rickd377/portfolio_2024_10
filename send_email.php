<?php
session_start(); // Start the session

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if the user has already sent a message
    if (isset($_SESSION['message_sent']) && $_SESSION['message_sent'] === true) {
        echo "<script>
                alert('You can't send multiple messages. Please come back later.');
                window.location.href = 'index.html#contact';
              </script>";
        exit();
    }

    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = nl2br(htmlspecialchars($_POST['message'])); // Convert newlines to <br> tags

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'rickkcir37@gmail.com'; // Your Gmail address
        $mail->Password = 'jafshphzdebrgkbb'; // Your Gmail password or App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom($email, $name); // Set from email and name
        $mail->addAddress('rickkcir37@gmail.com'); // Add a recipient
        $mail->addReplyTo($email);

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = "<p><strong>Name:</strong> $name</p>
                          <p><strong>Email:</strong> $email</p>
                          <p><strong>Subject:</strong> $subject</p>
                          <p><strong>Message:</strong><br>$message</p>";
        $mail->AltBody = "Name: $name\nEmail: $email\nMessage:\n$message";

        $mail->send();

        $_SESSION['message_sent'] = true;

        echo "<script>
                alert('Message has been sent successfully!');
                window.location.href = 'index.html#contact';
              </script>";
        exit();
    } catch (Exception $e) {
        error_log("Mailer Error: " . $mail->ErrorInfo);
        echo "<script>
                alert('Message could not be sent. Mailer Error: {$mail->ErrorInfo}');
                window.location.href = 'index.html#contact';
              </script>";
        exit();
    }
} else {
    echo "<script>
            alert('Invalid request method.');
            window.location.href = 'index.html#contact';
          </script>";
    exit();
}
?>