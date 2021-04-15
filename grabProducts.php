<?php
require_once("Connect.php");

$db = new Connect();

$db->query("SELECT * FROM test", []);
$products = $db->rows();

echo json_encode($products);
?>