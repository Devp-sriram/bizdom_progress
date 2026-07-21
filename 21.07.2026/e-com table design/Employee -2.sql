USE test

-- Display all employee details sorted by salary in ascending order.

SELECT * FROM Employees 
ORDER BY salary ASC

-- Display all employee details sorted by salary in descending order.

SELECT * FROM Employees 
ORDER BY salary DESC

-- Display employee names and salaries sorted alphabetically by employee name.

SELECT ename , salary FROM Employees 
ORDER BY ename ASC

-- Display all employees sorted by hire date (oldest to newest).

SELECT * FROM Employees 
ORDER BY hiredate ASC

-- Display all employees sorted by hire date (newest to oldest).

SELECT * FROM Employees 
ORDER BY hiredate DESC

-- Display all employees sorted first by department number and then by salary in ascending order.

SELECT * FROM Employees 
ORDER BY deptno ASC , salary ASC

-- Display all employees sorted first by job and then by employee name.

SELECT * FROM Employees 
ORDER BY job , ename

-- Display all employees sorted by commission in descending order.

SELECT * FROM Employees 
ORDER BY commission DESC


--Display employee names, job, and salary sorted by job (ascending) and salary (descending).

SELECT ename , job , salary FROM Employees 
ORDER BY job ASC  , salary DESC

-- Display all employees sorted first by manager number and then by employee number.

SELECT * FROM Employees 
ORDER BY manager_id , empno



-- aggregation

-- Find the total number of employees.

SELECT count(*) AS Employee_count FROM Employees 

-- Find the highest salary among all employees.

SELECT MAX(salary) AS highest_salary FROM Employees

--Find the lowest salary among all employees.

SELECT MIN(salary) AS highest_salary FROM Employees

-- Find the average salary of all employees.

SELECT AVG(salary) AS average_salary  FROM Employees

-- Find the total salary paid to all employees.

SELECT SUM(salary) AS total_salary  FROM Employees

-- Find the total commission paid to employees.

SELECT SUM(commission) AS total_commission FROM Employees

-- Find the average commission of employees who receive a commission.

SELECT AVG(commission) AS total_commission FROM Employees
WHERE commission IS NOT NULL

-- Count the number of employees in each department.

SELECT count(*) AS Employee_count , deptno FROM Employees 
GROUP BY deptno


-- Find the highest salary in each department.

SELECT MAX(salary) , deptno FROM Employees
GROUP BY deptno

-- Find the average salary for each job.

SELECT AVG(salary) AS average_salary , job FROM Employees
GROUP BY job


SELECT salary FROM Employees 
WHERE deptno = 35
ORDER BY salary DESC






