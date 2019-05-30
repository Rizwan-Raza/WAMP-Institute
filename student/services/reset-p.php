<?php
// print_r($_REQUEST);
$data = array("message" => "Unknown method", "status" => "server_error");

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    error_reporting(0);
    extract($_REQUEST, EXTR_SKIP);
    // print_r($_POST);

    $hashHere = md5("*WAMP*" . ($sid * 1234) . "*WAMP*");
    if ($hashHere == $hash) {

        if ($password == $c_password) {

            session_start();
            $sql = "UPDATE `students` SET `password`=MD5('*WAMP*$password*WAMP*') WHERE `_sid`='$sid'";

            // echo $sql;

            require '../../services/db.inc.php';
            $conn = DB::getConnection();
            $result = $conn->query($sql);
            if ($result == true) {
                $data = array("message" => "Password Reset Successfully!", "status" => "success");
            } else {
                // echo $conn->error;
                $data = array("message" => "Something went wrong!", "status" => "server_error");
            }
        } else {
            $data = array("message" => "Password Mismatch", "status" => "password_error");
        }
    } else {
        $data = array("message" => "Hash Mismatch, try again", "status" => "server_error");
    }
}
echo json_encode($data);
return;
