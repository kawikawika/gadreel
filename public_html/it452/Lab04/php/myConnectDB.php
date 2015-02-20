<?php
/*This class extends the mysqli class, 
so it has all functionality expected from the mysqli;
Additionally, it provides default values for the parameters in the constructor,
so they don't need to be specified every time we connect to a db*/
class myConnectDB extends mysqli{
	
	public function __construct($hostname='cardhu.cs.usna.edu',	
		$user='m150336',
		$password='m150336', 
		$dbname='m150336'){
		parent::__construct($hostname, $user, $password, $dbname);
	}
}
?>
