<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// include database and object files
include_once '../config/database.php';
include_once '../objects/category.php';
  
// get database connection
$database = new Database();
$db = $database->getConnection();
  
// prepare category object
$category = new Category($db);
  
// set ID property of record to read
$category->id = isset($_GET['id']) ? $_GET['id'] : die();

// read the details of category to be edited
$category->readOne();
  
if($category->name!=null){
    // create array
    $category_arr = array(
        "id" =>  $category->id,
        "name" => $category->name,
        "description" => $category->description
    );
  
    // set response code - 200 OK
    http_response_code(200);
  
    // make it json format
    echo json_encode($category_arr);
}
  
else{
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user product does not exist
    echo json_encode(array("message" => "Product does not exist."));
}
