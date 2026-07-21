USE test

CREATE TABLE Employees(
   id INT PRIMARY KEY,
   empno INT,
   ename VARCHAR(20),
   job VARCHAR(20),
   manager_id INT,
   hiredate DATE,
   salary DECIMAL(10,2),
   commission INT,
   deptno INT
)

SELECT * FROM Employees e

ALTER TABLE Employees
ALTER COLUMN manager_id INT

EXEC sp_rename 'dbo.Employees.manager' , 'manager_id' , 'COLUMN'


INSERT INTO Employees
VALUES (1 ,1045 , 'sriram' , 'DEVELOPER' , 7698 , '1981-12-01', 35000 , 1000 , 10),
(2 ,1345 , 'Lewis hamilton' , 'DEVOPS' , 7000 , '1986-12-01', 20000 , 1500 , 15),
(3 ,3333 , 'max verstappen' , 'TESTER' , 7698 , '2003-01-17', 35000 , 2000 , 30)

INSERT INTO Employees
VALUES (4 ,9876 , 'charle leclerc' , 'DEVELOPER' , 5678 , '2010-12-1', 50000 , 10000 , 35),
(5 ,9877 , 'lando norris' , 'DEVOPS' , 7000 , '2012-12-1', 60000 , 1500 , 15),
(6 ,9878 , 'george russel' , 'TESTER' , 7698 , '2022-1-17', 35000 , 2000 , 30)

INSERT INTO Employees
VALUES (7 ,4567 , 'franco colapinto' , 'DEVELOPER' , 7890 , '2020-12-1', 500 , 100 , 35)


INSERT INTO Employees
VALUES (8 ,7865 , 'jack dohan' , 'CLERK' , 2345 , '2020-12-1', 500 , 100 , 35)

INSERT INTO Employees (  id , empno , ename, job , manager_id , hiredate , salary , deptno )
VALUES (9 ,7865 , 'sparoow' , 'CLERK' , 2345 , '2020-12-1', 500 , 35)

INSERT INTO Employees
VALUES (10 ,3456 , 'NEON' , 'DEVELOPER' , 7890 , '2020-12-1', 2500 , 100 , 35)

INSERT INTO Employees
VALUES (11 ,9067 , 'neo ' , 'MANAGER ' , 2678 , '2020-12-1', 25000 , 1000 , 35)

INSERT INTO Employees
VALUES (12 ,4098 , 'WESKER ' , 'ANALYST ' , 2678 , '2020-12-1', 2500 , 1000 , 35)

INSERT INTO Employees
VALUES (13 ,4098 , 'LEVEL' , 'ANALYST ' , 2678 , '2020-12-1', 2500 , 1000 , 35)
INSERT INTO Employees
VALUES (14 ,4098 , 'LEVEL' , 'ANALYST ' , 2678 , '2020-12-1', 1500 , 1000 , 35)
INSERT INTO Employees
VALUES (15 ,4098 , 'LEVEL' , 'ANALYST ' , 2678 , '2020-12-1', 3000 , 1000 , 35)

-- Display all employee records.

SELECT * FROM Employees e


-- Display only empno, ename, and sal.

SELECT empno , ename , salary FROM Employees e

-- Display all employee names.

SELECT ename  FROM Employees e

-- Display all distinct job roles.

SELECT DISTINCT(job) FROM Employees e

-- Display employees belonging to department 10.

SELECT * FROM Employees 
WHERE deptno = 10

-- Display employees whose salary is greater than 3000.

SELECT * FROM Employees e
WHERE e.salary > 3000

 -- Display employees whose salary is less than 1500.

SELECT * FROM Employees e
WHERE e.salary < 1500
+

-- Display employees whose job is 'CLERK'.

SELECT * FROM Employees e
WHERE job = 'CLERK'

-- Display employees hired after 01-JAN-1982.

SELECT * FROM Employees e
WHERE e.hiredate > '1982-01-01'

-- Display employees whose commission is not NULL.

SELECT * FROM Employees e
WHERE e.commission IS NOT NULL


-- Display employees whose salary is between 1500 and 3000.

SELECT * FROM Employees e
WHERE e.salary BETWEEN 1500 AND 3000

-- Display employees whose department number is 10 or 30.

SELECT * FROM Employees e
WHERE e.deptno IN (10, 30)


-- Display employees whose job is MANAGER or ANALYST.

SELECT * FROM Employees e
WHERE e.job IN ('MANAGER' , 'ANALYST')

-- Display employees whose names start with 'S'.

SELECT * FROM Employees e
WHERE e.ename LIKE 'S%'

-- Display employees whose names end with 'R'.

SELECT * FROM Employees e
WHERE e.ename LIKE '%R'

-- Display employees whose names contain the letter 'A'.

SELECT * FROM Employees e
WHERE e.ename LIKE '%A%'

-- Display employees whose names have exactly five letters.

SELECT * FROM Employees e
WHERE e.ename LIKE '_____'


 -- Display employees whose commission is NULL.

SELECT * FROM Employees e
WHERE e.commission IS NULL

-- Display employees whose manager ID is 7698.

SELECT * FROM Employees e
WHERE e.manager_id = 7698

-- Display employees whose salary is not equal to 3000.
SELECT * FROM Employees e
WHERE e.salary != 3000
/*
SELECT FROM Employees
WHERE job = (
SELECT MIN(salary) FROM Employees
  GROUP BY job
)*/

/*
SELECT ename , job FROM Employees 
GROUP BY job
HAVING salary = ( SELECT MIN(salary) FROM Employees GROUP BY  )
*/

-- WHERE salary = (SELECT MIN(salary) FROM Employees)
/*
SELECT job FROM Employees 
WHERE salary = (
SELECT min(salary) FROM Employees
GROUP BY job 
) */


SELECT MIN(salary) FROM  Employees
GROUP BY job
