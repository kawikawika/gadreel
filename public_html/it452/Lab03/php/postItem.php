<?php 
require_once('myConnectDB.php');
require_once('security.php'); 

header("Content-type: text/xml");

//Connect to database
@ $db = new myConnectDB(); 
///check for errors
$errno = mysqli_connect_errno();
if ($errno){
	echo "*Could not connect to server. Please try again later."; // db error
	return;
}

$item_name=$_POST['item_name'];
$price=$_POST['price'];
$description=$_POST['description'];

$response = security::postItem($db, $item_name, $price, $description);
if($response) {
	echo "posted";	
} else {
	echo "not posted";
}

//close db connection
$db->close();
?>
