<?php
require_once("Connect.php");

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
$db = new Connect();

if ($contentType === "application/json") {
    $content = trim(file_get_contents("php://input"));

  $decoded = json_decode($content, true);
  var_dump($decoded);
    $i = 0;
    while($i < count($decoded['ids'])){
        $db->query("DELETE FROM test WHERE id = :id", ['id' => $decoded["ids"][$i]]);
        $i++;
    }
}


?>