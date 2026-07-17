-- Online SQL Editor to Run SQL Online.
-- Use the editor to create new tables, insert data and all other SQL operations.

SELECT * FROM Customers
WHERE country != 'UK' AND (first_name LIKE 'J%' OR first_name like '%d')

INSERT INTO Customers (customer_id,first_name,last_name,age,country)
VALUES (7 , 'Sriram' , 'Raman' , 22 , 'IND')

SELECT AVG(age) FROM Customers
 
SELECT c.customer_id , c.first_name , o.item , o.amount FROM Customers c----
JOIN Orders o ON c.customer_id = o.customer_id
ORDER BY o.amount 5	

SELECT COUNT(*) AS people_count ,age, country FROM Customers
GROUP BY country
HAVING age > 25;

    