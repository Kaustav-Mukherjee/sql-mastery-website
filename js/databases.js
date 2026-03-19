// ===== GENERAL DATABASE KNOWLEDGE (DATABASE 101) =====

const DATABASE_101 = [
    {
        id: "db-basics",
        icon: "database",
        title: "What is a Database?",
        content: "A database is an organized collection of structured information, or data, typically stored electronically in a computer system.",
        diagram: `sequenceDiagram
            participant User
            participant App
            participant DB
            User->>App: Submits Form
            App->>DB: INSERT INTO users...
            DB-->>App: Success
            App-->>User: "Profile Saved!"`
    },
    {
        id: "db-types",
        icon: "layers",
        title: "Types of Databases",
        content: "Databases evolved from file-based systems to Relational (SQL) and Non-Relational (NoSQL) systems.",
        list: [
            "**Relational (RDBMS)**: Structured data in tables (MySQL, PostgreSQL, SQL Server).",
            "**NoSQL**: Unstructured or semi-structured data (MongoDB, Cassandra).",
            "**In-Memory**: High-speed, RAM-based (Redis).",
            "**Cloud**: Distributed storage (DynamoDB, BigQuery)."
        ],
        diagram: `graph TD
            A[Databases] --> B[Relational/SQL]
            A --> C[NoSQL]
            B --> B1[PostgreSQL]
            B --> B2[MySQL]
            C --> C1[Document]
            C --> C2[Key-Value]`
    },
    {
        id: "acid-properties",
        icon: "shield-check",
        title: "ACID Properties",
        content: "The standard for reliability in database transactions.",
        list: [
            "**Atomicity**: All or nothing.",
            "**Consistency**: Only valid data is saved.",
            "**Isolation**: Concurrent tasks don't interfere.",
            "**Durability**: Data persists after system failure."
        ],
        diagram: `sequenceDiagram
            Note left of Transaction: Begin
            Transaction->>DB: Step 1: Withdraw $100
            Transaction->>DB: Step 2: Deposit $100
            Note right of DB: Fails in Step 2
            DB->>Transaction: Rollback Step 1
            Note left of Transaction: Atomicity Ensured`
    },
    {
        id: "sql-vs-nosql",
        icon: "git-compare",
        title: "SQL vs NoSQL",
        content: "Choosing between structured schemas and flexible scaling.",
        list: [
            "**SQL**: Predefined schema, Vertical scaling, ACID compliant.",
            "**NoSQL**: Dynamic schema, Horizontal scaling, Better for large datasets."
        ]
    }
];

window.DATABASE_101 = DATABASE_101;
