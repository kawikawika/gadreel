-- Author: Kawika Barabin
-- Adding test data into the database

/* change default delimiter to $$ */
DELIMITER $$

-- Creates a location entry for each new user
DROP TRIGGER IF EXISTS afterInsert_user$$
CREATE TRIGGER afterInsert_user AFTER INSERT ON user
FOR EACH ROW
BEGIN
	INSERT INTO location (id, lat, lon, location_name)
	VALUES (new.id, 0, 0, 'unknown');
END$$

DELIMITER ;
