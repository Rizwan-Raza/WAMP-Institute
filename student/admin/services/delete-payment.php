<?php
// print_r($_REQUEST);
$data = array("message" => "Unknown method", "status" => "server_error");
if ($_SERVER['REQUEST_METHOD'] === "POST") {
    error_reporting(0);

    $pid = $_POST['_pid'];

    $sql0 = "SELECT `sign` FROM `payments` WHERE `_pid`=$pid";
    $sql = "DELETE FROM `payments` WHERE `_pid`=$pid";

    require '../../../services/db.inc.php';
    $conn = DB::getConnection();
    $sign = $conn->query($sql0)['sign'];
    $result = $conn->query($sql);
    if ($result == true) {
        if (strpos($sign, "uploads/$pid-") != FALSE) {
            unlink($sign);
        }
        $data = array("message" => "Payment Rolled Back Successfully!", "status" => "success");
    } else {
        $data = array("message" => "Something went wrong!", "status" => "server_error");
    }
}
echo json_encode($data);
return;
