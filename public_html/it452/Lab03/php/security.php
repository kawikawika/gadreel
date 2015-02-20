<?php
// so that all of the functions are in one place
class Security {

	// TODO: add in location to get only feeds in current location
	public static function itemFeed($db, $lastItemId) {

		//TODO: LOCATION
		// lastItemId handles the loading only portions of the feed
		// prevents loading 500 items at once, infinite scrolling
		// pulls more data
		if($lastItemId=='null') {
			$query = "SELECT item.id, item.item_name AS name, item.price, item.description, item.stamp AS timestamp, item.looking_for AS lookingFor, item.user_id AS userId, GROUP_CONCAT(item_picture.imgpath SEPARATOR '</picture><picture>') AS pictures FROM item, item_picture WHERE item.id=item_picture.item_id GROUP BY item_picture.item_id ORDER BY item.id DESC LIMIT 30;";
		} else {
			$query = "SELECT item.id, item.item_name AS name, item.price, item.description, item.stamp AS timestamp, item.looking_for AS lookingFor, item.user_id AS userId, GROUP_CONCAT(item_picture.imgpath SEPARATOR '</picture><picture>') AS pictures FROM item, item_picture WHERE item.id=item_picture.item_id AND item.id<$lastItemId GROUP BY item_picture.item_id ORDER BY item.id DESC LIMIT 30;";
		}

		$result = $db->query($query);
		if( !$result || $db->affected_rows == 0 ) {
			return null; // could mean that there are no more posts left
		}
		return $result;
	}

	public static function item($db, $itemId) {

		//TODO: LOCATION
		$query = "SELECT item.id, item.item_name AS name, item.price, item.description, item.quantity, item.stamp AS timestamp, item.looking_for AS lookingFor, item.user_id AS userId, user.fname, user.picture AS userPhoto, GROUP_CONCAT(item_picture.imgpath SEPARATOR '</picture><picture>') AS pictures FROM item, item_picture, user WHERE item.id=item_picture.item_id AND item.user_id=user.id AND item.id=$itemId GROUP BY item_picture.item_id;";

		$result = $db->query($query);
		if( !$result || $db->affected_rows == 0 ) {
			return null; // could mean that there are no more posts left
		}
		return $result;
	}

	public static function search($db, $search, $last) {
		
			//parse $search
			/*
			if(preg_match("/filter/i", $search)) {

			} elseif(preg_match("/sort/i", $search)) {

			} else {
			*/
				// normal searches
			$temp=$search;
			$search="AND (item.item_name COLLATE LATIN1_SWEDISH_CI LIKE '%$temp%' OR item.description COLLATE LATIN1_SWEDISH_CI LIKE '%$temp%')";
		//	}

			$query = "SELECT item.id, item.item_name AS name, item.price, item.description, item.stamp AS timestamp, item.looking_for AS lookingFor, GROUP_CONCAT(item_picture.imgpath SEPARATOR '</picture><picture>') AS pictures FROM item, item_picture WHERE item.id=item_picture.item_id $search GROUP BY item_picture.item_id ORDER BY item.id DESC LIMIT $last,30;";

		$result = $db->query($query);
		if( !$result || $db->affected_rows == 0 ) {
			return null; // could mean that there are no more posts left
		}
		return $result;
	}

	
	public static function postItem($db, $item_name, $price, $description) {
		$query = "INSERT INTO item (user_id, item_name, price, description) VALUES (1, '$item_name', $price, '$description')";

		$result = $db->query($query);
		if(!$result) {
			return false; // could mean that there are no more posts left
		}

		$query = "INSERT INTO item_picture (item_id, imgpath) VALUES (LAST_INSERT_ID(), 'img/item/default.png')";

		$result = $db->query($query);
		if(!$result) {
			return false; // could mean that there are no more posts left
		}
		return true;
	}
	
}

		
?>
