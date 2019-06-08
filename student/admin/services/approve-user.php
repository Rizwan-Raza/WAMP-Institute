<?php
// print_r($_REQUEST);
$data = array("message" => "Unknown method", "status" => "server_error");
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    error_reporting(0);

    $sql = "UPDATE `students` SET `fee`=$_POST[fee], `active`=1 WHERE `_sid`=$_POST[sid]";

    // echo $sql;

    require '../../../services/db.inc.php';
    $conn = DB::getConnection();
    $result = $conn->query($sql);
    if ($result == true) {
        $data = array("message" => "Student Approved Successfully!", "status" => "success");
    } else {
        // echo $conn->error;
        $data = array("message" => "Something went wrong!", "status" => "server_error");
    }
}
echo json_encode($data);
return;
