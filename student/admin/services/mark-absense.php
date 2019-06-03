<?php
// print_r($_REQUEST);
$data = array("message" => "Unknown method", "status" => "server_error");

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    error_reporting(0);
    extract($_REQUEST, EXTR_SKIP);

    session_start();
    $sql = "DELETE FROM `attendance` WHERE `_at_id`=$at_id AND `_aid`=$_SESSION[_aid]";

    // echo $sql;

    require '../../../services/db.inc.php';
    $conn = DB::getConnection();
    if ($conn->multi_query($sql) === true) {
        $data = array("message"  => "Mark Absense Successfully!", "status" => "success");
    } else {
        // echo $conn->error;
        $data = array("message " => "Something went wrong!" . $conn->error,  "status" => "server_error");
    }
}
echo json_encode($data);
return;
