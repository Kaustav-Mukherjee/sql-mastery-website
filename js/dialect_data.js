// ===== DIALECT SPECIFIC CONTENT =====

const DIALECT_DATA = {
    sqlite: {
        name: "SQLite",
        youtube: [
            { title: "SQLite in 100 Seconds", url: "https://www.youtube.com/watch?v=byHcYRpMgI4" },
            { title: "SQLite Design Philosophy", url: "https://www.youtube.com/watch?v=Z_cX3X6K7I0" }
        ],
        intro: [
            {
                id: "sql-intro-1",
                icon: "zap",
                title: "Serverless & Simple",
                content: "SQLite is a C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine."
            }
        ],
        learn: [
            {
                id: "sqlite-limit",
                category: "Basic",
                title: "LIMIT Clause",
                description: "SQLite uses LIMIT to specify the maximum number of rows to return.",
                syntax: "SELECT * FROM table LIMIT 5;",
                example: "SELECT * FROM employees LIMIT 3;",
                diagram: "graph LR\nA[Table] --> B{Limit 3}\nB --> C[Row 1]\nB --> D[Row 2]\nB --> E[Row 3]"
            },
            {
                id: "sqlite-autoincrement",
                category: "Intermediate",
                title: "AUTOINCREMENT",
                description: "Used to automatically generate unique numeric IDs for new rows.",
                syntax: "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);",
                example: "INSERT INTO users (name) VALUES ('Kaustav');",
                diagram: "graph TD\nA[Insert] --> B{Row ID}\nB --> C[Last ID + 1]"
            }
        ],
        practice: {
            beginner: [
                {
                    id: "sq-b-1",
                    title: "First 5 Products",
                    desc: "Get the first 5 products from the <code>products</code> table.",
                    hint: "Use <strong>LIMIT 5</strong>.",
                    answer: "SELECT * FROM products LIMIT 5;",
                    expectedCols: ["id", "name", "category", "price", "stock"]
                }
            ],
            intermediate: [
                {
                    id: "sq-i-1",
                    title: "Auto-ID Check",
                    desc: "Create a simple table named <code>temp_users</code> with an <code>id</code> that auto-increments and a <code>name</code> column.",
                    hint: "Use <strong>INTEGER PRIMARY KEY AUTOINCREMENT</strong>.",
                    answer: "CREATE TABLE temp_users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);",
                    expectedCols: []
                }
            ],
            advanced: [
                {
                    id: "sq-a-1",
                    title: "Complex Subquery",
                    desc: "Find the product with the maximum price using a subquery.",
                    hint: "SELECT * FROM products WHERE price = (SELECT MAX(price) ...)",
                    answer: "SELECT * FROM products WHERE price = (SELECT MAX(price) FROM products);",
                    expectedCols: ["id", "name", "category", "price", "stock"]
                }
            ]
        }
    },
    postgresql: {
        name: "PostgreSQL",
        youtube: [
            { title: "Learn PostgreSQL in 3 Hours", url: "https://www.youtube.com/watch?v=qw--VYLpxG4" },
            { title: "Why Postgres is better than MySQL", url: "https://www.youtube.com/watch?v=nSxzE96C-Uo" }
        ],
        intro: [
            {
                id: "pg-intro-1",
                icon: "database",
                title: "Why PostgreSQL?",
                content: "PostgreSQL is a powerful, open-source object-relational database system with over 35 years of active development."
            },
            {
                id: "pg-intro-2",
                icon: "shield",
                title: "Reliability",
                content: "Known for its proven architecture, reliability, and data integrity. It supports advanced data types and optimization."
            }
        ],
        learn: [
            {
                id: "pg-limit",
                category: "Basic",
                title: "LIMIT & OFFSET",
                description: "Postgres uses LIMIT to constrain rows and OFFSET to skip them (useful for pagination).",
                syntax: "SELECT * FROM table LIMIT 10 OFFSET 5;",
                example: "SELECT name FROM employees LIMIT 5 OFFSET 2;",
                diagram: "graph TD\nA[Offset 2] --> B[Skip Row 1,2]\nB --> C[Limit 5]\nC --> D[Result: Row 3-7]"
            },
            {
                id: "pg-returning",
                category: "Advanced",
                title: "INSERT ... RETURNING",
                description: "Retrieves values from rows as they are being inserted, avoiding extra SELECT calls.",
                syntax: "INSERT INTO users (name) VALUES ('Alice') RETURNING id;",
                example: "INSERT INTO employees (name, salary) VALUES ('New Hire', 50000) RETURNING *;",
                diagram: "graph LR\nA[INSERT Statement] --> B[Execute Write]\nB --> C[Read Written Data]\nC --> D[Return to App]"
            },
            {
                id: "pg-jsonb",
                category: "Expert",
                title: "JSONB Support",
                description: "Postgres has world-class support for semi-structured JSON data with indexing.",
                syntax: "SELECT data->'name' FROM users WHERE data @> '{\"id\": 1}';",
                example: "SELECT * FROM employees WHERE metadata->>'department' = 'Sales';",
                diagram: "graph TD\nA[JSONB Column] --> B[GIN Index]\nB --> C[Fast Query Results]"
            }
        ],
        practice: {
            beginner: [
                {
                    id: "pg-b-1",
                    title: "Fetch First 2",
                    desc: "Retrieve the first 2 employees from the list.",
                    hint: "Use <strong>LIMIT 2</strong>.",
                    answer: "SELECT * FROM employees LIMIT 2;",
                    expectedCols: ["id", "name", "department", "salary", "hire_date"]
                }
            ],
            intermediate: [
                {
                    id: "pg-i-1",
                    title: "The Returning ID",
                    desc: "Insert a new employee 'Jane Doe' into <code>employees</code> and return the generated ID.",
                    hint: "Use <strong>INSERT ... RETURNING id</strong>.",
                    answer: "INSERT INTO employees (name, department, salary) VALUES ('Jane Doe', 'HR', 60000) RETURNING id;",
                    expectedCols: ["id"]
                }
            ],
            advanced: [
                {
                    id: "pg-a-1",
                    title: "Common Table Expressions (CTE)",
                    desc: "Use a WITH clause (CTE) to find employees with salary above 80k, then select their names.",
                    hint: "WITH high_pay AS (SELECT ...) SELECT ...",
                    answer: "WITH high_pay AS (SELECT * FROM employees WHERE salary > 80000) SELECT name FROM high_pay;",
                    expectedCols: ["name"]
                }
            ]
        }
    },
    mysql: {
        name: "MySQL",
        youtube: [
            { title: "MySQL Crash Course", url: "https://www.youtube.com/watch?v=7S_tz1z_5bA" },
            { title: "MySQL Architecture Explained", url: "https://www.youtube.com/watch?v=W66vPrv_0v8" }
        ],
        intro: [
            {
                id: "my-intro-1",
                icon: "zap",
                title: "Speed & Simplicity",
                content: "MySQL is the world's most popular open-source database, known for its speed and ease of use in web applications."
            }
        ],
        learn: [
            {
                id: "my-limit",
                category: "Basic",
                title: "LIMIT Clause",
                description: "MySQL uses LIMIT for result pagination, often with offset for web apps.",
                syntax: "SELECT * FROM table LIMIT offset, count;",
                example: "SELECT * FROM orders LIMIT 0, 10;",
                diagram: "graph TD\nA[Table] --> B[Limit 10] --> C[Page 1]\nA --> D[Offset 10, Limit 10] --> E[Page 2]"
            },
            {
                id: "my-engines",
                category: "Advanced",
                title: "Storage Engines",
                description: "MySQL supports multiple storage engines like InnoDB (ACID) and MyISAM (Fast).",
                syntax: "CREATE TABLE t1 (i INT) ENGINE = INNODB;",
                example: "SHOW TABLE STATUS LIKE 'employees';",
                diagram: "graph TD\nA[MySQL Server] --> B[Pluggable Engines]\nB --> C[InnoDB]\nB --> D[MyISAM]"
            }
        ],
        practice: {
            beginner: [
                {
                    id: "my-b-1",
                    title: "Pagination Master",
                    desc: "Select the first 5 records from the <code>employees</code> table.",
                    hint: "Use <strong>LIMIT 5</strong>.",
                    answer: "SELECT * FROM employees LIMIT 5;",
                    expectedCols: ["id", "name", "department", "salary", "hire_date"]
                }
            ],
            intermediate: [
                {
                    id: "my-i-1",
                    title: "Search by Prefix",
                    desc: "Find all products whose name starts with 'S'.",
                    hint: "Use <strong>LIKE 'S%'</strong>.",
                    answer: "SELECT * FROM products WHERE name LIKE 'S%';",
                    expectedCols: ["id", "name", "category", "price", "stock"]
                }
            ],
            advanced: [
                {
                    id: "my-a-1",
                    title: "Group and Count",
                    desc: "Show the number of employees in each department but rename the count to 'StaffCount'.",
                    hint: "Use <strong>GROUP BY</strong> and <strong>AS</strong>.",
                    answer: "SELECT department, COUNT(*) AS StaffCount FROM employees GROUP BY department;",
                    expectedCols: ["department", "StaffCount"]
                }
            ]
        }
    },
    sqlserver: {
        name: "SQL Server",
        youtube: [
            { title: "SQL Server Tutorial for Beginners", url: "https://www.youtube.com/watch?v=7GpolIT0who" },
            { title: "What is T-SQL?", url: "https://www.youtube.com/watch?v=f-B0Y35r6Yc" }
        ],
        intro: [
            {
                id: "ms-intro-1",
                icon: "server",
                title: "Enterprise Grade",
                content: "Microsoft SQL Server is a relational database management system developed by Microsoft."
            }
        ],
        learn: [
            {
                id: "ms-top",
                category: "Basic",
                title: "SELECT TOP",
                description: "Microsoft SQL Server uses TOP instead of LIMIT to restrict rows.",
                syntax: "SELECT TOP (number) * FROM table;",
                example: "SELECT TOP 5 name FROM employees ORDER BY salary DESC;",
                diagram: "graph TD\nA[Table] --> B[ORDER BY Salary]\nB --> C[SELECT TOP 5]\nC --> D[Result: Richest Employees]"
            },
            {
                id: "ms-identity",
                category: "Intermediate",
                title: "IDENTITY Column",
                description: "Creates an identity column in a table (auto-increment).",
                syntax: "CREATE TABLE t1 (id INT IDENTITY(1,1), name VARCHAR(50));",
                example: "INSERT INTO temp_customers (name) VALUES ('Enterprise Corp');",
                diagram: "graph LR\nA[New Row] --> B{Identity Seed}\nB --> C[Value 1]\nA2[Next Row] --> D[Value 2]"
            }
        ],
        practice: {
            beginner: [
                {
                    id: "ms-b-1",
                    title: "Top Earners",
                    desc: "Get the top 3 highest paid employees using T-SQL syntax.",
                    hint: "Use <strong>SELECT TOP 3</strong>.",
                    answer: "SELECT TOP 3 * FROM employees ORDER BY salary DESC;",
                    expectedCols: ["id", "name", "department", "salary", "hire_date"]
                }
            ],
            intermediate: [
                {
                    id: "ms-i-1",
                    title: "Average Calculation",
                    desc: "Calculate the average price of all products.",
                    hint: "Use <strong>AVG(price)</strong>.",
                    answer: "SELECT AVG(price) FROM products;",
                    expectedCols: ["avg_price"]
                }
            ],
            advanced: [
                {
                    id: "ms-a-1",
                    title: "Window Functions",
                    desc: "Calculate the running total of employee salaries sorted by hire date.",
                    hint: "Use <strong>SUM(salary) OVER(ORDER BY hire_date)</strong>.",
                    answer: "SELECT name, hire_date, SUM(salary) OVER(ORDER BY hire_date) AS running_total FROM employees;",
                    expectedCols: ["name", "hire_date", "running_total"]
                }
            ]
        }
    }
};

window.DIALECT_DATA = DIALECT_DATA;
