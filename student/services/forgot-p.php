<?php
// print_r($_REQUEST);
$data = array("message" => "Unknown method", "status" => "server_error");

if ($_SERVER['REQUEST_METHOD'] === "POST" && isset($_POST['username']) && isset($_POST['email'])) {
    error_reporting(0);
    extract($_REQUEST, EXTR_SKIP);
    // print_r($_POST);

    session_start();
    $sql = "SELECT `_sid` FROM `students` WHERE `username`='$username'";

    // echo $sql;

    require '../../services/db.inc.php';
    $conn = DB::getConnection();
    $result = $conn->query($sql);
    if ($result == true) {
        if ($result->num_rows > 0) {
            $uid = $result->fetch_assoc()['_sid'];
            $hash = md5("*WAMP*" . ($uid * 1234) . "*WAMP*");
            $url = "https://student.wampinstitute.in/forgot-password?hash=$hash&uid=$uid";
            $to = $email;
            $from = "WAMP Support <info@wampinstitute.in>";
            $subject = "Account Recovery";
            $body = '<!DOCTYPE html>
        <html>
        
        <head>
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        </head>
        
        <body style="font-family: Arial, Helvetica, sans-serif;margin:0px;background-color: #ffffff;">
            <table style="background-color: #eeeeee;padding: 8px 16px;width: 100%;box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);">
                <tr>
                    <td><img src="https://www.wampinstitute.in/images/wamp-round-logo.png" height="50px" alt="WAMP InfoTech" /></td>
                    <td style="line-height: 50px;vertical-align: top; margin:0px; font-size: 32px; font-weight: 500;">Account Recovery for ' . $username . '</td>
                </tr>
            </table>
            <a href="' . $url . '"><button style="margin: 16px;text-decoration: none;text-transform: initial;letter-spacing: 0.25px;font-weight: 500;border-radius: 4px;background-color: #263a73;color: #fff;font-family: Arial, Helvetica, sans-serif;text-align: center;    height: 36px;line-height: 36px;padding: 0 16px;border:none;-webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);">Reset Password</button></a>
            <table style="background-color: #263a73;padding: 8px 16px;width: 100%;color: #ffffff;">
                <tr>
                    <td style="line-height: 50px;vertical-align: top; margin:0px; font-size: 24px; font-weight: 500;"><a href="https://wampinstitute.com/"
                            style="color: #ffffff;text-decoration:none">WAMP D.M. Institute</a></td>
                    <td><a href="https://www.wampinstitute.com/about" style="color: #ffffff;text-decoration:none">About</a></td>
                    <td><a href="https://www.wampinstitute.com/contact" style="color: #ffffff;text-decoration:none">Contact</a></td>
                </tr>
            </table>
        </body>
        
        </html>';

            // Always set content-type when sending HTML email
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

            // More headers
            $headersO = $headers . 'From: ' . $from . "\r\n";

            if (mail($to, $subject, $body, $headersO)) {
                $data = array("message" => "Password reset link sent, check mail", "status" => "success");
            } else {
                mail($to, $subject, $body, $headers);
                $data = array("message" => "Email seems to be wrong, Try again.", "status" => "success");
            }
        } else {
            $data = array("message" => "Username did not, try something else.", "status" => "username_error");
        }
    } else {
        // echo $conn->error;
        $data = array("message" => "Something went wrong!", "status" => "server_error");
    }
}
echo json_encode($data);
return;
