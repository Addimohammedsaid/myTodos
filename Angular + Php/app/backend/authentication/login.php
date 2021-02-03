<?php
  require "../shared/config.php";

  $data = json_decode(file_get_contents("php://input"));

  if(!empty($data->username) && !empty($data->password))
  {

    $username = strip_tags($data->username);
    $password = strip_tags($data->password);
    
    $query = $pdo->prepare("select * from users where username = ? ");
    $query->execute(array($username));
    $data = $query->fetch();
    
            
    if(!$data)
    {
      header("HTTP/1.0 404 Not Found");
      echo json_encode(array("error" => "Mauvais identifiant"));
    }
    else
    {
      $isPasswordCorrect = password_verify($password, $data['password']); 

      if($isPasswordCorrect)
      {
        $data=array(
          "id"=>$data["id"],
          "username"=>$username,           
        );

        echo json_encode(array("data" => $data));
      }
      else {
        header("HTTP/1.1 404 Not Found");
        echo json_encode(array("error" => "Mauvais  mot de passe"));
      }
    }
  }

?>