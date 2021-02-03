<?php

require '../shared/config.php';
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->username) && !empty($data->password))
{
  $username  = preg_replace("#[^a-zA-Z0-9 -.]#","",$data->username);
  $password = strip_tags($data->password);


  $options = ['cost' => 12];
  $password_hash = password_hash($password, PASSWORD_DEFAULT, $options);

  // check if the username is unique
  $userNameExist = $pdo->prepare("select username from users where username = ?");
  $userNameExist->execute(array($username));
  $count = $userNameExist->rowCount();

  if($count) 
  {
    json_encode(array("error" => "l'utilisateur existe déjà"));
  }
  else
  {
    $query = $pdo->prepare("insert into users (username, password) 
    values (:username, :password)");
    
    $query->bindParam(':username', $username);
    $query->bindParam(':password', $password_hash);

    if($query->execute())
    {
      header('HTTP/1.0 201 CREATED');
      $data=array(
        "id"=>$pdo->lastInsertId(),
        "username"=>$username,           
      );

      echo json_encode(array("data" => $data));
    }
  }
}else
{
  header('HTTP/1.0 400 Bad Request');
  echo json_encode(array("error" => "data is incomplete"));
}

?>