CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE role(
	id SERIAL PRIMARY KEY,
	role VARCHAR(50)

);

CREATE TABLE users(
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	username VARCHAR(100) NOT NULL,
	hash VARCHAR(500) NOT NULL,
	user_role int NOT NULL

);


SELECT * FROM users;
SELECT * FROM role;
DELETE * FROM role;
DROP TABLE users;

SELECT r.role FROM USERS u JOIN Role r ON u.user_role = r.id WHERE u.username = 'JohnAdmin';


INSERT INTO role (role) Values ('PT_Staff');

DROP TABLE users;

ALTER TABLE users
ADD CONSTRAINT fk_user_role FOREIGN KEY (user_role) REFERENCES role(id);
