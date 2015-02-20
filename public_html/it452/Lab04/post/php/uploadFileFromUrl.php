<?php
$path = __DIR__;
$url='http://3.bp.blogspot.com/-bSn7ROaX3Y4/U416-w04oYI/AAAAAAAAOoI/DuqVwXfJqX0/s1600/google-logo-high-res.png';

echo ini_get('allow_url_fopen')."\n$path\n";
if(!copy( "$url", "../../img/item/test.png")) {
	echo 'FAILED';
} else {
	echo 'SUCCESS';
}
?>
