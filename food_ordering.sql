-- MySQL export file
CREATE DATABASE IF NOT EXISTS food_ordering
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE food_ordering;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100)
) ENGINE=InnoDB;

CREATE TABLE restaurant (
    res_id INT AUTO_INCREMENT PRIMARY KEY,
    res_name VARCHAR(100),
    image VARCHAR(255),
    description VARCHAR(255)
) ENGINE=InnoDB;

CREATE TABLE like_res (
    user_id INT,
    res_id INT,
    date_like DATETIME,
    PRIMARY KEY (user_id, res_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (res_id) REFERENCES restaurant(res_id)
) ENGINE=InnoDB;

CREATE TABLE rate_res (
    user_id INT,
    res_id INT,
    amount INT,
    date_rate DATETIME,
    PRIMARY KEY (user_id, res_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (res_id) REFERENCES restaurant(res_id)
) ENGINE=InnoDB;

CREATE TABLE food_type (
    type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(100)
) ENGINE=InnoDB;

CREATE TABLE food (
    food_id INT AUTO_INCREMENT PRIMARY KEY,
    food_name VARCHAR(100),
    image VARCHAR(255),
    price FLOAT,
    description VARCHAR(255),
    type_id INT,
    FOREIGN KEY (type_id) REFERENCES food_type(type_id)
) ENGINE=InnoDB;

CREATE TABLE sub_food (
    sub_id INT AUTO_INCREMENT PRIMARY KEY,
    sub_name VARCHAR(100),
    sub_price FLOAT,
    food_id INT,
    FOREIGN KEY (food_id) REFERENCES food(food_id)
) ENGINE=InnoDB;

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    food_id INT,
    amount INT,
    code VARCHAR(100),
    arr_sub_id VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (food_id) REFERENCES food(food_id)
) ENGINE=InnoDB;

INSERT INTO users (full_name, email, password) VALUES
('Dang Nguyen Vu Hoang', 'dangnguyenvuhoang8384@gmail.com', '123'),
('Nguyen Thi Thu Thuy', 'nguyenthithuthuyy1905@gmail.com', '123'),
('Ngo Bich Hang', 'hanie2808@gmail.com', '123'),
('Lam Ly Hao', 'lamlyhao123@gmail.com', '123'),
('Nguyen Thi Thuy Nhung', 'nhungnguyen0211@gmail.com', '123'),
('Pham Cao Chi Thanh', 'phamcaochithanh@gmail.com', '123');

INSERT INTO restaurant (res_name, image, description) VALUES
('KFC', 'kfc.jpg', 'Gà rán'),
('Lotteria', 'lotteria.jpg', 'Fast food'),
('Highlands', 'highlands.jpg', 'Coffee');

INSERT INTO like_res (user_id, res_id, date_like) VALUES
(1, 1, NOW()),
(1, 2, NOW()),
(2, 1, NOW()),
(2, 3, NOW()),
(3, 1, NOW());

INSERT INTO rate_res (user_id, res_id, amount, date_rate) VALUES
(1, 1, 5, NOW()),
(2, 1, 4, NOW());

INSERT INTO food_type (type_name) VALUES
('Combo'),
('Drink');

INSERT INTO food (food_name, image, price, description, type_id) VALUES
('Gà rán', 'ga.jpg', 50, 'Ngon', 1),
('Coca', 'coca.jpg', 15, 'Nước ngọt', 2);

INSERT INTO sub_food (sub_name, sub_price, food_id) VALUES
('Tương ớt', 2, 1),
('Khoai chiên', 10, 1);

INSERT INTO orders (user_id, food_id, amount, code, arr_sub_id) VALUES
(1, 1, 2, 'ABC001', '1,2'),
(1, 2, 1, 'ABC002', ''),
(2, 1, 3, 'ABC003', '1'),
(4, 2, 1, 'ABC004', ''),
(2, 1, 1, 'ABC005', '2');
