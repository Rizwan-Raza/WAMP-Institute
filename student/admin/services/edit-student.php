<?php
// print_r($_REQUEST);
// return;
$data = array("message" => "Unknown method", "status" => "server_error");

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    error_reporting(0);
    extract($_REQUEST, EXTR_SKIP);
    // print_r($_POST);

    session_start();
    $sql = "UPDATE `students` SET `name` = '$name', `username` = '$username', `fee` = $fee, `gst`=$gst, `pay_amount`=$pay_amount, `course`=$course, `time` = TIMESTAMP('$time_oj') WHERE `_sid`=$sid";

    require '../../../services/db.inc.php';
    $conn = DB::getConnection();
    if ($conn->query($sql) === true) {
        $data = array("message" => "Profile Updated Successfully!", "status" => "success");
    } elseif (strpos($conn->error, "Duplicate entry") === 0) {
        $data = array("message" => "Username already taken, try something else.", "status" => "username_error");
    } else {
        // echo $conn->error;
        $data = array("message" => "Something went wrong!", "status" => "server_error");
    }
}
echo json_encode($data);
return;
