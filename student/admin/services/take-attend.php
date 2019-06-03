<?php
// print_r($_REQUEST);
$data = array("message" => "Unknown method", "status" => "server_error");

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    error_reporting(0);
    extract($_REQUEST, EXTR_SKIP);

    session_start();
    $sql = " ";

    foreach ($stud_id as $sid) {
        $sql .= " INSERT INTO `attendance` (`_aid`, `_sid`, `time`) VALUES($_SESSION[_aid], $sid, CONVERT_TZ(CURRENT_TIMESTAMP, '-07:00', '+05:30
    '));";
    }

    // echo $sql;

    require '../../../services/db.inc.php';
    $conn = DB::getConnection();
    if ($conn->multi_query($sql) === true) {
        $data = array("message"  => "Attendance Added Successfully!", "status" => "success");
    } else {
        // echo $conn->error;
        $data = array("message " => "Something went wrong!",  "status" => "server_error");
    }
}
echo json_encode($data);
return;
