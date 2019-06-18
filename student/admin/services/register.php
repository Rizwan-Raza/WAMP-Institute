<?php
// print_r($_REQUEST);
$data = array("message" => "Unknown method", "status" => "server_error");

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    error_reporting(0);
    extract($_REQUEST, EXTR_SKIP);
    // print_r($_POST);

    session_start();
    $sql = "INSERT INTO `students` (`name`, `username`, `password`, `course`, `fee`, `active`, `time`) VALUES('$name', '$username', MD5('*WAMP*$password*WAMP*'), $course, $fee, 1, CONVERT_TZ(CURRENT_TIMESTAMP, '-07:00', '+05:30'))";

    // echo $sql;

    require '../../../services/db.inc.php';
    $conn = DB::getConnection();
    if ($conn->query($sql) === true) {
        $data = array("message" => "Student Added Successfully!", "status" => "success");
    } elseif (strpos($conn->error, "Duplicate entry") === 0) {
        $data = array("message" => "Username already taken, try something else.", "status" => "username_error");
    } else {
        // echo $conn->error;
        $data = array("message" => "Something went wrong!", "status" => "server_error");
    }
}
echo json_encode($data);
return;
