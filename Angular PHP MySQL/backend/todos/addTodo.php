<?php

require '../shared/config.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->content))
{
  $content  = strip_tags($data->content);  
  $userid = strip_tags($data->userid);  
  $category = strip_tags($data->category);  

  $query = $pdo->prepare("insert into todos (content, userid, category) values (:content, :userid, :category)");
    
    $query->bindParam(':content', $content);    
    $query->bindParam(':userid', $userid);       
    $query->bindParam(':category', $category);       

    if(!$query->execute())
    {
      header("HTTP/1.0 404 Not Found");
      echo json_encode(array("error" => "Mauvais identifiant"));
    } else {      
      header("HTTP/1.0 201 CREATED");    

      $data=array(
        "id"=>$pdo->lastInsertId(),
        "content"=>$content, 
        "userid"=>$userid,
        "state"=>false,   
        "category" => $category,     
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