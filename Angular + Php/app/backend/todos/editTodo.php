<?php

require '../shared/config.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->content))
{
  $content  = strip_tags($data->content);  
  $id = strip_tags($data->id);  

  $query = $pdo->prepare("UPDATE todos SET content= :content WHERE id = :id");
    
    $query->bindParam(':content', $content);    
    $query->bindParam(':id', $id);       

    if(!$query->execute())
    {
      header("HTTP/1.0 404 Not Found");
      echo json_encode(array("error" => "Mauvais identifiant"));
    } else {      
      header("HTTP/1.0 201 CREATED");    

      $data=array(
        "content"=>$content, 
        "id"=>$id,        
        "state"=>false,        
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