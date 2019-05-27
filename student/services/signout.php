<?php
session_start();
$_SESSION['student'] = false;
unset($_SESSION["_sid"]);
unset($_SESSION["s_name"]);
unset($_SESSION["s_username"]);
    // echo "Done";
