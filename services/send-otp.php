<?php
if ($_SERVER['REQUEST_METHOD'] === "POST" and isset($_POST['number']) and isset($_POST['otp'])) {
    error_reporting(0);
    extract($_POST, EXTR_SKIP);
    echo file_get_contents('http://sms.promohub.org/V2/http-api.php?apikey=uRSXjBbbXZIvrp8J&senderid=WAMPIT&number=' . $number . '&message=Your+WAMP+Digital+Marketing+Institute+OTP+is:' . $otp . '&format=json');
} else {
    echo json_encode(array("message" => "Something went wrong", "status" => "error"));
}
