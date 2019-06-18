<?php

$sql = "SELECT `_sid`, `name`, `username`, `fee`, `active` FROM `students` WHERE `_uid`=" . $_COOKIE['user_id'];
require '../../services/db.inc.php';
$conn = DB::getConnection();
$result = $conn->query($sql);

if ($result != false) {
    if ($result->num_rows > 0) {
        $u_data = $result->fetch_assoc();
        if ($u_data['active'] == "1") {
            // $data = array("message"=>"Logged In Successfully!", "status"=>"success");
            session_start();
            $_SESSION['login'] = true;
            $_SESSION['_uid'] =  $u_data['_uid'];
            $_SESSION['name'] = $u_data['name'];
            $_SESSION['username'] = $u_data['username'];
            $_SESSION['email'] = $u_data['email'];
            $_SESSION['number'] = $u_data['number'];
            $_SESSION['image'] = $u_data['image'];
            $_SESSION['active'] = $u_data['active'];
            $_SESSION['short_name'] = explode(" ", $_SESSION['name'])[0];
            header("Refresh: 0");
        }
    }
}
