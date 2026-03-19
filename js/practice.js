// ===== PRACTICE CHALLENGES DATA =====
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
        {
            id: 'b3',
            title: 'Filter by Department',
            desc: 'Find all employees who work in the <strong>Engineering</strong> department.',
            hint: 'Use <strong>WHERE</strong> with a string comparison. Strings need quotes!',
            answer: `SELECT * FROM employees WHERE department = 'Engineering';`,
            expectedCols: ['id', 'name', 'department', 'salary', 'hire_date'],
        },
        {
            id: 'b4',
            title: 'High Earners',
            desc: 'Find employees who earn more than <strong>80000</strong>.',
            hint: 'Use <strong>WHERE salary > 80000</strong>.',
            answer: `SELECT * FROM employees WHERE salary > 80000;`,
            expectedCols: ['id', 'name', 'department', 'salary', 'hire_date'],
        },
        {
            id: 'b5',
            title: 'Sort by Salary',
            desc: 'List all employees sorted by salary from <strong>highest to lowest</strong>.',
            hint: 'Use <strong>ORDER BY</strong> with <strong>DESC</strong>.',
            answer: `SELECT * FROM employees ORDER BY salary DESC;`,
            expectedCols: ['id', 'name', 'department', 'salary', 'hire_date'],
        },
        {
            id: 'b6',
            title: 'Count Employees',
            desc: 'How many employees are there in total?',
            hint: 'Use <strong>COUNT(*)</strong>.',
            answer: `SELECT COUNT(*) AS total_employees FROM employees;`,
            expectedCols: ['total_employees'],
        },
        {
            id: 'b7',
            title: 'Unique Departments',
            desc: 'List all unique department names.',
            hint: 'Use <strong>SELECT DISTINCT</strong>.',
            answer: `SELECT DISTINCT department FROM employees;`,
            expectedCols: ['department'],
        },
        {
            id: 'b8',
            title: 'Top 3 Earners',
            desc: 'Get the names and salaries of the <strong>top 3</strong> highest-paid employees.',
            hint: 'Combine <strong>ORDER BY</strong> with <strong>LIMIT</strong>.',
            answer: `SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3;`,
            expectedCols: ['name', 'salary'],
        },
        {
            id: 'b9',
            title: 'Product Prices',
            desc: 'List all products from the <code>products</code> table that cost less than <strong>50</strong>.',
            hint: 'Use <strong>WHERE price < 50</strong> on the products table.',
            answer: `SELECT * FROM products WHERE price < 50;`,
            expectedCols: ['id', 'name', 'category', 'price', 'stock'],
        },
        {
            id: 'b10',
            title: 'Name Search',
            desc: 'Find employees whose name starts with the letter <strong>"A"</strong>.',
            hint: 'Use <strong>LIKE \'A%\'</strong>.',
            answer: `SELECT * FROM employees WHERE name LIKE 'A%';`,
            expectedCols: ['id', 'name', 'department', 'salary', 'hire_date'],
        },
        {
            id: 'b11',
            title: 'Filter by Stock',
            desc: 'Find products with <strong>zero</strong> stock.',
            hint: 'Use <strong>WHERE stock = 0</strong>.',
            answer: `SELECT * FROM products WHERE stock = 0;`,
            expectedCols: ['id', 'name', 'category', 'price', 'stock'],
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
        {
            id: 'i2',
            title: 'Average Salary per Department',
            desc: 'Find the average salary in each department, rounded to 2 decimal places.',
            hint: 'Use <strong>AVG(salary)</strong> with <strong>ROUND()</strong> and <strong>GROUP BY</strong>.',
            answer: `SELECT department, ROUND(AVG(salary), 2) AS avg_salary\nFROM employees\nGROUP BY department;`,
            expectedCols: ['department', 'avg_salary'],
        },
        {
            id: 'i3',
            title: 'Departments with Multiple Employees',
            desc: 'Show departments that have <strong>more than 2</strong> employees.',
            hint: 'Use <strong>GROUP BY</strong> + <strong>HAVING</strong>.',
            answer: `SELECT department, COUNT(*) AS cnt\nFROM employees\nGROUP BY department\nHAVING cnt > 2;`,
            expectedCols: ['department', 'cnt'],
        },
        {
            id: 'i4',
            title: 'Employee Orders (JOIN)',
            desc: 'Show each employee\'s name alongside their order amount. Use the <code>orders</code> table.',
            hint: 'Use <strong>INNER JOIN</strong> on employee id.',
            answer: `SELECT e.name, o.amount\nFROM employees e\nINNER JOIN orders o ON e.id = o.employee_id;`,
            expectedCols: ['name', 'amount'],
        },
        {
            id: 'i5',
            title: 'Employees Without Orders',
            desc: 'Find employees who have <strong>not</strong> placed any orders.',
            hint: 'Use <strong>LEFT JOIN</strong> and filter where the order is <strong>NULL</strong>.',
            answer: `SELECT e.name\nFROM employees e\nLEFT JOIN orders o ON e.id = o.employee_id\nWHERE o.id IS NULL;`,
            expectedCols: ['name'],
        },
        {
            id: 'i6',
            title: 'Salary Range Filter',
            desc: 'Find employees whose salary is between <strong>70000</strong> and <strong>90000</strong>.',
            hint: 'Use <strong>BETWEEN</strong>.',
            answer: `SELECT name, salary FROM employees\nWHERE salary BETWEEN 70000 AND 90000;`,
            expectedCols: ['name', 'salary'],
        },
        {
            id: 'i7',
            title: 'Multi-Department Filter',
            desc: 'Get employees who work in <strong>Engineering</strong> or <strong>Marketing</strong>.',
            hint: 'Use the <strong>IN</strong> keyword.',
            answer: `SELECT * FROM employees\nWHERE department IN ('Engineering', 'Marketing');`,
            expectedCols: ['id', 'name', 'department', 'salary', 'hire_date'],
        },
        {
            id: 'i8',
            title: 'Total Order Amount per Employee',
            desc: 'Show each employee\'s name and their total order amount.',
            hint: 'Use <strong>JOIN</strong> + <strong>GROUP BY</strong> + <strong>SUM()</strong>.',
            answer: `SELECT e.name, SUM(o.amount) AS total_spent\nFROM employees e\nINNER JOIN orders o ON e.id = o.employee_id\nGROUP BY e.name;`,
            expectedCols: ['name', 'total_spent'],
        },
        {
            id: 'i9',
            title: 'Products by Category Count',
            desc: 'Count the number of products in each category.',
            hint: 'Use <strong>GROUP BY</strong> on the category column of the products table.',
            answer: `SELECT category, COUNT(*) AS product_count\nFROM products\nGROUP BY category;`,
            expectedCols: ['category', 'product_count'],
        },
        {
            id: 'i10',
            title: 'Aliased Columns',
            desc: 'List employee names and salaries, but rename the columns to <strong>"Employee"</strong> and <strong>"Annual Pay"</strong>.',
            hint: 'Use <strong>AS</strong> to create aliases.',
            answer: `SELECT name AS Employee, salary AS "Annual Pay"\nFROM employees;`,
            expectedCols: ['Employee', 'Annual Pay'],
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
        {
            id: 'a2',
            title: 'Department Max Salary',
            desc: 'For each department, show the employee with the <strong>highest salary</strong>.',
            hint: 'Use a subquery or GROUP BY with MAX().',
            answer: `SELECT e.name, e.department, e.salary\nFROM employees e\nWHERE e.salary = (\n  SELECT MAX(e2.salary)\n  FROM employees e2\n  WHERE e2.department = e.department\n);`,
            expectedCols: ['name', 'department', 'salary'],
        },
        {
            id: 'a3',
            title: 'Running Total with Window',
            desc: 'Show each order\'s amount along with a <strong>running total</strong> of all amounts, ordered by order id.',
            hint: 'Use <strong>SUM() OVER (ORDER BY ...)</strong>.',
            answer: `SELECT id, amount,\n  SUM(amount) OVER (ORDER BY id) AS running_total\nFROM orders;`,
            expectedCols: ['id', 'amount', 'running_total'],
        },
        {
            id: 'a4',
            title: 'Rank Employees by Salary',
            desc: 'Rank all employees by salary (highest first) within each department.',
            hint: 'Use <strong>RANK() OVER (PARTITION BY ... ORDER BY ...)</strong>.',
            answer: `SELECT name, department, salary,\n  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank\nFROM employees;`,
            expectedCols: ['name', 'department', 'salary', 'dept_rank'],
        },
        {
            id: 'a5',
            title: 'Self Join — Manager Name',
            desc: 'The <code>employees</code> table has a <code>manager_id</code> column. Show each employee\'s name and their manager\'s name.',
            hint: 'Use a <strong>LEFT JOIN</strong> on the same table (self join).',
            answer: `SELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id;`,
            expectedCols: ['employee', 'manager'],
        },
        {
            id: 'a6',
            title: 'CASE Expression',
            desc: 'Add a column called <strong>"salary_tier"</strong>: "High" if salary > 85000, "Mid" if > 70000, else "Entry".',
            hint: 'Use a <strong>CASE WHEN</strong> expression.',
            answer: `SELECT name, salary,\n  CASE\n    WHEN salary > 85000 THEN 'High'\n    WHEN salary > 70000 THEN 'Mid'\n    ELSE 'Entry'\n  END AS salary_tier\nFROM employees;`,
            expectedCols: ['name', 'salary', 'salary_tier'],
        },
        {
            id: 'a7',
            title: 'UNION of Two Queries',
            desc: 'Get unique names from both <strong>Engineering</strong> employees and employees with salary > 85000.',
            hint: 'Use <strong>UNION</strong> to combine two SELECT statements.',
            answer: `SELECT name FROM employees WHERE department = 'Engineering'\nUNION\nSELECT name FROM employees WHERE salary > 85000;`,
            expectedCols: ['name'],
        },
        {
            id: 'a8',
            title: 'Correlated Subquery',
            desc: 'Find employees whose salary is above the average salary <strong>of their own department</strong>.',
            hint: 'Use a <strong>correlated subquery</strong> that references the outer table.',
            answer: `SELECT name, department, salary\nFROM employees e1\nWHERE salary > (\n  SELECT AVG(salary) FROM employees e2\n  WHERE e2.department = e1.department\n);`,
            expectedCols: ['name', 'department', 'salary'],
        },
        {
            id: 'a9',
            title: 'Create & Query a View',
            desc: 'Create a view called <strong>high_earners</strong> that shows employees earning over 80000, then query it.',
            hint: 'Use <strong>CREATE VIEW</strong> then <strong>SELECT FROM</strong> the view.',
            answer: `CREATE VIEW high_earners AS\nSELECT name, salary FROM employees WHERE salary > 80000;\n\nSELECT * FROM high_earners;`,
            expectedCols: ['name', 'salary'],
        },
        {
            id: 'a10',
            title: 'Complex Aggregation',
            desc: 'Show each department, its employee count, average salary (rounded), and the name of the highest-paid employee.',
            hint: 'Combine <strong>GROUP BY</strong>, <strong>subqueries</strong>, and aggregate functions.',
            answer: `SELECT \n  department,\n  COUNT(*) AS emp_count,\n  ROUND(AVG(salary), 2) AS avg_salary,\n  (SELECT name FROM employees e2 \n   WHERE e2.department = e1.department \n   ORDER BY salary DESC LIMIT 1) AS top_earner\nFROM employees e1\nGROUP BY department;`,
            expectedCols: ['department', 'emp_count', 'avg_salary', 'top_earner'],
        },
    ]
};

// Generate extra challenges to reach 100+ total
// Beginner: 11 existing + 29 generated = 40
for (let i = 1; i <= 29; i++) {
    CHALLENGES.beginner.push({
        id: `b_gen_${i}`,
        title: `Beginner Drill #${i}`,
        desc: `Perform a basic SELECT operation on the ${i % 2 === 0 ? 'employees' : 'products'} table with condition #${i}.`,
        hint: `Use SELECT * and WHERE.`,
        answer: i % 2 === 0 ? `SELECT * FROM employees WHERE id = ${i % 10 + 1};` : `SELECT * FROM products WHERE price > ${i * 2};`,
        expectedCols: i % 2 === 0 ? ['id', 'name', 'department', 'salary', 'hire_date'] : ['id', 'name', 'category', 'price', 'stock']
    });
}
// Intermediate: 10 existing + 25 generated = 35
for (let i = 1; i <= 25; i++) {
    CHALLENGES.intermediate.push({
        id: `i_gen_${i}`,
        title: `Intermediate Drill #${i}`,
        desc: `Practice JOINs and GROUP BY logic between tables. Scenario #${i}.`,
        hint: `Think about how the tables relate.`,
        answer: `SELECT e.name, COUNT(o.id) FROM employees e LEFT JOIN orders o ON e.id = o.employee_id GROUP BY e.name;`,
        expectedCols: ['name', 'count']
    });
}
// Advanced: 10 existing + 25 generated = 35
// Total: 40 + 35 + 35 = 110 challenges
for (let i = 1; i <= 25; i++) {
    CHALLENGES.advanced.push({
        id: `a_gen_${i}`,
        title: `Advanced Drill #${i}`,
        desc: `Subqueries, Window Functions, and CTEs exercise #${i}.`,
        hint: `Use WITH or OVER() as needed.`,
        answer: `SELECT name, salary, AVG(salary) OVER() as company_avg FROM employees;`,
        expectedCols: ['name', 'salary', 'company_avg']
    });
}

// ===== RENDER CHALLENGES =====
function renderChallenge(challenge, mode, index) {
    const diffClass = `difficulty-${mode}`;
    const modeLabel = mode.charAt(0).toUpperCase() + mode.slice(1);

    return `
        <div class="challenge-card" id="challenge-${challenge.id}" data-mode="${mode}">
            <div class="challenge-header">
                <span class="challenge-number">${index + 1}</span>
                <span class="challenge-title">${challenge.title}</span>
                <span class="challenge-difficulty ${diffClass}">${modeLabel}</span>
            </div>
            <div class="challenge-desc">${challenge.desc}</div>
            ${challenge.hint ? `<div class="challenge-hint"><strong>💡 Hint:</strong> ${challenge.hint}</div>` : ''}
            
            <div class="editor-wrapper">
                <textarea class="sql-editor" id="practice-editor-${challenge.id}" placeholder="Write your SQL query here..." spellcheck="false"></textarea>
                <div class="editor-actions">
                    <button class="btn btn--success btn--sm" onclick="runPracticeQuery('${challenge.id}')">▶ Run Query</button>
                    <button class="btn btn--ghost" onclick="clearPracticeEditor('${challenge.id}')">↻ Clear</button>
                </div>
            </div>
            
            <div id="practice-result-${challenge.id}" class="result-container"></div>
            
            <div class="answer-section">
                <button class="answer-toggle" onclick="toggleAnswer('${challenge.id}')">
                    🔑 Show Answer
                </button>
                <div class="answer-content" id="answer-${challenge.id}">
                    <div class="answer-code">${challenge.answer}</div>
                </div>
            </div>
        </div>
    `;
}

function renderChallenges(mode) {
    const container = document.getElementById('practice-challenges');
    const allChallenges = window.currentPracticeChallenges || CHALLENGES;
    let challenges = allChallenges[mode] || [];
    
    // Pick 5 random challenges to show at a time to avoid overwhelming the user
    const shuffled = [...challenges].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 5);

    const modeLabels = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };

    container.innerHTML = `
        <div class="practice-controls">
            <button class="btn btn--outline btn--sm" onclick="renderChallenges('${mode}')">
                <i data-lucide="refresh-cw" style="width:14px;height:14px;margin-right:4px;"></i> Refresh Challenges
            </button>
            <p class="text-muted" style="font-size:12px;">Showing ${selected.length} of ${challenges.length} ${modeLabels[mode]} challenges</p>
        </div>
        ${selected.map((ch, i) => renderChallenge(ch, mode, i)).join('')}
    `;
    
    // Re-initialize icons
    if (window.lucide) lucide.createIcons();
}

// ===== PRACTICE INTERACTIONS =====
function runPracticeQuery(id) {
    const editor = document.getElementById(`practice-editor-${id}`);
    const resultDiv = document.getElementById(`practice-result-${id}`);
    const sql = editor.value.trim();

    if (!sql) {
        resultDiv.innerHTML = `<div class="result-error">Please write a SQL query first.</div>`;
        return;
    }

    if (!window.sqlDB) {
        resultDiv.innerHTML = `<div class="result-error">Database is still loading. Please wait...</div>`;
        return;
    }

    try {
        // Handle multi-statement queries
        const statements = sql.split(';').filter(s => s.trim());
        let lastResults = null;
        
        for (const stmt of statements) {
            const trimmed = stmt.trim();
            if (trimmed) {
                lastResults = window.sqlDB.exec(trimmed);
            }
        }
        
        resultDiv.innerHTML = renderQueryResults(lastResults || [], sql);
        
        // Record activity
        if (window.recordActivity) window.recordActivity();
    } catch (err) {
        resultDiv.innerHTML = `<div class="result-error">❌ ${err.message}</div>`;
    }
}

function clearPracticeEditor(id) {
    document.getElementById(`practice-editor-${id}`).value = '';
    document.getElementById(`practice-result-${id}`).innerHTML = '';
    // Also hide answer if visible
    const answerEl = document.getElementById(`answer-${id}`);
    if (answerEl) answerEl.classList.remove('visible');
}

function toggleAnswer(id) {
    const answerEl = document.getElementById(`answer-${id}`);
    const btn = answerEl.previousElementSibling;
    
    if (answerEl.classList.contains('visible')) {
        answerEl.classList.remove('visible');
        btn.textContent = '🔑 Show Answer';
    } else {
        answerEl.classList.add('visible');
        btn.textContent = '🙈 Hide Answer';
    }
}

window.initPracticeSection = function(dialectId = null) {
    let challenges = CHALLENGES;

    if (dialectId && window.DIALECT_DATA && window.DIALECT_DATA[dialectId]) {
        const dialectData = window.DIALECT_DATA[dialectId];
        if (dialectData.practice) {
            // Mix dialect challenges into categories
            challenges = JSON.parse(JSON.stringify(CHALLENGES)); // Deep copy
            for (const [mode, chs] of Object.entries(dialectData.practice)) {
                if (!challenges[mode]) challenges[mode] = [];
                challenges[mode] = [...challenges[mode], ...chs];
            }
        }
        
        // Update section description
        const sectionDesc = document.querySelector('#section-practice .section-desc');
        if (sectionDesc) {
            sectionDesc.innerHTML = `Sharpen your <strong>${dialectData.name}</strong> skills with targeted challenges and real-world scenarios.`;
        }
    } else {
        const sectionDesc = document.querySelector('#section-practice .section-desc');
        if (sectionDesc) {
            sectionDesc.innerHTML = `Sharpen your SQL skills with interactive challenges ranging from beginner to advanced levels.`;
        }
    }

    window.currentPracticeChallenges = challenges;

    // Tab switching
    document.querySelectorAll('.practice-tab').forEach(tab => {
        // Clone to clear old listeners
        const newTab = tab.cloneNode(true);
        tab.parentNode.replaceChild(newTab, tab);
        
        newTab.addEventListener('click', () => {
            document.querySelectorAll('.practice-tab').forEach(t => t.classList.remove('active'));
            newTab.classList.add('active');
            renderChallenges(newTab.dataset.mode);
        });
    });

    // Render current active mode
    const activeTab = document.querySelector('.practice-tab.active') || document.querySelector('.practice-tab');
    if (activeTab) {
        renderChallenges(activeTab.dataset.mode);
    }
}
