<?php
header('Content-Type: application/json');
$data = array("message" => "Unknown method", "status" => "server_error");
if ($_SERVER['REQUEST_METHOD'] === "POST" and isset($_POST['file'])) {
    error_reporting(0);
    if ($_POST['type'] == 1) {
        if (@unlink("../" . $_POST['file'])) {
            $data = array("message" => "File deleted successfully", "status" => "success");
        } else {
            $data = array("message" => "Something went wrong!", "status" => "server_error");
        }
    } else {
        $files = $_POST['file'];
        $filesToDelete = count($files);
        $deletedFiles = 0;
        foreach ($files as $file) {
            if (@unlink("../" . $file)) {
                $deletedFiles++;
            }
        }
        $data = array("message" => "$deletedFiles/$filesToDelete Files deleted successfully", "status" => "success");
    }
}

echo json_encode($data);
