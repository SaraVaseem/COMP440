select * from user

USE registration;

create table listings (
    id int AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    feature VARCHAR(255) NOT NULL,
    price int NOT NULL,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES user(username)
);