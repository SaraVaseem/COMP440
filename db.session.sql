USE registration;
select * from listings



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

ALTER TABLE listings
ADD CONSTRAINT fk_listings_username
FOREIGN KEY (username) REFERENCES user(username);


USE registration;

CREATE TABLE review (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255),
  listing_id INT,
  rating TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (username) REFERENCES user(username),
  FOREIGN KEY (listing_id) REFERENCES listings(id)
);