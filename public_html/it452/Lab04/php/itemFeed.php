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

$itemId=$_POST['lastItemId'];

$response = security::itemFeed($db, $itemId);
if( $response ) {		
	echo '<items>';
	while($row = $response->fetch_assoc()) {
		echo
		"<item>".
			"<id>".$row['id']."</id>".
			"<name>".$row['name']."</name>".
			"<price>".$row['price']."</price>".
			"<description>".$row['description']."</description>".
			"<timestamp>".$row['timestamp']."</timestamp>".
			"<lookingFor>".$row['lookingFor']."</lookingFor>".
			"<userId>".$row['userId']."</userId>".
			"<pictures><picture>".$row['pictures']."</picture></pictures>".
		"</item>";
	}
	echo '</items>';
}
else{
	echo null; // nothing left
}

//close db connection
$db->close();
?>
