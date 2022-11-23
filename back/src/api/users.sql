CREATE SCHEMA crud_react;
USE crud_react;
CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    gender CHAR(1),
    phone VARCHAR(15)
);