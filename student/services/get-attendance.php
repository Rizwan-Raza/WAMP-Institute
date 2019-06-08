<?php

header('Content-Type: application/json');
$data = array("message" => "Unknown method", "status" => "server_error");
if ($_SERVER['REQUEST_METHOD'] === "GET") {
    error_reporting(0);
    extract($_POST, EXTR_SKIP);
    session_start();
    $sql = "SELECT `attendance`.`time` FROM `attendance` WHERE `_sid`=$_SESSION[_sid]";
    require '../../services/db.inc.php';
    $conn = DB::getConnection();
    $result = $conn->query($sql);
    if ($result == true) {
        $data = array();
        if ($result->num_rows > 0) {
            // $data = array("message" => "Confirmed! It's you. Please wait.", "status" => "success");
            while ($x = $result->fetch_assoc()) {
                array_push($data, $x);
            }
        }
    } else {
        // echo $conn->error;
        $data = array("message" => "Something went wrong!", "status" => "server_error");
    }
    echo json_encode($data);
    return;
}
