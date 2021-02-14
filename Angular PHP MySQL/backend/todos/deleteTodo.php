<?php
require "../shared/config.php";

if($_GET['id'])
{
  $id= preg_replace("#[^0-9]#",'',$_GET['id']);

  $query=$pdo->prepare("delete from todos
                        where id = :id") or die (print_r($pdo->errorInfo()));

  $query->bindParam(":id",$id);                    

  if($query->execute()) echo json_encode("Todos was deleted successfully");

  else echo json_encode("someting wrong happend !");
}

?>
