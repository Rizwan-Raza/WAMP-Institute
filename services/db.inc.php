<?php

class DB
{
    private static $server = "localhost";
    private static $username = "root";
    private static $password = "";
    private static $dbname = "institute";

    // private static $server = "localhost";
    // private static $username = "wamproot";
    // private static $password = "Proton@123";
    // private static $dbname = "digi-institute";

    public static function getConnection()
    {
        return new mysqli(self::$server, self::$username, self::$password, self::$dbname);
    }
}
