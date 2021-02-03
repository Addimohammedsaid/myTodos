<?php

require '../shared/config.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->category))
{
  $category  = strip_tags($data->category);  
  $userid = strip_tags($data->userid);  

  $query = $pdo->prepare("insert into categories (category, userid) values (:category, :userid)");
    
    $query->bindParam(':category', $category);    
    $query->bindParam(':userid', $userid);       

    if(!$query->execute())
    {
      header("HTTP/1.0 404 Not Found");
      echo json_encode(array("error" => "Mauvais identifiant"));
    } else {      
      header("HTTP/1.0 201 CREATED");    

      $data=array(
        "id"=>$pdo->lastInsertId(),
        "category"=>$category, 
        "userid"=>$userid,             
      );
      
      echo json_encode(array("data"=>$data));
    }
 }
else
{
  header('HTTP/1.0 400 Bad Request');
  echo json_encode(array("error" => "data is incomplete"));
}

?>