// ===== CORE SQL COMMANDS DATA =====
const SQL_COMMANDS = [
    {
        id: 'select',
        name: 'SELECT',
        category: 'Queries',
        brief: 'Pick columns from a table',
        description: `<strong>SELECT</strong> is the most important SQL command — it lets you <em>pick which columns</em> you want to see from a table. Think of it like choosing which columns to show in a spreadsheet. You can grab one column, a few columns, or all columns at once using <code>*</code>.`,
        syntax: `SELECT column1, column2 FROM table_name;\nSELECT * FROM table_name;  -- all columns`,
        diagram: {
            before: {
                title: 'employees',
                headers: ['id', 'name', 'dept', 'salary'],
                rows: [
                    ['1', 'Alice', 'Engineering', '90000'],
                    ['2', 'Bob', 'Marketing', '75000'],
                    ['3', 'Carol', 'Engineering', '95000'],
                ]
            },
            after: {
                title: 'Result: SELECT name, salary',
                headers: ['name', 'salary'],
                rows: [
                    ['Alice', '90000', 'highlight'],
                    ['Bob', '75000', 'highlight'],
                    ['Carol', '95000', 'highlight'],
                ]
            }
        },
        example: `SELECT name, salary FROM employees;`
    },
    {
        id: 'where',
        name: 'WHERE',
        category: 'Queries',
        brief: 'Filter rows based on a condition',
        description: `<strong>WHERE</strong> acts like a filter — it only shows rows that match your condition. For example, "show me only employees who earn more than 80000." It works with <code>=</code>, <code>></code>, <code><</code>, <code>>=</code>, <code><=</code>, and <code>!=</code>.`,
        syntax: `SELECT * FROM table_name WHERE condition;`,
        diagram: {
            before: {
                title: 'employees',
                headers: ['id', 'name', 'dept', 'salary'],
                rows: [
                    ['1', 'Alice', 'Engineering', '90000'],
                    ['2', 'Bob', 'Marketing', '75000'],
                    ['3', 'Carol', 'Engineering', '95000'],
                ]
            },
            after: {
                title: 'Result: WHERE salary > 80000',
                headers: ['id', 'name', 'dept', 'salary'],
                rows: [
                    ['1', 'Alice', 'Engineering', '90000', 'highlight'],
                    ['3', 'Carol', 'Engineering', '95000', 'highlight'],
                ]
            }
        },
        example: `SELECT * FROM employees WHERE salary > 80000;`
    },
    {
        id: 'insert',
        name: 'INSERT INTO',
        category: 'Modify',
        brief: 'Add new rows to a table',
        description: `<strong>INSERT INTO</strong> adds a brand new row to your table. You specify which table you want to add to, which columns you're filling in, and the values for those columns. It's like adding a new entry to a phone book.`,
        syntax: `INSERT INTO table_name (col1, col2) VALUES (val1, val2);`,
        diagram: {
            before: {
                title: 'employees (before)',
                headers: ['id', 'name', 'dept'],
                rows: [
                    ['1', 'Alice', 'Engineering'],
                    ['2', 'Bob', 'Marketing'],
                ]
            },
            after: {
                title: 'employees (after INSERT)',
                headers: ['id', 'name', 'dept'],
                rows: [
                    ['1', 'Alice', 'Engineering'],
                    ['2', 'Bob', 'Marketing'],
                    ['3', 'Dave', 'Sales', 'added'],
                ]
            }
        },
        example: `INSERT INTO employees (id, name, dept, salary) VALUES (4, 'Dave', 'Sales', 70000);`
    },
    {
        id: 'update',
        name: 'UPDATE',
        category: 'Modify',
        brief: 'Change existing row values',
        description: `<strong>UPDATE</strong> changes existing data in your table. You tell it which table to change, what new values to set, and a WHERE condition to pick which rows to change. <em>Always use WHERE</em> — or you'll accidentally update every row!`,
        syntax: `UPDATE table_name SET column = value WHERE condition;`,
        diagram: {
            before: {
                title: 'employees (before)',
                headers: ['id', 'name', 'salary'],
                rows: [
                    ['1', 'Alice', '90000'],
                    ['2', 'Bob', '75000'],
                ]
            },
            after: {
                title: 'After: UPDATE SET salary = 80000 WHERE name = \'Bob\'',
                headers: ['id', 'name', 'salary'],
                rows: [
                    ['1', 'Alice', '90000'],
                    ['2', 'Bob', '80000', 'highlight'],
                ]
            }
        },
        example: `UPDATE employees SET salary = 80000 WHERE name = 'Bob';`
    },
    {
        id: 'delete',
        name: 'DELETE',
        category: 'Modify',
        brief: 'Remove rows from a table',
        description: `<strong>DELETE</strong> removes rows from a table. Like UPDATE, you use a WHERE clause to pick which rows to delete. Without WHERE, it deletes <em>everything</em> — so be careful!`,
        syntax: `DELETE FROM table_name WHERE condition;`,
        diagram: {
            before: {
                title: 'employees (before)',
                headers: ['id', 'name', 'dept'],
                rows: [
                    ['1', 'Alice', 'Engineering'],
                    ['2', 'Bob', 'Marketing'],
                    ['3', 'Carol', 'Engineering'],
                ]
            },
            after: {
                title: 'After: DELETE WHERE name = \'Bob\'',
                headers: ['id', 'name', 'dept'],
                rows: [
                    ['1', 'Alice', 'Engineering'],
                    ['2', 'Bob', 'Marketing', 'deleted'],
                    ['3', 'Carol', 'Engineering'],
                ]
            }
        },
        example: `DELETE FROM employees WHERE dept = 'Marketing';`
    },
    {
        id: 'create-table',
        name: 'CREATE TABLE',
        category: 'Structure',
        brief: 'Create a brand new table',
        description: `<strong>CREATE TABLE</strong> builds a brand new, empty table. You give it a name and define the columns — each column gets a name and a data type (like TEXT, INTEGER, or REAL). Think of it as drawing an empty spreadsheet with labeled headers.`,
        syntax: `CREATE TABLE table_name (\n  column1 datatype,\n  column2 datatype\n);`,
        diagram: {
            before: {
                title: '(no table exists yet)',
                headers: ['—'],
                rows: []
            },
            after: {
                title: 'products (created)',
                headers: ['id', 'name', 'price'],
                rows: [
                    ['—', '—', '—', 'highlight'],
                ]
            }
        },
        example: `CREATE TABLE products (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  price REAL\n);`
    },
    {
        id: 'alter-table',
        name: 'ALTER TABLE',
        category: 'Structure',
        brief: 'Change a table\'s structure',
        description: `<strong>ALTER TABLE</strong> lets you change an existing table's structure — like adding a new column, renaming the table, or removing a column. It's like adding a new column header to your spreadsheet after you've already started using it.`,
        syntax: `ALTER TABLE table_name ADD COLUMN new_col datatype;`,
        diagram: {
            before: {
                title: 'products (before)',
                headers: ['id', 'name', 'price'],
                rows: [
                    ['1', 'Laptop', '999'],
                ]
            },
            after: {
                title: 'products (after ADD COLUMN)',
                headers: ['id', 'name', 'price', 'stock'],
                rows: [
                    ['1', 'Laptop', '999', 'NULL', 'highlight'],
                ]
            }
        },
        example: `ALTER TABLE products ADD COLUMN stock INTEGER DEFAULT 0;`
    },
    {
        id: 'drop-table',
        name: 'DROP TABLE',
        category: 'Structure',
        brief: 'Delete an entire table',
        description: `<strong>DROP TABLE</strong> completely deletes a table and all its data — forever. There's no undo! It's like shredding an entire spreadsheet. Use <code>IF EXISTS</code> to avoid errors if the table doesn't exist.`,
        syntax: `DROP TABLE IF EXISTS table_name;`,
        diagram: {
            before: {
                title: 'old_records',
                headers: ['id', 'data'],
                rows: [
                    ['1', 'some data', 'deleted'],
                    ['2', 'more data', 'deleted'],
                ]
            },
            after: {
                title: '(table deleted!)',
                headers: ['—'],
                rows: []
            }
        },
        example: `DROP TABLE IF EXISTS old_records;`
    },
    {
        id: 'inner-join',
        name: 'INNER JOIN',
        category: 'Joins',
        brief: 'Combine rows from two tables where they match',
        description: `<strong>INNER JOIN</strong> combines two tables and only keeps rows that have a match in <em>both</em> tables. It's like merging two spreadsheets but only keeping rows where both sheets have data for the same ID.`,
        syntax: `SELECT * FROM table1\nINNER JOIN table2 ON table1.col = table2.col;`,
        diagram: {
            before: {
                title: 'employees + departments',
                headers: ['emp_id', 'name', 'dept_id', '|', 'dept_id', 'dept_name'],
                rows: [
                    ['1', 'Alice', '10', '|', '10', 'Engineering'],
                    ['2', 'Bob', '20', '|', '20', 'Marketing'],
                    ['3', 'Carol', '30', '|', '', ''],
                ]
            },
            after: {
                title: 'INNER JOIN result (only matches)',
                headers: ['name', 'dept_name'],
                rows: [
                    ['Alice', 'Engineering', 'highlight'],
                    ['Bob', 'Marketing', 'highlight'],
                ]
            }
        },
        example: `SELECT e.name, d.dept_name\nFROM employees e\nINNER JOIN departments d ON e.dept_id = d.dept_id;`
    },
    {
        id: 'left-join',
        name: 'LEFT JOIN',
        category: 'Joins',
        brief: 'Keep all rows from the left table',
        description: `<strong>LEFT JOIN</strong> keeps <em>all</em> rows from the left (first) table, and matches them with the right table. If there's no match, the right side shows NULL. It's perfect when you want to see everything from one table, even if some rows don't have matches.`,
        syntax: `SELECT * FROM table1\nLEFT JOIN table2 ON table1.col = table2.col;`,
        diagram: {
            before: {
                title: 'employees + departments',
                headers: ['name', 'dept_id', '|', 'dept_id', 'dept_name'],
                rows: [
                    ['Alice', '10', '|', '10', 'Engineering'],
                    ['Bob', '20', '|', '20', 'Marketing'],
                    ['Carol', '30', '|', '', ''],
                ]
            },
            after: {
                title: 'LEFT JOIN result',
                headers: ['name', 'dept_name'],
                rows: [
                    ['Alice', 'Engineering', 'highlight'],
                    ['Bob', 'Marketing', 'highlight'],
                    ['Carol', 'NULL', 'highlight'],
                ]
            }
        },
        example: `SELECT e.name, d.dept_name\nFROM employees e\nLEFT JOIN departments d ON e.dept_id = d.dept_id;`
    },
    {
        id: 'group-by',
        name: 'GROUP BY',
        category: 'Aggregation',
        brief: 'Group rows and calculate totals',
        description: `<strong>GROUP BY</strong> groups rows that have the same value in a column, and then lets you run <em>aggregate functions</em> like COUNT, SUM, AVG, MAX, MIN on each group. It's like grouping items in a spreadsheet and adding a subtotal row for each group.`,
        syntax: `SELECT column, COUNT(*) FROM table_name\nGROUP BY column;`,
        diagram: {
            before: {
                title: 'employees',
                headers: ['name', 'dept'],
                rows: [
                    ['Alice', 'Engineering'],
                    ['Bob', 'Marketing'],
                    ['Carol', 'Engineering'],
                    ['Dave', 'Marketing'],
                ]
            },
            after: {
                title: 'GROUP BY dept, COUNT(*)',
                headers: ['dept', 'count'],
                rows: [
                    ['Engineering', '2', 'highlight'],
                    ['Marketing', '2', 'highlight'],
                ]
            }
        },
        example: `SELECT dept, COUNT(*) as num_employees\nFROM employees\nGROUP BY dept;`
    },
    {
        id: 'having',
        name: 'HAVING',
        category: 'Aggregation',
        brief: 'Filter grouped results',
        description: `<strong>HAVING</strong> is like WHERE, but for groups. After you GROUP BY, you can use HAVING to filter which groups to keep. For example, "only show departments that have more than 1 employee."`,
        syntax: `SELECT column, COUNT(*) FROM table_name\nGROUP BY column\nHAVING COUNT(*) > value;`,
        diagram: {
            before: {
                title: 'After GROUP BY dept',
                headers: ['dept', 'count'],
                rows: [
                    ['Engineering', '3'],
                    ['Marketing', '1'],
                    ['Sales', '2'],
                ]
            },
            after: {
                title: 'HAVING COUNT(*) > 1',
                headers: ['dept', 'count'],
                rows: [
                    ['Engineering', '3', 'highlight'],
                    ['Sales', '2', 'highlight'],
                ]
            }
        },
        example: `SELECT dept, COUNT(*) as cnt\nFROM employees\nGROUP BY dept\nHAVING cnt > 1;`
    },
];

const CHALLENGES = {
    beginner: [
        {
            id: 'b1',
            title: 'Select All Employees',
            desc: 'Write a query to get all columns from the <code>employees</code> table.',
            hint: 'Use <strong>SELECT *</strong> to grab everything.',
            answer: `SELECT * FROM employees;`,
            expectedCols: ['id', 'name', 'department', 'salary', 'hire_date'],
        },
        {
            id: 'b2',
            title: 'Names and Salaries Only',
            desc: 'Get just the <code>name</code> and <code>salary</code> of each employee.',
            hint: 'List the specific column names after SELECT.',
            answer: `SELECT name, salary FROM employees;`,
            expectedCols: ['name', 'salary'],
        },
    ],
    intermediate: [
        {
            id: 'i1',
            title: 'Department Headcount',
            desc: 'Count how many employees are in each department.',
            hint: 'Use <strong>GROUP BY</strong> with <strong>COUNT(*)</strong>.',
            answer: `SELECT department, COUNT(*) AS headcount\nFROM employees\nGROUP BY department;`,
            expectedCols: ['department', 'headcount'],
        },
    ],
    advanced: [
        {
            id: 'a1',
            title: 'Above-Average Earners (Subquery)',
            desc: 'Find employees who earn more than the <strong>company average</strong> salary.',
            hint: 'Use a <strong>subquery</strong> in the WHERE clause with <strong>AVG()</strong>.',
            answer: `SELECT name, salary FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);`,
            expectedCols: ['name', 'salary'],
        },
    ]
};

// Mix in simulated challenges
for (let i = 1; i <= 20; i++) {
    CHALLENGES.beginner.push({ id: `b_gen_${i}`, title: `Drill #${i}`, desc: `Basic operation #${i}`, answer: `SELECT * FROM employees LIMIT ${i % 5 + 1};`, expectedCols: ['id', 'name', 'department', 'salary', 'hire_date'] });
}

window.SQL_COMMANDS = SQL_COMMANDS;
window.CHALLENGES = CHALLENGES;

// ===== ACTIVITY TRACKING MODULE =====
const STATS_KEY = 'sql_mastery_activity';
window.recordActivity = function() {
    try {
        const today = new Date().toISOString().split('T')[0];
        let stats = JSON.parse(localStorage.getItem(STATS_KEY)) || {};
        stats[today] = (stats[today] || 0) + 1;
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
        if (typeof initProfileSection === 'function') {
            const section = document.getElementById('section-profile');
            if (section && section.classList.contains('section--active')) {
                generateContributionGraph();
            }
        }
    } catch (e) { console.error('Failed to record activity:', e); }
};
window.getActivityForDate = function(dateString) {
    const stats = JSON.parse(localStorage.getItem(STATS_KEY)) || {};
    return stats[dateString] || 0;
};

// ===== DIALECT SPECIFIC CONTENT =====
const DIALECT_DATA = {
    sqlite: {
        name: "SQLite",
        youtube: [
            { title: "SQLite in 100 Seconds", url: "https://www.youtube.com/watch?v=byHcYRpMgI4" },
            { title: "SQLite Design Philosophy", url: "https://www.youtube.com/watch?v=Z_cX3X6K7I0" }
        ],
        intro: [
            { id: "sl-intro-1", icon: "zap", title: "Serverless & Simple", content: "SQLite is a zero-configuration database. The entire database is a single disk file, making it perfect for mobile apps and small web tools." },
            { id: "sl-intro-2", icon: "file-text", title: "Manifest Typing", content: "Unlike other DBs, SQLite uses manifest typing. You can store any data type in any column (except INTEGER PRIMARY KEY)." }
        ],
        learn: [
            { id: "sl-limit", category: "Basic", name: "LIMIT Clause", description: "Standard way to restrict row count.", syntax: "SELECT * FROM table LIMIT 5 OFFSET 2;", example: "SELECT * FROM employees LIMIT 3;", diagram: "graph LR\nA[Table] --> B{Limit 3}\nB --> C[Row 1]\nB --> D[Row 2]\nB --> E[Row 3]" },
            { id: "sl-glob", category: "Search", name: "GLOB Operator", description: "Unix-style pattern matching (case sensitive).", syntax: "WHERE column GLOB 'A*';", example: "SELECT * FROM products WHERE name GLOB 'Pro*';" }
        ],
        practice: {
            beginner: [
                { id: "sl-b-1", title: "Top 3 Products", desc: "Show names of the 3 cheapest products.", answer: "SELECT name FROM products ORDER BY price LIMIT 3;", expectedCols: ["name"] }
            ],
            intermediate: [
                { id: "sl-i-1", title: "Pattern Search", desc: "Find products starting with 'S' using GLOB.", answer: "SELECT * FROM products WHERE name GLOB 'S*';", expectedCols: ["id", "name"] }
            ]
        }
    },
    postgresql: {
        name: "PostgreSQL",
        youtube: [
            { title: "PostgreSQL Architecture", url: "https://www.youtube.com/watch?v=qw--VYLpxG4" },
            { title: "JSONB in Postgres", url: "https://www.youtube.com/watch?v=vp79MIn2xS0" }
        ],
        intro: [
            { id: "pg-intro-1", icon: "database", title: "The World's Most Advanced DB", content: "PostgreSQL is known for its extensibility and standards compliance. It handles complex data types like JSONB, Geometry, and Arrays natively." },
            { id: "pg-intro-2", icon: "refresh-cw", title: "MVCC (Concurrency)", content: "Multi-Version Concurrency Control allows multiple users to read and write simultaneously without locking the entire table." }
        ],
        learn: [
            { id: "pg-returning", category: "Advanced", name: "RETURNING Clause", description: "Get data back from INSERT/UPDATE/DELETE without a second query.", syntax: "INSERT INTO users (name) VALUES ('Kaustav') RETURNING id;", example: "INSERT INTO employees (name, salary) VALUES ('New User', 5000) RETURNING *;", diagram: "sequenceDiagram\n    participant App\n    participant PG as PostgreSQL\n    App->>PG: INSERT row\n    PG->>PG: Generate ID\n    PG-->>App: Return Generated Row" },
            { id: "pg-cte", category: "Pro", name: "Common Table Expressions", description: "Readable, reusable subqueries using the WITH clause.", syntax: "WITH top_sales AS (...) SELECT * FROM top_sales;", example: "WITH high_margin AS (SELECT * FROM products WHERE price > 100) SELECT count(*) FROM high_margin;" }
        ],
        practice: {
            beginner: [
                { id: "pg-b-1", title: "Insert & Get ID", desc: "Insert employee 'Neo' and return their full record.", answer: "INSERT INTO employees (name) VALUES ('Neo') RETURNING *;", expectedCols: ["id", "name"] }
            ],
            intermediate: [
                { id: "pg-i-1", title: "Clean Subqueries", desc: "Use a WITH clause to find counts of products > $50.", answer: "WITH filter AS (SELECT * FROM products WHERE price > 50) SELECT count(*) FROM filter;", expectedCols: ["count"] }
            ]
        }
    },
    mysql: {
        name: "MySQL",
        youtube: [
            { title: "MySQL in 100 Seconds", url: "https://www.youtube.com/watch?v=7S_tz1z_5bA" }
        ],
        intro: [
            { id: "my-intro-1", icon: "zap", title: "Web Performance King", content: "MySQL is the world's most popular open-source database. It's the 'M' in the LAMP stack and powers millions of websites like Facebook and Twitter." },
            { id: "my-intro-2", icon: "hard-drive", title: "Storage Engines", content: "Choose between InnoDB (ACID compliant) or MyISAM (faster for reads). InnoDB is the modern default." }
        ],
        learn: [
            { id: "my-upsert", category: "Advanced", name: "ON DUPLICATE KEY UPDATE", description: "MySQL's version of UPSERT.", syntax: "INSERT ... ON DUPLICATE KEY UPDATE col=val;", example: "INSERT INTO counters (id, val) VALUES (1, 1) ON DUPLICATE KEY UPDATE val = val + 1;" },
            { id: "my-limit", category: "Basic", name: "LIMIT & OFFSET", description: "Used extensively for pagination in web apps.", syntax: "SELECT * FROM t LIMIT 10 OFFSET 20;", example: "SELECT * FROM products LIMIT 5;" }
        ],
        practice: {
            beginner: [
                { id: "my-b-1", title: "Basic Limit", desc: "Get top 5 products.", answer: "SELECT * FROM products LIMIT 5;", expectedCols: ["id"] }
            ],
            advanced: [
                { id: "my-a-1", title: "Atomic Counter", desc: "Increment 'click_count' for ID 1, create if missing.", answer: "INSERT INTO stats (id, click_count) VALUES (1, 1) ON DUPLICATE KEY UPDATE click_count = click_count + 1;", expectedCols: [] }
            ]
        }
    },
    sqlserver: {
        name: "SQL Server",
        youtube: [
            { title: "T-SQL Masterclass", url: "https://www.youtube.com/watch?v=7GpolIT0who" }
        ],
        intro: [
            { id: "ms-intro-1", icon: "server", title: "Enterprise Grade", content: "Microsoft SQL Server is a robust RDBMS designed for large-scale enterprise environments. It uses T-SQL (Transact-SQL)." },
            { id: "ms-intro-2", icon: "shield", title: "Built-in Security", content: "Features like Always Encrypted and Row-Level Security make it a top choice for financial institutions." }
        ],
        learn: [
            { id: "ms-top", category: "Basic", name: "TOP Clause", description: "Restrict rows at the start of the query.", syntax: "SELECT TOP (5) * FROM table;", example: "SELECT TOP 3 name FROM employees;", diagram: "graph TD\nA[Select] --> B[TOP 3]\nB --> C[Row 1]\nB --> D[Row 2]\nB --> E[Row 3]" },
            { id: "ms-merge", category: "Pro", name: "MERGE Statement", description: "Perform INSERT, UPDATE, or DELETE in a single atomic operation.", syntax: "MERGE target USING source ON ... WHEN MATCHED THEN ...;", example: "MERGE target T USING source S ON T.id = S.id WHEN MATCHED THEN UPDATE SET T.val = S.val;" }
        ],
        practice: {
            beginner: [
                { id: "ms-b-1", title: "Get Top 3", desc: "Select the top 3 employees.", answer: "SELECT TOP 3 * FROM employees;", expectedCols: ["id"] }
            ]
        }
    }
};
window.DIALECT_DATA = DIALECT_DATA;

// ===== GENERAL DATABASE KNOWLEDGE (DATABASE_101) =====
const DATABASE_101 = [
    { 
        id: "db-basics", 
        icon: "database", 
        title: "What is a Database?", 
        content: "A database is an organized collection of structured information, or data, typically stored electronically in a computer system. While a spreadsheet is great for one person, a database is built for thousands of people and millions of rows.", 
        list: ["Persistent storage", "Concurrent access", "Data integrity", "Queryable via SQL"],
        diagram: "sequenceDiagram\n    participant U as User\n    participant A as Application\n    participant D as Database\n    U->>A: Search 'Laptop'\n    A->>D: SELECT * FROM products WHERE name='Laptop'\n    D-->>A: Results (ID, Name, Price)\n    A-->>U: Show Product Page" 
    },
    { 
        id: "db-arch", 
        icon: "server", 
        title: "Database Architecture", 
        content: "Modern databases usually follow a client-server architecture. The database server manages the actual files and requests, while applications (clients) connect to it over a network.", 
        list: ["Client-Server model", "Storage Engine", "Query Optimizer", "Connection Pool"],
        diagram: "sequenceDiagram\n    participant C as Client App\n    participant Q as Query Processor\n    participant S as Storage Engine\n    participant D as Disk\n    C->>Q: Send SQL Query\n    Q->>Q: Parse & Optimize\n    Q->>S: Request Data Pages\n    S->>D: Read Blocks\n    D-->>S: Data Blocks\n    S-->>Q: Result Set\n    Q-->>C: JSON/Table Result" 
    },
    { 
        id: "rdbms-vs-nosql", 
        icon: "git-merge", 
        title: "SQL vs NoSQL", 
        content: "Relational databases (SQL) use tables with rows and columns. NoSQL databases (like MongoDB) often use document structures. SQL is superior for structured data and complex relationships.", 
        diagram: "graph LR\n    SQL[SQL: Structured Tables] --> Rel[Relationships/FKs]\n    NoSQL[NoSQL: JSON Documents] --> Flex[Schema Flexibility]" 
    },
    { 
        id: "indexing", 
        icon: "zap", 
        title: "The Power of Indexing", 
        content: "Without an index, the database must scan every single row (Full Table Scan). An index is like a book's index—it lets the DB jump directly to the data you need.", 
        list: ["B-Tree Indexes", "Hash Indexes", "Primary Keys", "Foreign Keys"],
        diagram: "graph TD\n    Root((Root Node)) --> L1((ID 1-50))\n    Root --> L2((ID 51-100))\n    L1 --> P1[Page A]\n    L1 --> P2[Page B]\n    P1 --> D1[Row 12: Alice]\n    style D1 fill:#238636,stroke:#fff" 
    },
    { 
        id: "acid", 
        icon: "shield-check", 
        title: "ACID Compliance", 
        content: "ACID is a set of properties that guarantee database transactions are processed reliably. It's the gold standard for financial systems.", 
        list: [
            "<strong>Atomicity:</strong> All or nothing completion.",
            "<strong>Consistency:</strong> Valid states only.",
            "<strong>Isolation:</strong> No interference between users.",
            "<strong>Durability:</strong> Once saved, it stays saved."
        ],
        diagram: "sequenceDiagram\n    participant T as Transaction\n    participant L as Undo Log\n    participant D as Data\n    T->>L: Save old state\n    T->>D: Update records\n    Note over T,D: Working...\n    alt Success\n        T->>D: Commit (Permanent)\n    else Failure\n        T->>L: Rollback (Restore Old)\n    end" 
    },
    {
        id: "db-types",
        icon: "layers",
        title: "Types of Databases",
        content: "Modern engineering uses different tools for different jobs. Here are the main types you'll encounter:",
        list: [
            "<strong>Relational (RDBMS):</strong> MySQL, PostgreSQL (Legacy & Modern)",
            "<strong>Document:</strong> MongoDB (Flexible JSON)",
            "<strong>Key-Value:</strong> Redis (Memory speed)",
            "<strong>Vector:</strong> Pinecone (AI & Embeddings)"
        ]
    }
];
window.DATABASE_101 = DATABASE_101;

// ===== EXPLORER DATASETS =====
window.EXPLORER_DATASETS = [
    { id: 'ecommerce', name: 'E-commerce', icon: 'shopping-cart', desc: 'Orders and Products.', tables: ['products', 'orders'] },
    { id: 'hr', name: 'HR System', icon: 'users', desc: 'Employees and Depts.', tables: ['employees', 'departments'] }
];
