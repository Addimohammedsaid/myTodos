<?php

$dbname = "myTodo";
$dbpassword = "";
$dbusername = "root";

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: http://localhost:8000");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");

try
{
    $pdo = new PDO("mysql:host=localhost", $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $dbname = "`".str_replace("`","``",$dbname)."`";
    $pdo->query("CREATE DATABASE IF NOT EXISTS $dbname");
    $pdo->query("use $dbname");    
    
    // todos tabel
    $table = "todos";

    $sql ="CREATE TABLE IF NOT EXISTS $table(
        id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
        userid INT( 11 ) NOT NULL, 
        content VARCHAR( 250 ) NOT NULL,
        category VARCHAR( 250 ) NOT NULL,
        state BOOLEAN NOT NULL);" ;

    $pdo->exec($sql);

    // table categories
    $table = "categories";

    $sql ="CREATE TABLE IF NOT EXISTS $table(
        id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,
        userid INT( 11 ) NOT NULL, 
        category VARCHAR( 250 ) NOT NULL);" ;

    $pdo->exec($sql);

    // table categories
    $table = "users";

    $sql ="CREATE TABLE IF NOT EXISTS $table(
        id INT( 11 ) AUTO_INCREMENT PRIMARY KEY,        
        username VARCHAR( 250 ) NOT NULL,
        password VARCHAR( 250 ) NOT NULL);" ;

    $pdo->exec($sql);    
 
}
catch(Exception $e)
{
die('Erreur : '.$e->getMessage());
}

?>