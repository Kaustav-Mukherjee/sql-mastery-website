// ===== SQL COMMAND DATA =====
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
    {
        id: 'order-by',
        name: 'ORDER BY',
        category: 'Queries',
        brief: 'Sort results in ascending or descending order',
        description: `<strong>ORDER BY</strong> sorts your results. By default it sorts in <em>ascending</em> order (A→Z, small→big). Add <code>DESC</code> to reverse it (Z→A, big→small). You can sort by multiple columns too.`,
        syntax: `SELECT * FROM table_name ORDER BY column ASC|DESC;`,
        diagram: {
            before: {
                title: 'employees (unsorted)',
                headers: ['name', 'salary'],
                rows: [
                    ['Carol', '95000'],
                    ['Alice', '90000'],
                    ['Bob', '75000'],
                ]
            },
            after: {
                title: 'ORDER BY salary DESC',
                headers: ['name', 'salary'],
                rows: [
                    ['Carol', '95000', 'highlight'],
                    ['Alice', '90000', 'highlight'],
                    ['Bob', '75000', 'highlight'],
                ]
            }
        },
        example: `SELECT name, salary FROM employees ORDER BY salary DESC;`
    },
    {
        id: 'limit',
        name: 'LIMIT',
        category: 'Queries',
        brief: 'Restrict how many rows are returned',
        description: `<strong>LIMIT</strong> controls how many rows you get back. It's useful when you only want the top 5, or the first 10 results. Combined with ORDER BY, it's great for "top N" queries.`,
        syntax: `SELECT * FROM table_name LIMIT number;`,
        diagram: {
            before: {
                title: 'employees (3 rows)',
                headers: ['name', 'salary'],
                rows: [
                    ['Carol', '95000'],
                    ['Alice', '90000'],
                    ['Bob', '75000'],
                ]
            },
            after: {
                title: 'LIMIT 2',
                headers: ['name', 'salary'],
                rows: [
                    ['Carol', '95000', 'highlight'],
                    ['Alice', '90000', 'highlight'],
                ]
            }
        },
        example: `SELECT name, salary FROM employees\nORDER BY salary DESC\nLIMIT 2;`
    },
    {
        id: 'distinct',
        name: 'DISTINCT',
        category: 'Queries',
        brief: 'Remove duplicate rows',
        description: `<strong>DISTINCT</strong> removes duplicate rows from your results. If the same value appears many times, DISTINCT shows it only once. Perfect for finding unique values.`,
        syntax: `SELECT DISTINCT column FROM table_name;`,
        diagram: {
            before: {
                title: 'employees',
                headers: ['name', 'dept'],
                rows: [
                    ['Alice', 'Engineering'],
                    ['Bob', 'Marketing'],
                    ['Carol', 'Engineering'],
                ]
            },
            after: {
                title: 'SELECT DISTINCT dept',
                headers: ['dept'],
                rows: [
                    ['Engineering', 'highlight'],
                    ['Marketing', 'highlight'],
                ]
            }
        },
        example: `SELECT DISTINCT dept FROM employees;`
    },
    {
        id: 'like',
        name: 'LIKE',
        category: 'Queries',
        brief: 'Search for patterns in text',
        description: `<strong>LIKE</strong> lets you search for patterns in text. Use <code>%</code> to match any number of characters and <code>_</code> to match exactly one character. For example, <code>'A%'</code> finds names starting with A.`,
        syntax: `SELECT * FROM table_name WHERE column LIKE pattern;`,
        diagram: {
            before: {
                title: 'employees',
                headers: ['name', 'dept'],
                rows: [
                    ['Alice', 'Engineering'],
                    ['Amy', 'Marketing'],
                    ['Bob', 'Sales'],
                ]
            },
            after: {
                title: 'WHERE name LIKE \'A%\'',
                headers: ['name', 'dept'],
                rows: [
                    ['Alice', 'Engineering', 'highlight'],
                    ['Amy', 'Marketing', 'highlight'],
                ]
            }
        },
        example: `SELECT * FROM employees WHERE name LIKE 'A%';`
    },
    {
        id: 'in',
        name: 'IN',
        category: 'Queries',
        brief: 'Match against a list of values',
        description: `<strong>IN</strong> checks if a value matches any item in a list. Instead of writing multiple OR conditions, you can use IN to keep things clean. It's like asking "is this value in my list?"`,
        syntax: `SELECT * FROM table_name WHERE column IN (val1, val2, val3);`,
        diagram: {
            before: {
                title: 'employees',
                headers: ['name', 'dept'],
                rows: [
                    ['Alice', 'Engineering'],
                    ['Bob', 'Marketing'],
                    ['Carol', 'Sales'],
                ]
            },
            after: {
                title: 'WHERE dept IN (\'Engineering\', \'Sales\')',
                headers: ['name', 'dept'],
                rows: [
                    ['Alice', 'Engineering', 'highlight'],
                    ['Carol', 'Sales', 'highlight'],
                ]
            }
        },
        example: `SELECT * FROM employees\nWHERE dept IN ('Engineering', 'Sales');`
    },
    {
        id: 'between',
        name: 'BETWEEN',
        category: 'Queries',
        brief: 'Filter within a range',
        description: `<strong>BETWEEN</strong> picks values within a range (including both ends). Instead of writing <code>salary >= 70000 AND salary <= 90000</code>, you can write <code>salary BETWEEN 70000 AND 90000</code>.`,
        syntax: `SELECT * FROM table_name WHERE column BETWEEN low AND high;`,
        diagram: {
            before: {
                title: 'employees',
                headers: ['name', 'salary'],
                rows: [
                    ['Alice', '90000'],
                    ['Bob', '75000'],
                    ['Carol', '95000'],
                    ['Dave', '60000'],
                ]
            },
            after: {
                title: 'WHERE salary BETWEEN 70000 AND 90000',
                headers: ['name', 'salary'],
                rows: [
                    ['Alice', '90000', 'highlight'],
                    ['Bob', '75000', 'highlight'],
                ]
            }
        },
        example: `SELECT * FROM employees\nWHERE salary BETWEEN 70000 AND 90000;`
    },
    {
        id: 'as',
        name: 'AS (Aliases)',
        category: 'Queries',
        brief: 'Give columns or tables temporary names',
        description: `<strong>AS</strong> gives a column or table a temporary nickname (alias). It doesn't change anything in the database — just makes your output easier to read. Great for renaming ugly column names or shortening table names in JOINs.`,
        syntax: `SELECT column AS alias_name FROM table_name;`,
        diagram: {
            before: {
                title: 'SELECT COUNT(*) FROM employees',
                headers: ['COUNT(*)'],
                rows: [
                    ['3'],
                ]
            },
            after: {
                title: 'SELECT COUNT(*) AS total',
                headers: ['total'],
                rows: [
                    ['3', 'highlight'],
                ]
            }
        },
        example: `SELECT dept, COUNT(*) AS total_employees\nFROM employees\nGROUP BY dept;`
    },
    {
        id: 'union',
        name: 'UNION',
        category: 'Queries',
        brief: 'Combine results from two queries',
        description: `<strong>UNION</strong> stacks the results of two SELECT queries on top of each other. Both queries must return the same number of columns. UNION removes duplicates; use <code>UNION ALL</code> to keep them.`,
        syntax: `SELECT col FROM table1\nUNION\nSELECT col FROM table2;`,
        diagram: {
            before: {
                title: 'Query 1 + Query 2',
                headers: ['name'],
                rows: [
                    ['Alice'],
                    ['Bob'],
                    ['—', ''],
                    ['Bob'],
                    ['Carol'],
                ]
            },
            after: {
                title: 'UNION result (no duplicates)',
                headers: ['name'],
                rows: [
                    ['Alice', 'highlight'],
                    ['Bob', 'highlight'],
                    ['Carol', 'highlight'],
                ]
            }
        },
        example: `SELECT name FROM employees WHERE dept = 'Engineering'\nUNION\nSELECT name FROM employees WHERE salary > 80000;`
    },
    {
        id: 'subquery',
        name: 'Subqueries',
        category: 'Advanced',
        brief: 'Nest one query inside another',
        description: `A <strong>subquery</strong> is a query inside another query. The inner query runs first, and its result is used by the outer query. It's like asking a question that depends on the answer to another question. You can use subqueries in WHERE, FROM, and SELECT clauses.`,
        syntax: `SELECT * FROM table_name\nWHERE column > (SELECT AVG(column) FROM table_name);`,
        diagram: {
            before: {
                title: 'employees',
                headers: ['name', 'salary'],
                rows: [
                    ['Alice', '90000'],
                    ['Bob', '75000'],
                    ['Carol', '95000'],
                ]
            },
            after: {
                title: 'WHERE salary > (SELECT AVG(salary)) → avg=86666',
                headers: ['name', 'salary'],
                rows: [
                    ['Alice', '90000', 'highlight'],
                    ['Carol', '95000', 'highlight'],
                ]
            }
        },
        example: `SELECT name, salary FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);`
    },
    {
        id: 'truncate',
        name: 'TRUNCATE',
        category: 'Modify',
        brief: 'Remove all rows from a table quickly',
        description: `<strong>TRUNCATE</strong> deletes every single row in a table. It's faster than <code>DELETE</code> because it doesn't log individual row deletions. Think of it as "resetting" a table to its empty state while keeping the structure intact.`,
        syntax: `TRUNCATE TABLE table_name;`,
        diagram: {
            before: {
                title: 'logs (before)',
                headers: ['id', 'msg'],
                rows: [
                    ['1', 'Login'],
                    ['2', 'Logout'],
                ]
            },
            after: {
                title: 'logs (after TRUNCATE)',
                headers: ['id', 'msg'],
                rows: []
            }
        },
        example: `DELETE FROM orders; -- SQLite uses DELETE for truncation`
    },
    {
        id: 'create-index',
        name: 'CREATE INDEX',
        category: 'Structure',
        brief: 'Speed up searches on a column',
        description: `An <strong>INDEX</strong> is like the index at the back of a book. It helps the database find rows much faster without scanning the entire table. Use it on columns you search for often (like <code>email</code> or <code>username</code>).`,
        syntax: `CREATE INDEX idx_name ON table_name (column);`,
        diagram: {
            before: {
                title: 'table (no index)',
                headers: ['Finding "Alice"...'],
                rows: [
                    ['Checking Bob...'],
                    ['Checking Dave...'],
                    ['Found Alice!'],
                ]
            },
            after: {
                title: 'table (with index)',
                headers: ['Finding "Alice"...'],
                rows: [
                    ['Jump to "A" section → Found Alice!', 'highlight'],
                ]
            }
        },
        example: `CREATE INDEX idx_emp_name ON employees (name);`
    },
    {
        id: 'commit',
        name: 'COMMIT',
        category: 'Transaction',
        brief: 'Save changes permanently',
        description: `<strong>COMMIT</strong> saves all changes made during the current transaction permanently to the database. Think of it as hitting "Save" on a document. Once committed, you can't roll back the changes.`,
        syntax: `COMMIT;`,
        diagram: {
            before: {
                title: 'Transaction (Pending)',
                headers: ['Action'],
                rows: [
                    ['UPDATE salary...'],
                    ['DELETE old_logs...'],
                ]
            },
            after: {
                title: 'Database (Saved)',
                headers: ['State'],
                rows: [
                    ['Changes Persistent', 'highlight'],
                ]
            }
        },
        example: `BEGIN TRANSACTION;\nUPDATE employees SET salary = 95000 WHERE id = 1;\nCOMMIT;`
    },
    {
        id: 'rollback',
        name: 'ROLLBACK',
        category: 'Transaction',
        brief: 'Undo unsaved changes',
        description: `<strong>ROLLBACK</strong> undoes all changes made during the current transaction that haven't been committed yet. It's the "Undo" button for your database. If something goes wrong during a series of updates, ROLLBACK brings everything back to how it was.`,
        syntax: `ROLLBACK;`,
        diagram: {
            before: {
                title: 'Transaction (Error!)',
                headers: ['Action'],
                rows: [
                    ['UPDATE salary (ok)'],
                    ['DELETE logs (failed!)', 'deleted'],
                ]
            },
            after: {
                title: 'Database (Restored)',
                headers: ['State'],
                rows: [
                    ['Original Data Restored', 'highlight'],
                ]
            }
        },
        example: `BEGIN TRANSACTION;\nDELETE FROM employees;\nROLLBACK; -- Phew! Everything is back.`
    },
    {
        id: 'with',
        name: 'WITH (CTE)',
        category: 'Advanced',
        brief: 'Create temporary results for a query',
        description: `<strong>WITH</strong> (Common Table Expression or CTE) lets you create a temporary result set that you can reference within your main query. It makes complex queries much easier to read and maintain.`,
        syntax: `WITH temp_table AS (\n  SELECT ...\n)\nSELECT * FROM temp_table;`,
        diagram: {
            before: {
                title: 'Complex Nested Query',
                headers: ['SQL'],
                rows: [
                    ['SELECT * FROM (SELECT avg(..) FROM ..) ...'],
                ]
            },
            after: {
                title: 'CTE (Clean & Readable)',
                headers: ['SQL'],
                rows: [
                    ['WITH averages AS (...) SELECT * FROM averages', 'highlight'],
                ]
            }
        },
        example: `WITH high_earners AS (\n  SELECT * FROM employees WHERE salary > 90000\n)\nSELECT name, department FROM high_earners;`
    },
];

// ===== CATEGORIES =====
const CATEGORIES = ['All', 'Queries', 'Modify', 'Structure', 'Joins', 'Aggregation', 'Transaction', 'Advanced'];

// ===== RENDER FUNCTIONS =====
function renderMiniTable(tableData) {
    if (!tableData) return '';
    let html = `<div><div class="diagram-label">${tableData.title}</div><table class="mini-table"><thead><tr>`;
    tableData.headers.forEach(h => html += `<th>${h}</th>`);
    html += `</tr></thead><tbody>`;
    tableData.rows.forEach(row => {
        const cls = row[row.length - 1];
        const isClass = ['highlight', 'deleted', 'added'].includes(cls);
        const rowClass = isClass ? ` class="${cls}"` : '';
        const cells = isClass ? row.slice(0, -1) : row;
        html += `<tr${rowClass}>`;
        cells.forEach(c => html += `<td>${c}</td>`);
        html += `</tr>`;
    });
    html += `</tbody></table></div>`;
    return html;
}

function renderDiagram(diagram) {
    if (!diagram) return '';
    return `
        <div class="cmd-diagram">
            <div class="diagram-tables">
                ${renderMiniTable(diagram.before)}
                <div class="diagram-arrow">→</div>
                ${renderMiniTable(diagram.after)}
            </div>
        </div>
    `;
}

function renderLearnCard(cmd) {
    return `
        <div class="learn-card" id="learn-${cmd.id}" data-category="${cmd.category}">
            <div class="learn-card-header" onclick="toggleLearnCard('${cmd.id}')">
                <div class="learn-card-title">
                    <span class="cmd-name">${cmd.name}</span>
                    <span class="cmd-brief">${cmd.brief}</span>
                </div>
                <span class="learn-card-toggle">+</span>
            </div>
            <div class="learn-card-body">
                <div class="cmd-description">${cmd.description}</div>
                <div class="cmd-syntax">${cmd.syntax}</div>
                ${renderDiagram(cmd.diagram)}
                <div class="cmd-editor">
                    <div class="editor-label">▸ Try it yourself</div>
                    <div class="editor-wrapper">
                        <textarea class="sql-editor" id="editor-${cmd.id}" spellcheck="false">${cmd.example}</textarea>
                        <div class="editor-actions">
                            <button class="btn btn--success btn--sm" onclick="runLearnQuery('${cmd.id}')">▶ Run</button>
                            <button class="btn btn--ghost" onclick="resetLearnEditor('${cmd.id}')">↻ Reset</button>
                        </div>
                    </div>
                    <div id="result-${cmd.id}" class="result-container"></div>
                </div>
            </div>
        </div>
    `;
}

// ===== INITIALIZATION =====
function initLearnSection() {
    // Render category filters
    const catContainer = document.getElementById('learn-categories');
    catContainer.innerHTML = CATEGORIES.map(cat =>
        `<button class="category-btn${cat === 'All' ? ' active' : ''}" data-cat="${cat}" onclick="filterCategory('${cat}')">${cat}</button>`
    ).join('');

    // Render all cards
    const cardsContainer = document.getElementById('learn-cards');
    cardsContainer.innerHTML = SQL_COMMANDS.map(renderLearnCard).join('');
}

// ===== INTERACTIONS =====
function toggleLearnCard(id) {
    const card = document.getElementById(`learn-${id}`);
    card.classList.toggle('open');
}

function filterCategory(cat) {
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.cat === cat);
    });

    // Show/hide cards
    document.querySelectorAll('.learn-card').forEach(card => {
        if (cat === 'All' || card.dataset.category === cat) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function resetLearnEditor(id) {
    const cmd = SQL_COMMANDS.find(c => c.id === id);
    if (cmd) {
        document.getElementById(`editor-${id}`).value = cmd.example;
        document.getElementById(`result-${id}`).innerHTML = '';
    }
}

function runLearnQuery(id) {
    const editor = document.getElementById(`editor-${id}`);
    const resultDiv = document.getElementById(`result-${id}`);
    const sql = editor.value.trim();

    if (!sql) {
        resultDiv.innerHTML = `<div class="result-error">Please enter a SQL query.</div>`;
        return;
    }

    if (!window.sqlDB) {
        resultDiv.innerHTML = `<div class="result-error">Database is still loading. Please wait a moment...</div>`;
        return;
    }

    try {
        const results = window.sqlDB.exec(sql);
        resultDiv.innerHTML = renderQueryResults(results, sql);
    } catch (err) {
        resultDiv.innerHTML = `<div class="result-error">❌ ${err.message}</div>`;
    }
}

// ===== SHARED RESULT RENDERER =====
function renderQueryResults(results, sql) {
    if (!results || results.length === 0) {
        const upper = sql.toUpperCase().trim();
        if (upper.startsWith('INSERT') || upper.startsWith('UPDATE') || upper.startsWith('DELETE') || upper.startsWith('CREATE') || upper.startsWith('ALTER') || upper.startsWith('DROP')) {
            return `<div class="result-message">✓ Query executed successfully.</div>`;
        }
        return `<div class="result-message">Query returned no results.</div>`;
    }

    let html = `<div class="result-label"><span class="status-dot success"></span> Results</div>`;
    results.forEach(res => {
        html += `<div style="overflow-x: auto;"><table class="result-table"><thead><tr>`;
        res.columns.forEach(col => html += `<th>${col}</th>`);
        html += `</tr></thead><tbody>`;
        res.values.forEach(row => {
            html += `<tr>`;
            row.forEach(val => html += `<td>${val === null ? 'NULL' : val}</td>`);
            html += `</tr>`;
        });
        html += `</tbody></table></div>`;
    });
    return html;
}
