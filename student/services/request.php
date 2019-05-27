<?php
$data = array("message" => "Unknown method", "status" => "server_error");
if ($_SERVER['REQUEST_METHOD'] === "POST" and isset($_POST['name']) and isset($_POST['message'])) {
    error_reporting(0);
    extract($_POST, EXTR_SKIP);

    $sql = "INSERT INTO `queries`(`name`, `message`, `time`, `type`) VALUES('$name', '$message', CONVERT_TZ(CURRENT_TIMESTAMP, '-07:00', '+05:30'), 2)";
    require '../../services/db.inc.php';
    $conn = DB::getConnection();
    $result = $conn->query($sql);
    if ($result) {
        $data = array("message" => "Requested Successfully!", "status" => "success");
    } else {
        // echo $conn->error;
        $data = array("message" => "Something went wrong!", "status" => "server_error");
    }
}
echo json_encode($data);
return;
