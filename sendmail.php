<?php
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if (isset($_POST['submitContact'])) {
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $interest = $_POST['interest'];

    $mail = new PHPMailer(true);

    try {
        //Server settings
        // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'obt.trader7@gmail.com';                     //SMTP username
        $mail->Password   = 'wjdj ntgx lgpr rrmg';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
        $mail->Port       = 587;                                    //TCP port to connect to
        $mail->CharSet = 'UTF-8';
        //Recipients for owner
        $mail->setFrom('obt.trader7@gmail.com', 'Mailer');
        $mail->addAddress('obt.trader7@gmail.com', 'User');     // Send to site owner

        //Content for owner
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Письмо с сайта';
        $mail->Body    = '<h1>Информация о человеке</h1>
        <p>Имя: <b> '.$first_name.' '.$last_name.'</b></p></br>
        <p>Почта: <b> '.$email.'</b></p></br>
        <p>Телефон: <b> '.$phone.'</b></p></br>
        <p>Заинтересован в: <b> '.$interest.'</b></p></br>
    ';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        // Send email to owner
        if($mail->send()){
            // Create another instance of PHPMailer for the subscriber
            $subscriberMail = new PHPMailer(true);
            $subscriberMail->isSMTP();
            $subscriberMail->Host       = 'smtp.gmail.com';
            $subscriberMail->SMTPAuth   = true;
            $subscriberMail->Username   = 'obt.trader7@gmail.com';
            $subscriberMail->Password   = 'wjdj ntgx lgpr rrmg';
            $subscriberMail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $subscriberMail->Port       = 587;

            //Recipients for subscriber
            $subscriberMail->setFrom('obt.trader7@gmail.com', 'Mailer');
            $subscriberMail->addAddress($email);  // Send to the form submitter

            //Content for subscriber
            $subscriberMail->isHTML(true);
            $subscriberMail->Subject = 'Подтверждение подписки';
            $subscriberMail->Body    = '<h1>Спасибо за подписку!</h1>
            <p>Вы подписались на рассылку.</p>';
            $subscriberMail->AltBody = 'Спасибо за подписку!';

            // Send email to subscriber
            if($subscriberMail->send()){
                $_SESSION['status'] = "Thank you!";
            } else {
                $_SESSION['status'] = "Error sending email to subscriber.";
            }
        } else {
            $_SESSION['status'] = "Message could not be sent to owner.";
        }

        // Redirect back to the form page
        header("Location: {$_SERVER["HTTP_REFERER"]}");
        exit(0);

    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    header("Location: index.php");
    exit(0);
}
