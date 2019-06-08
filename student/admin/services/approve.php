<?php
// print_r($_REQUEST);
$data = array("message" => "Unknown method", "status" => "server_error");
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    error_reporting(0);
    extract($_REQUEST, EXTR_SKIP);

    $fileDir = "uploads/$stud_id-" . time() . ".png";
    $signature = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $signature));
    file_put_contents("../" . $fileDir, $signature);

    $sql = "UPDATE `payments` SET `sign`='$fileDir', `approved`=1 WHERE `_pid`=$pid";

    // echo $sql;

    require '../../../services/db.inc.php';
    $conn = DB::getConnection();
    $result = $conn->query($sql);
    if ($result == true) {
        $data = array("message" => "Student Signature Added!", "status" => "success");
    } else {
        // echo $conn->error;
        $data = array("message" => "Something went wrong!", "status" => "server_error");
    }
}
echo json_encode($data);
return;
