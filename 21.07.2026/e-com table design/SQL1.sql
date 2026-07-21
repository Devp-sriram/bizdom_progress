CREATE DATABASE ecom

USE ecom

CREATE TABLE users (
  id INT PRIMARY KEY
 ,name VARCHAR(25)
 ,phone VARCHAR(10)
 ,address VARCHAR(100)
)

SELECT
  *
FROM users

INSERT INTO users (id, name, phone, address)
  VALUES (1, 'sriram', '8428319010', 'NO 8 AR PG Vivekananthar street , kandhanchavadi , chennai')

INSERT INTO users (id, name, phone, address)
  VALUES (2, 'lewis', '9876543210', 'NO 9 AR PG Vivekananthar street , kandhanchavadi , chennai'),
  (3, 'max', '8901234567', 'NO 9 AR PG Vivekananthar street , kandhanchavadi , chennai'),
  (4, 'lando', '7890123456', 'NO 10 AR PG Vivekananthar street , kandhanchavadi , chennai'),
  (5, 'charle leclerc', '6789012345', 'NO 11 AR PG Vivekananthar street , kandhanchavadi , chennai')


CREATE TABLE category (
  id INT PRIMARY KEY
 ,name VARCHAR(25)
)

SELECT
  *
FROM category

INSERT INTO category (id, name)
  VALUES (1, 'electronics'),
  (2, 'toys'),
  (3, 'clothes')

CREATE TABLE products (
  id INT PRIMARY KEY
 ,name VARCHAR(40)
 ,description VARCHAR(100)
 ,category_id INT
 ,price INT
 ,tax INT
 ,stock INT
 ,CONSTRAINT FK_product_catgeory FOREIGN KEY (category_id) REFERENCES category (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
)

SELECT
  *
FROM products

INSERT INTO products (id, name, description, category_id, price, tax, stock)
  VALUES (1, 'Nvidia RTX 5090 16GB VRAM Grafics card', 'Grafics card with 8GB ram high end nvidia card on market ', 1, 120000, 2, 10)

INSERT INTO products (id, name, description, category_id, price, tax, stock)
  VALUES (2, 'Hot Wheels die cast cars', 'die cast cars exclusive hot wheels', 2, 350, 3, 10),
  (3, 'Levis ', 'Premium denium pant', 3, 1500, 5, 10),
  (4, 'ASUS TUF Gaming A15 Gaming Laptop', 'Gaming Laptop', 1, 150000, 2, 10),
  (5, 'RC car', 'remote control car', 2, 150, 2, 10)

-- join test passes
SELECT
  p.name
 ,c.name
FROM products p
JOIN category c
  ON p.category_id = c.id


CREATE TABLE orders (
  id INT PRIMARY KEY
 ,user_id INT
 ,product_id INT
 ,total INT
 ,qty INT
 ,CONSTRAINT FK_order_users FOREIGN KEY (user_id) REFERENCES users (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
 ,CONSTRAINT FK_order_products FOREIGN KEY (product_id) REFERENCES products (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
)

SELECT
  *
FROM orders o

INSERT INTO orders
  VALUES (1, 1, 1, 122400, 1),
  (2, 1, 2, 141, 1),
  (3, 2, 3, 3150, 2)


SELECT * FROM orders o
JOIN products p ON p.id = o.product_id


CREATE TABLE supliers (
  id INT PRIMARY KEY
 ,name VARCHAR(25)
 ,GST VARCHAR(32)
 ,product_id INT
 ,category_id INT
 ,CONSTRAINT FK_supliers_products FOREIGN KEY (product_id) REFERENCES products (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
 ,CONSTRAINT FK_supliers_category FOREIGN KEY (category_id) REFERENCES category (id)
)

SELECT * FROM supliers s

INSERT INTO supliers
VALUES (1 , 'lawrance' ,'33890890897907' , 1 , 1)

INSERT INTO supliers
VALUES (2 , 'kannan' ,'339089089453' , 2 , 2),
(3 , 'philiphs' ,'334530989798' , 3 , 3)
