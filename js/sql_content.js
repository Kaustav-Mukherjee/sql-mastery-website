/**
 * SQL Mastery - Apple Level UI & Interactive Engine Data Source
 * Contains all standard dictionary commands and WASM-ready Practice Problems.
 */

window.SQL_COMMANDS = {
    // ==========================================
    // DQL & BASIC QUERYING
    // ==========================================
    'select': {
        title: "SELECT",
        badge: "DQL / Basic",
        diagram: `graph LR
A[Database Table] -->|SELECT *| B[Result Set]
A -->|SELECT col1, col2| C[Subset Result]
style A fill:#1c1c1e,stroke:#3a3a40
style B fill:#2997ff,color:#fff
style C fill:#2997ff,color:#fff`,
        meaning: "The SELECT statement is used to retrieve data from a database. The data returned is stored in a result table, called the result-set.",
        notes: [
            "You can specify exact columns or use '*' for all columns.",
            "It is the most frequently used SQL command.",
            "Always executed processed after FROM conceptually."
        ],
        scenario: "When you want to view the profiles of all users currently registered in your app.",
        code: `SELECT first_name, last_name, email 
FROM users;`,
        resultHtml: `<table class="sql-table" style="width:100%">
            <thead><tr><th>first_name</th><th>last_name</th><th>email</th></tr></thead>
            <tbody>
                <tr><td>Steve</td><td>Jobs</td><td>steve@apple.com</td></tr>
                <tr><td>Tim</td><td>Cook</td><td>tim@apple.com</td></tr>
            </tbody>
        </table>`,
        bestPractice: "Avoid using SELECT * in production to minimize unnecessary memory usage and network load. Explicitly name the columns you need.",
        relatedPractice: "Read the 'Beginner SELECT' problem in the Practice Arena."
    },
    'where': {
        title: "WHERE",
        badge: "DQL / Basic",
        diagram: `graph LR
A[All Rows] -->|WHERE condition| B[Filtered Rows]
style A fill:#1c1c1e,stroke:#3a3a40
style B fill:#30d158,color:#fff,stroke:none`,
        meaning: "The WHERE clause is used to filter records. It is used to extract only those records that fulfill a specified condition.",
        notes: [
            "Can be used with operators like =, <>, >, <, >=, <=, BETWEEN, LIKE, and IN.",
            "Filters rows before aggregates like GROUP BY run."
        ],
        scenario: "When you only want to see employees making over $100,000.",
        code: `SELECT current_salary, title
FROM employees
WHERE current_salary > 100000;`,
        resultHtml: `<table class="sql-table" style="width:100%">
            <thead><tr><th>current_salary</th><th>title</th></tr></thead>
            <tbody><tr><td>150000</td><td>Senior Engineer</td></tr></tbody>
        </table>`,
        bestPractice: "Index columns that are frequently used in your WHERE clauses to rapidly speed up query lookup times.",
        relatedPractice: "Solve the 'Filter by Salary' problem."
    },
    'group-by': {
        title: "GROUP BY",
        badge: "DQL / Intermediate",
        diagram: `graph TD
A[Raw Data] --> B{GROUP BY column}
B --> C[Group 1]
B --> D[Group 2]
C --> E[Aggregate (e.g. SUM)]
style B fill:#bf5af2,color:#fff`,
        meaning: "The GROUP BY statement groups rows that have the same values into summary rows.",
        notes: [
            "Often used with aggregate functions (COUNT, MAX, MIN, SUM, AVG).",
            "Must appear after WHERE and before ORDER BY."
        ],
        scenario: "Finding the total sales volume grouped by each specific store location.",
        code: `SELECT store_location, SUM(sales_amount) as total
FROM sales
GROUP BY store_location;`,
        resultHtml: `<table class="sql-table" style="width:100%">
            <thead><tr><th>store_location</th><th>total</th></tr></thead>
            <tbody><tr><td>Cupertino</td><td>10500.00</td></tr><tr><td>New York</td><td>9800.50</td></tr></tbody>
        </table>`,
        bestPractice: "Every non-aggregated column in your SELECT statement must be included in your GROUP BY clause.",
        relatedPractice: "Check 'Aggregates & Grouping' in practice."
    },
    'having': {
        title: "HAVING",
        badge: "DQL / Intermediate",
        diagram: `graph LR
A[Grouped Objects] -->|HAVING condition| B[Filtered Groups]
style A fill:#1c1c1e,stroke:#3a3a40
style B fill:#ffd60a,color:#000`,
        meaning: "The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions.",
        notes: [
            "HAVING filters data AFTER it has been grouped.",
            "WHERE filters data BEFORE it has been grouped."
        ],
        scenario: "Finding stores where the average customer rating is above 4.5.",
        code: `SELECT store_id, AVG(rating) as avg_rating
FROM reviews
GROUP BY store_id
HAVING AVG(rating) > 4.5;`,
        resultHtml: `<table class="sql-table" style="width:100%">
            <thead><tr><th>store_id</th><th>avg_rating</th></tr></thead>
            <tbody><tr><td>101</td><td>4.8</td></tr></tbody>
        </table>`,
        bestPractice: "Do not use HAVING for filtering individual rows; only use it for filtering aggregated groupings. Use WHERE instead for row-level logic.",
        relatedPractice: "Check 'Aggregates & Grouping' in practice."
    },
    'order-by': {
        title: "ORDER BY",
        badge: "DQL / Basic",
        diagram: `graph LR
A[Unsorted] -->|ORDER BY ASC/DESC| B[Sorted Data]
style B fill:#6eb6ff,color:#000`,
        meaning: "The ORDER BY keyword is used to sort the result-set in ascending or descending order.",
        notes: [
            "Sorts ascending (ASC) by default.",
            "To sort descending, use the DESC keyword."
        ],
        scenario: "Listing the top 10 most expensive products in your catalog.",
        code: `SELECT product_name, price
FROM products
ORDER BY price DESC
LIMIT 10;`,
        resultHtml: `<table class="sql-table" style="width:100%">
            <thead><tr><th>product_name</th><th>price</th></tr></thead>
            <tbody><tr><td>Pro Display XDR</td><td>4999.00</td></tr><tr><td>MacBook Pro</td><td>2499.00</td></tr></tbody>
        </table>`,
        bestPractice: "Be careful sorting extremely large un-indexed tables, as the database engine may require a slow table scan.",
        relatedPractice: "Try sorting results in the Practice Arena."
    },

    // ==========================================
    // JOINS
    // ==========================================
    'inner-join': {
        title: "INNER JOIN",
        badge: "Joins / Intermediate",
        diagram: `graph LR
A((Table A)) ---|Matches Only| B((Table B))
style A fill:#bf5af2,color:#fff
style B fill:#bf5af2,color:#fff`,
        meaning: "The INNER JOIN keyword selects records that have matching values in both tables.",
        notes: [
            "If there are no matches, the row is discarded.",
            "Most commonly used join type."
        ],
        scenario: "Fetching user details alongside their order information. Only users who placed an order actually appear.",
        code: `SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id;`,
        resultHtml: `<table class="sql-table" style="width:100%">
            <thead><tr><th>name</th><th>total</th></tr></thead>
            <tbody><tr><td>Steve</td><td>199.99</td></tr></tbody>
        </table>`,
        bestPractice: "Always specify the precise ON condition. Avoid natural joins as schema changes easily break them.",
        relatedPractice: "Solve the 'INNER JOIN basics' problem."
    },
    'left-join': {
        title: "LEFT JOIN",
        badge: "Joins / Intermediate",
        diagram: `graph LR
            A((Left Table)) --- B((Right Table))
            style A fill:#2997ff,color:#fff`,
        meaning: "The LEFT JOIN keyword returns all records from the left table, and the matched records from the right table.",
        notes: [
            "Result is NULL from the right side if there is no match.",
            "Also known as LEFT OUTER JOIN."
        ],
        scenario: "Listing all customers in the database, including the ones who have never made a purchase (order data will be NULL).",
        code: `SELECT customers.name, orders.id
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id;`,
        resultHtml: `<table class="sql-table" style="width:100%">
            <thead><tr><th>name</th><th>id</th></tr></thead>
            <tbody><tr><td>Alice</td><td>1001</td></tr><tr><td>Bob</td><td>NULL</td></tr></tbody>
        </table>`,
        bestPractice: "Use LEFT JOINs strictly when you need to preserve all records of a primary 'driving' table.",
        relatedPractice: "Check intermediate joins section."
    },

    // ==========================================
    // DML (Data Manipulation)
    // ==========================================
    'insert': {
        title: "INSERT",
        badge: "DML / Basic",
        diagram: `graph TD
A[New Data] -->|INSERT INTO| B[(Database Table)]
style A fill:#30d158,color:#fff`,
        meaning: "The INSERT INTO statement is used to insert new records in a table.",
        notes: [
            "You can insert one or multiple rows at once.",
            "If column names are not specified, you must provide values for every column."
        ],
        scenario: "Creating a new user account profile in the database when a user signs up.",
        code: `INSERT INTO users (username, created_at)
VALUES ('johndoe', '2025-01-01');`,
        resultHtml: `<table class="sql-table" style="width:100%">
            <tbody><tr><td><i data-lucide="check" style="color:#30d158"></i> 1 row inserted successfuly.</td></tr></tbody>
        </table>`,
        bestPractice: "Always define the column list explicitly `INSERT INTO table (col1, col2)` to prevent breakages if the table schema changes later.",
        relatedPractice: "Try 'Data Insertion' in Practice Editor."
    },
    'update': {
        title: "UPDATE",
        badge: "DML / Intermediate",
        diagram: `graph LR
A[Old Row State] -->|UPDATE SET| B[New Row State]
style B fill:#ffd60a,color:#000`,
        meaning: "The UPDATE statement is used to modify the existing records in a table.",
        notes: [
            "Be careful when updating records in a table! Notice the WHERE clause.",
            "If you omit the WHERE clause, ALL records will be updated!"
        ],
        scenario: "Changing a user's subscription status from 'Trial' to 'Premium'.",
        code: `UPDATE users
SET subscription = 'Premium'
WHERE user_id = 992;`,
        resultHtml: `<table class="sql-table" style="width:100%">
            <tbody><tr><td><i data-lucide="check" style="color:#30d158"></i> 1 row updated successfuly.</td></tr></tbody>
        </table>`,
        bestPractice: "Perform a SELECT with the identical WHERE clause first to ensure you are targeting the exact rows you intend to mutate.",
        relatedPractice: "Try to run an UPDATE query in the editor."
    },
    'delete': {
        title: "DELETE",
        badge: "DML / Intermediate",
        diagram: `graph LR
A[Row Exists] -->|DELETE FROM| B[Row Removed]
style A fill:#1c1c1e,stroke:red
style B fill:transparent,stroke-dasharray: 5 5`,
        meaning: "The DELETE statement is used to delete existing records in a table.",
        notes: [
            "If you omit the WHERE clause, ALL records in the table will be deleted!",
            "For removing all data while keeping the structure, TRUNCATE is usually much faster."
        ],
        scenario: "A user requests account deletion, requiring you to scrub their records from the 'accounts' table.",
        code: `DELETE FROM accounts
WHERE username = 'spam_bot_test';`,
        resultHtml: `<table class="sql-table" style="width:100%">
            <tbody><tr><td><i data-lucide="check" style="color:#30d158"></i> Row successfully deleted.</td></tr></tbody>
        </table>`,
        bestPractice: "Consider implementing 'Soft Deletes' (e.g., adding an `is_deleted` boolean flag column) instead of hard DELETEs if data history must be retained.",
        relatedPractice: "Check Data Modification tasks."
    },

    // ==========================================
    // DDL (Data Definition)
    // ==========================================
    'create-table': {
        title: "CREATE TABLE",
        badge: "DDL / Basics",
        diagram: `graph TD
A[CREATE TABLE] -->|Defines Schema| B[(New Empty Table)]
style A fill:#bf5af2,color:#fff`,
        meaning: "The CREATE TABLE statement is used to create a new table in a database.",
        notes: [
            "Requires specifying table name, column names, and their specific datatypes.",
            "Allows setting constraints like PRIMARY KEY, UNIQUE, and NOT NULL."
        ],
        scenario: "Setting up a brand new table to track user login history.",
        code: `CREATE TABLE login_history (
    id INT PRIMARY KEY,
    user_id INT NOT NULL,
    login_time DATETIME
);`,
        resultHtml: `<table class="sql-table" style="width:100%">
            <tbody><tr><td><i data-lucide="check" style="color:#30d158"></i> Table 'login_history' created successfully.</td></tr></tbody>
        </table>`,
        bestPractice: "Always name tables in lowercase using snake_case formats. Assign a strong Primary Key to every table.",
        relatedPractice: "Can you create a custom table in the Sandbox?"
    },

    // ==========================================
    // WINDOW FUNCTIONS (Advanced)
    // ==========================================
    'row-number': {
        title: "ROW_NUMBER()",
        badge: "Advanced / Window",
        diagram: `graph TD
A[Data Rows] -->|PARTITION BY / ORDER BY| B[Numbered Sequential Blocks]
style B fill:#151515,stroke:#2997ff`,
        meaning: "Assigns a sequential integer to each row within the partition of a result set.",
        notes: [
            "Part of the Window Function family.",
            "Can restart counting for each PARTITION."
        ],
        scenario: "Generating a leaderboard giving the exact ranking place of gamers within specific server regions.",
        code: `SELECT name, region, score,
       ROW_NUMBER() OVER(PARTITION BY region ORDER BY score DESC) as rank
FROM players;`,
        resultHtml: `<table class="sql-table" style="width:100%">
            <thead><tr><th>name</th><th>region</th><th>score</th><th>rank</th></tr></thead>
            <tbody><tr><td>Faker</td><td>KR</td><td>990</td><td>1</td></tr></tbody>
        </table>`,
        bestPractice: "Combine with Common Table Expressions (WITH) to easily query top N records per group.",
        relatedPractice: "Check the Advanced SQL Arena."
    }
};

// ============================================================================
// SQL PRACTICE IDE PROBLEMS (Interactive seed data for sql.js execution)
// ============================================================================
window.PRACTICE_PROBLEMS = {
    beginner: [
        {
            title: "Basic SELECT Query",
            question: "We have a table called 'macs' identifying current Apple computers. Write a query to fetch the 'model_name' and 'chip_type' columns for every row.",
            dbSchema: "Table: macs\nFields: id (INT), model_name (TEXT), chip_type (TEXT)",
            setupSQL: `
                CREATE TABLE macs (id INT, model_name TEXT, chip_type TEXT);
                INSERT INTO macs VALUES (1, 'MacBook Air', 'M3'), (2, 'MacBook Pro 14', 'M3 Pro'), (3, 'Mac Studio', 'M2 Ultra'), (4, 'iMac', 'M3');
            `,
            solution: "SELECT model_name, chip_type FROM macs;"
        },
        {
            title: "Filtering rows with WHERE",
            question: "Retrieve only the 'model_name' from the 'macs' table where the 'chip_type' is exactly 'M3'.",
            dbSchema: "Table: macs\nFields: id (INT), model_name (TEXT), chip_type (TEXT)",
            setupSQL: `
                CREATE TABLE macs (id INT, model_name TEXT, chip_type TEXT);
                INSERT INTO macs VALUES (1, 'MacBook Air', 'M3'), (2, 'MacBook Pro 14', 'M3 Pro'), (3, 'Mac Studio', 'M2 Ultra'), (4, 'iMac', 'M3');
            `,
            solution: "SELECT model_name FROM macs WHERE chip_type = 'M3';"
        },
        {
            title: "Ordering Data",
            question: "Write a query to list all products in the 'devices' table, ordered by 'release_year' in descending order (newest first).",
            dbSchema: "Table: devices\nFields: product (TEXT), release_year (INT)",
            setupSQL: `
                CREATE TABLE devices (product TEXT, release_year INT);
                INSERT INTO devices VALUES ('iPhone 13', 2021), ('iPhone 15 Pro', 2023), ('Apple Watch Ultra', 2022);
            `,
            solution: "SELECT * FROM devices ORDER BY release_year DESC;"
        }
    ],
    intermediate: [
        {
            title: "Grouping and Aggregating",
            question: "Find the total units sold for each segment 'category' in the 'sales' table. Output the category and the total_sold.",
            dbSchema: "Table: sales\nFields: category (TEXT), units (INT)",
            setupSQL: `
                CREATE TABLE sales (category TEXT, units INT);
                INSERT INTO sales VALUES ('Wearables', 120), ('Wearables', 80), ('Mac', 50), ('iPhone', 300), ('Mac', 25);
            `,
            solution: "SELECT category, SUM(units) AS total_sold FROM sales GROUP BY category;"
        },
        {
            title: "INNER JOINing Tables",
            question: "Fetch the 'employee.name' and the 'department.deck_name' for all employees. You will need to join the 'employee' table and 'department' table using 'dept_id'.",
            dbSchema: "Table employee: id, name, dept_id\nTable department: dept_id, deck_name",
            setupSQL: `
                CREATE TABLE department (dept_id INT, deck_name TEXT);
                INSERT INTO department VALUES (1, 'Design Team'), (2, 'Hardware Eng');
                CREATE TABLE employee (id INT, name TEXT, dept_id INT);
                INSERT INTO employee VALUES (101, 'Jony', 1), (102, 'Craig', 2), (103, 'Alan', 0);
            `,
            solution: "SELECT employee.name, department.deck_name FROM employee INNER JOIN department ON employee.dept_id = department.dept_id;"
        }
    ],
    advanced: [
        {
            title: "Subqueries & Mathematical Aggregation",
            question: "Find the names of the employees whose salary is strictly greater than the overall company Average Salary.",
            dbSchema: "Table: employees\nFields: id, name, salary",
            setupSQL: `
                CREATE TABLE employees (id INT, name TEXT, salary INT);
                INSERT INTO employees VALUES (1, 'Alice', 60000), (2, 'Bob', 120000), (3, 'Charlie', 55000), (4, 'David', 90000);
            `,
            solution: "SELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
        },
        {
            title: "Data Manipulation (UPDATE)",
            question: "The Mac Studio just received a price drop. Update the 'price' to 1799 where 'product' is 'Mac Studio' in the 'catalog' table. (Note: Output will be empty on success).",
            dbSchema: "Table: catalog\nFields: product, price",
            setupSQL: `
                CREATE TABLE catalog (product TEXT, price INT);
                INSERT INTO catalog VALUES ('Mac Studio', 1999), ('Mac Pro', 6999);
            `,
            solution: "UPDATE catalog SET price = 1799 WHERE product = 'Mac Studio';"
        }
    ]
};
