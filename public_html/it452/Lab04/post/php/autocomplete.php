<?php 
require_once('../php/myConnectDB.php');
require_once('../php/security.php'); 

echo 'hello';

//Connect to database
@ $db = new myConnectDB(); 
///check for errors
$errno = mysqli_connect_errno();
if ($errno){
	echo "Could not connect to server. Please try again later."; // db error
	return;
}

$search=$_GET['q'];
$last=0;

$response = security::search($db, $search, $last);
if( $response ) {		
	while($row = $response->fetch_assoc()) {
		echo $row['name']."\n";
	}
}
else{
	echo null; // nothing left
}

//close db connection
$db->close();
?>
