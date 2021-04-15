<?php

require_once("Connect.php");

$db = new Connect();

if(isset($_POST['SKU']))            $SKU =  $_POST['SKU'];
if(isset($_POST['productname']))    $product_name =  $_POST['productname'];
if(isset($_POST['price']))          $price =  $_POST['price'];
if(isset($_POST['type']))           $type =  $_POST['type'];
if(isset($_POST['size_mb']))        $size_mb =  $_POST['size_mb'];
if(isset($_POST['height']))         $height =  $_POST['height'];
if(isset($_POST['width']))          $width =  $_POST['width'];
if(isset($_POST['length']))         $length =  $_POST['length'];
if(isset($_POST['weight']))         $weight =  $_POST['weight'];


$array = [
    "SKU" => $SKU,
    "name" => $product_name,
    "price" => $price,
    "type" => $type,
    "size_mb" => $size_mb,
    "height" => $height,
    "width" => $width,
    "length" => $length,
    "weight" => $weight
];

$db->query("INSERT INTO `test`(`SKU`, `name`, `price`, `unit_type`, `size_mb`, `height`, `width`, `length`, `weight`) VALUES 
(:SKU, :name, :price, :type, :size_mb, :height, :width, :length, :weight)", $array)

?>