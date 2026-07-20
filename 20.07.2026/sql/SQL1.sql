USE test


CREATE TABLE customers (
  id INT PRIMARY KEY
 ,name VARCHAR(25)
 ,country VARCHAR(3)
)

CREATE TABLE orders (
  id INT PRIMARY KEY
 ,item VARCHAR(60)
 ,amount INT
 ,customer_id INT
 ,CONSTRAINT FK_Orders_Customers FOREIGN KEY (customer_id) REFERENCES customers (id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
)

SELECT
  *
FROM customers
SELECT
  *
FROM orders

INSERT INTO customers (id, name, country)
  VALUES (2, 'lawrance', 'JPN'),
  (3, 'lewis', 'UK'),
  (4, 'max verstappen', 'NET'),
  (5, 'charles leclerc', 'MON'),
  (6, 'oscar piastri', 'AUS')

INSERT INTO orders (id, item, amount, customer_id)
  VALUES (1, 'MSI gaming laptop', '120000', 4)


UPDATE orders
SET customer_id = 1
WHERE id = 1

UPDATE customers
SET id = 10
WHERE id = 1


INSERT INTO orders (id, item, amount, customer_id)
  VALUES (2, 'Nvida RTX 5090 ', '120000', 2),
  (3, 'AMD Radon RX 9700 XTX 24GB GRRD VRAM grapics card', '200000', 2),
  (4, 'Intel Core i9 14900k 24 thread processor', '70000', 3),
  (5, 'ASUS TUF gaming A16 gaming laptop', '60000', 4)


SELECT
  o.item
 ,c.name
 ,o.amount
 ,c.country
FROM customers c
JOIN orders o
  ON c.id = o.customer_id;


UPDATE orders
SET item = 'AMD Radon RX 9700 XTX 24GB GRRD5 VRAM grapics card'
WHERE id = 3


CREATE TABLE products (
  id INT PRIMARY KEY
 ,name VARCHAR(60)
 ,price INT
 ,description VARCHAR(150)
 ,tax INT
 ,stock INT
 ,prime BIT
 ,TIMESTAMP
)



INSERT INTO products (id, name, price, description, tax, stock, prime)
  VALUES (3, 'Nvida RTX 5090 8gb GDDR5 VRAM Grafics card', 120000, 'Grafics card with 8gb vram best fpr gaming', 2, 10, 1)


EXEC sp_rename 'dbo.products.TIMESTAMP'
              ,'created_at'
              ,'COLUMN';



-- ADD CONSTRAINT created_at DEFAULT GETDATE() FOR created_at;

ALTER TABLE products
ADD created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP


CREATE PROCEDURE order_product @qty INT,
@id INT
AS
BEGIN
  IF EXISTS (SELECT
        *
      FROM products p
      WHERE p.id = @id
      AND p.stock >= @qty)
  BEGIN
    UPDATE products
    SET stock = stock - @qty
    WHERE id = @id;
  END
END
GO


EXEC order_product 2
                  ,2

SELECT
  *
FROM products p


SELECT
  COUNT(*)
 ,department
FROM employees
WHERE salary > 100
GROUP BY department