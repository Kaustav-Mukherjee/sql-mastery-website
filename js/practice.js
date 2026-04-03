let db = null;

// Initialize sql.js
async function initSQLite() {
    if (window.sqliteInitializing) return;
    window.sqliteInitializing = true;
    try {
        const SQL = await initSqlJs({
            // Load the wasm file from CDN
            locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
        });
        window.SQL = SQL;
        window.seedDatabase(); // Seed right away
        console.log("SQL.js Interactive Engine initialized.");
    } catch (err) {
        console.error("Failed to initialize sql.js:", err);
    }
}

// Function to reset and seed the database with mock tables
window.seedDatabase = function() {
    if(!window.SQL) return;
    if(db) db.close();
    db = new window.SQL.Database();
    
    // Seed all the tables used in the SQL Dictionary Examples
    const sqlStr = `
        CREATE TABLE users (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, subscription TEXT);
        INSERT INTO users VALUES (1, 'Steve', 'Jobs', 'steve@apple.com', 'Premium');
        INSERT INTO users VALUES (2, 'Tim', 'Cook', 'tim@apple.com', 'Premium');
        INSERT INTO users VALUES (992, 'Craig', 'Federighi', 'craig@apple.com', 'Trial');
        INSERT INTO users VALUES (4, 'spam_bot_test', 'Bot', 'bot@bad.com', 'Trial');

        CREATE TABLE accounts (id INTEGER PRIMARY KEY, username TEXT);
        INSERT INTO accounts VALUES (1, 'spam_bot_test');

        CREATE TABLE employees (id INTEGER PRIMARY KEY, first_name TEXT, current_salary INTEGER, title TEXT, department_id INTEGER);
        INSERT INTO employees VALUES (1, 'Craig', 150000, 'Senior Engineer', 10);
        INSERT INTO employees VALUES (2, 'Tim', 95000, 'Manager', 10);
        INSERT INTO employees VALUES (3, 'Phil', 120000, 'AVP', 20);

        CREATE TABLE departments (id INTEGER PRIMARY KEY, dept_name TEXT);
        INSERT INTO departments VALUES (10, 'Engineering');
        INSERT INTO departments VALUES (20, 'Marketing');

        CREATE TABLE sales (id INTEGER PRIMARY KEY, store_location TEXT, sales_amount INTEGER);
        INSERT INTO sales VALUES (1, 'Cupertino', 6000);
        INSERT INTO sales VALUES (2, 'Cupertino', 4500);
        INSERT INTO sales VALUES (3, 'New York', 9800);

        CREATE TABLE reviews (id INTEGER PRIMARY KEY, store_id INTEGER, rating REAL);
        INSERT INTO reviews VALUES (1, 101, 5.0);
        INSERT INTO reviews VALUES (2, 101, 4.6);
        INSERT INTO reviews VALUES (3, 102, 3.5);

        CREATE TABLE products (id INTEGER PRIMARY KEY, product_name TEXT, price REAL);
        INSERT INTO products VALUES (1, 'Pro Display XDR', 4999.00);
        INSERT INTO products VALUES (2, 'MacBook Pro', 2499.00);
        INSERT INTO products VALUES (3, 'AirPods Pro', 249.00);

        CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT);
        INSERT INTO customers VALUES (1001, 'Alice', 'alice@icloud.com');
        INSERT INTO customers VALUES (1002, 'Bob', 'bob@me.com');

        CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, customer_id INTEGER, total REAL);
        INSERT INTO orders VALUES (1, 1, 1001, 199.99);
        INSERT INTO orders VALUES (2, 2, NULL, 50.00);
        
        CREATE TABLE players (id INTEGER PRIMARY KEY, name TEXT, region TEXT, score INTEGER);
        INSERT INTO players VALUES (1, 'Faker', 'KR', 990);
        INSERT INTO players VALUES (2, 'Chovy', 'KR', 980);
    `;
    db.run(sqlStr);
    console.log("Mock database seeded with all required tables.");
    if(window.updateSchemaExplorer) window.updateSchemaExplorer();
};

// Expose execution function
window.executeLiveQuery = function(query, resultsContainerId) {
    const resultsContainer = document.getElementById(resultsContainerId);
    if (!resultsContainer) return;

    if (!db) {
        resultsContainer.innerHTML = `<tr><td style="color: var(--error); padding: 1rem;">Database initializing, please wait...</td></tr>`;
        return false;
    }

    try {
        const res = db.exec(query);
        
        if (res.length === 0) {
            // Probably an INSERT/UPDATE/DELETE which returns nothing
            resultsContainer.innerHTML = `<thead><tr><th>Success</th></tr></thead><tbody><tr><td style="color: var(--green); padding: 1rem;"><i data-lucide="check-circle" style="width:16px; height:16px; vertical-align:middle; margin-right:6px;"></i>Query executed successfully. (No output returned)</td></tr></tbody>`;
            if (window.lucide) window.lucide.createIcons();
            return true;
        }

        // We got results, format as HTML Table body and head
        const columns = res[0].columns;
        const values = res[0].values;

        let headHtml = `<thead><tr>`;
        columns.forEach(col => {
            headHtml += `<th>${col}</th>`;
        });
        headHtml += `</tr></thead>`;

        let bodyHtml = `<tbody>`;
        values.forEach((row, i) => {
            bodyHtml += `<tr>`;
            row.forEach(val => {
                bodyHtml += `<td>${val !== null ? val : '<em>NULL</em>'}</td>`;
            });
            bodyHtml += `</tr>`;
        });
        bodyHtml += `</tbody>`;

        resultsContainer.innerHTML = headHtml + bodyHtml;
        if (window.lucide) window.lucide.createIcons();
        return true;
    } catch (err) {
        resultsContainer.innerHTML = `<tr><td style="color: var(--error); padding: 1rem;">Error: ${err.message}</td></tr>`;
        return false;
    }
};

window.getDatabaseSchema = function() {
    if (!db) return {};
    const schema = {};
    try {
        const tables = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
        if (tables.length > 0) {
            tables[0].values.forEach(row => {
                const tableName = row[0];
                const cols = db.exec(`PRAGMA table_info(${tableName});`);
                if (cols.length > 0) {
                    schema[tableName] = cols[0].values.map(c => c[1]);
                }
            });
        }
    } catch (e) {
        console.error("Error fetching schema:", e);
    }
    return schema;
};

initSQLite();
