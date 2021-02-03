<?php

require '../shared/config.php';

if($_GET['id'])
{

    $userid = preg_replace("#[^0-9]#",'',$_GET['id']); 

    $query = $pdo->prepare("SELECT * FROM categories WHERE userid =:userid ORDER BY id DESC");
    
    $query->bindParam(':userid', $userid);    

    $query->execute();

    $count = $query->rowCount();

    $data = $query->fetchAll(PDO::FETCH_OBJ);

    if(!$data)
    {
      header("HTTP/1.0 404 Not Found");
      echo json_encode(array("error" => "Mauvais identifiant"));
    } else {      
      header("HTTP/1.0 200 OK");    
      echo json_encode(array("data"=>$data,"count"=>$count));
    }
}
else
{
  header('HTTP/1.0 400 Bad Request');
  echo json_encode(array("error" => "data is incomplete"));
}

?>