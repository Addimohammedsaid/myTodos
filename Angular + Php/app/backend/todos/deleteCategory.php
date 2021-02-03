<?php
require "../shared/config.php";

if($_GET['id'])
{
  $id= preg_replace("#[^0-9]#",'',$_GET['id']);

  // delete category
  $query=$pdo->prepare("delete from categories
                        where id = :id") or die (print_r($pdo->errorInfo()));

  $query->bindParam(":id", $id);                    

  if($query->execute()) echo json_encode("Category was deleted successfully");

  // delete todos from the tree 
  $query=$pdo->prepare("delete from todos
                        where category = :id") or die (print_r($pdo->errorInfo()));

  $query->bindParam(":id", $id);                    

  if($query->execute()) echo json_encode("Todos of $id category was deleted successfully");

  else echo json_encode("someting wrong happend !");
}

?>
