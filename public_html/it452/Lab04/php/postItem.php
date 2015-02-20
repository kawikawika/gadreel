<?php 
require_once('myConnectDB.php');
require_once('security.php'); 

header("Content-type: text/plain");

//Connect to database
@ $db = new myConnectDB(); 
///check for errors
$errno = mysqli_connect_errno();
if ($errno){
	echo "<error>*Could not connect to server. Please try again later.</error>"; // db error
	return;
}

$price       = $_REQUEST['price'];
$item_name   = $_REQUEST['item_name'];
$description = $_REQUEST['description'];

if(!$price) {
	echo "<error>Please enter a price for the item.</error>";
	return;
} else {
	if( !preg_match('/^[0-9]{1,10}.[0-9]{0,2}$/', $price) ) {
		echo "<error>Price needs to be in a valid money format.</error>";
		return;
	}	
}

if(!$item_name) {
	echo "<error>Please enter a name for the item.</error>";
	return;
}

$response = security::postItem($db, $item_name, $price, $description);
//$response = true;
if(!$response) {
	echo "<error>Could not post item to server</error>";
	return;
}

echo "<error></error>";

//close db connection
$db->close();
?>
