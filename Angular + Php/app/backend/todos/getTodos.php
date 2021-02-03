<?php

require '../shared/config.php';

if(isset($_GET['id']) && isset($_GET['category']))
{

    $userid = preg_replace("#[^0-9]#",'',$_GET['id']); 
    
    $category = preg_replace("#[^0-9]#",'',$_GET['category']); 

    $query = $pdo->prepare("SELECT * FROM todos WHERE userid =:userid AND category =:category ORDER BY id DESC");
    
    $query->bindParam(':userid', $userid);    

    $query->bindParam(':category', $category);  

    $query->execute();

    $count = $query->rowCount();

    $data = $query->fetchAll(PDO::FETCH_OBJ);

    if($count > 0)
    {      
      header("HTTP/1.0 200 OK");    
      echo json_encode(array("data"=>$data,"count"=>$count));
    }
    else {
      header("HTTP/1.0 200 OK"); 
      echo json_encode(array("state" => "empty"));
    }
}
else
{
  header('HTTP/1.0 400 Bad Request');
  echo json_encode(array("error" => "data is incomplete"));
}

?>