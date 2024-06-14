CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE role(
	id SERIAL PRIMARY KEY,
	role VARCHAR(50)

);

CREATE TABLE users(
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	name VARCHAR(100),
	username VARCHAR(100),
	hash VARCHAR(500),
	user_role int

);

SELECT * FROM users;
DELETE * FROM role;

INSERT INTO role (role) Values ('PT_Staff');

DROP TABLE users;
