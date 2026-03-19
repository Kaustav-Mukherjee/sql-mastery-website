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
        learn: [],
        practice: []
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
                description: "Postgres uses LIMIT to constrain the number of rows returned.",
                syntax: "SELECT * FROM table LIMIT 10 OFFSET 5;",
                example: "SELECT name FROM users LIMIT 5;",
                diagram: "graph TD\nA[Query] --> B{Limit 5}\nB --> C[Result: 5 rows]"
            },
            {
                id: "pg-returning",
                category: "Advanced",
                title: "INSERT ... RETURNING",
                description: "Retrieves values from rows as they are being inserted.",
                syntax: "INSERT INTO users (name) VALUES ('Alice') RETURNING id;",
                example: "INSERT INTO products (name) VALUES ('SQL Pro') RETURNING *;",
                diagram: "graph LR\nA[Insert] --> B[Database]\nB --> C[Return ID to User]"
            }
        ],
        practice: [
            {
                id: "pg-challenge-1",
                title: "The Returning ID",
                difficulty: "intermediate",
                description: "Insert a user and get their generated ID back in one query.",
                solution: "INSERT INTO users (name) VALUES ('Kaustav') RETURNING id;"
            }
        ]
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
                description: "MySQL uses LIMIT for result pagination.",
                syntax: "SELECT * FROM table LIMIT 10;",
                example: "SELECT * FROM orders LIMIT 0, 10;",
                diagram: "graph TD\nA[Table] --> B[Limit 10] --> C[Page 1]"
            }
        ],
        practice: [
            {
                id: "my-challenge-1",
                title: "Pagination Master",
                difficulty: "beginner",
                description: "Select the first 5 records from the 'customers' table.",
                solution: "SELECT * FROM customers LIMIT 5;"
            }
        ]
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
                description: "SQL Server (T-SQL) uses TOP instead of LIMIT.",
                syntax: "SELECT TOP 10 * FROM table;",
                example: "SELECT TOP 5 name FROM employees ORDER BY salary DESC;",
                diagram: "graph TD\nA[Table] --> B[Top 5] --> C[Highest Salaries]"
            }
        ],
        practice: [
            {
                id: "ms-challenge-1",
                title: "Top Earners",
                difficulty: "beginner",
                description: "Get the top 3 highest paid employees.",
                solution: "SELECT TOP 3 * FROM employees ORDER BY salary DESC;"
            }
        ]
    }
};

window.DIALECT_DATA = DIALECT_DATA;
