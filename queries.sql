CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE roles(
	id SERIAL PRIMARY KEY,
	role VARCHAR(50) NOT NULL

);

CREATE TABLE users(
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	username VARCHAR(100) NOT NULL UNIQUE,
	hash VARCHAR(500) NOT NULL,
	user_role INT NOT NULL,
	clockin_status BOOLEAN DEFAULT FALSE,
	CONSTRAINT fk_user_role FOREIGN key(user_role) REFERENCES roles(id)
	
);

CREATE TABLE clock_entries (
	id SERIAL PRIMARY KEY,
	user_id UUID NOT NULL,
	clock_in_time TIMESTAMP,
	clock_out_time TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

	
SELECT * FROM users;
DELETE FROM users;
SELECT * FROM roles;
DELETE * FROM role;
DROP TABLE users;
DROP TABLE role;
SELECT * FROM clock_entries;
DELETE FROM clock_entries;

SELECT r.role FROM USERS u JOIN Role r ON u.user_role = r.id WHERE u.username = 'JohnAdmin';


INSERT INTO roles (role) Values ('pt_staff');

DROP TABLE users;

ALTER TABLE users
ADD CONSTRAINT fk_user_role FOREIGN KEY (user_role) REFERENCES role(id);
