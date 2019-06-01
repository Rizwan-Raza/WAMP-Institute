<?php
// print_r($_REQUEST);
$data = array("message" => "Unknown method", "status" => "server_error");

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    error_reporting(0);
    extract($_REQUEST, EXTR_SKIP);

    session_start();
    $fileDir = "uploads/$stud_id-" . time() . ".png";
    $signature = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $signature));
    file_put_contents("../" . $fileDir, $signature);
    $sql = "INSERT INTO `payments` (`_aid`, `_sid`, `amount`, `sign`, `time`) VALUES($_SESSION[_aid], $stud_id, $amount, '$fileDir', CONVERT_TZ(CURRENT_TIMESTAMP, '-07:00', '+05:30'));";

    // echo $sql;
    require '../../../services/db.inc.php';
    $conn = DB::getConnection();
    if ($conn->query($sql) === true) {
        $data = array("message" => "Fee Deducted Successfully!", "status" => "success");
    } else {
        $data = array("message" => "Something went wrong!", "status" => "server_error");
    }
}
echo json_encode($data);
return;
