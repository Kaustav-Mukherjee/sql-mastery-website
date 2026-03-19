// ===== APP INITIALIZATION =====
(async function () {
    // ===== NAVIGATION & ROUTING =====
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const logoLink = document.getElementById('nav-logo-link');
    const authContainer = document.getElementById('nav-auth-container');

    function updateAuthUI() {
        const user = JSON.parse(localStorage.getItem('sql_mastery_user'));
        if (user && user.connected) {
            // Prioritize avatarUrl (from Google Auth or Profile Upload), fallback to github generic, then default
            const userAvatar = user.avatarUrl || `https://github.com/${user.username.replace(/\s+/g, '')}.png`;
            
            authContainer.innerHTML = `
                <div class="nav-user" style="display: flex; align-items: center; gap: 8px; cursor: pointer;" id="nav-user-dropdown-btn">
                    <img src="${userAvatar}" alt="Avatar" onerror="this.src='https://github.com/github.png'" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border); object-fit: cover;">
                    <span style="font-size: 0.9rem; font-weight: 600;">${user.username}</span>
                    <i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i>
                </div>
                <button class="btn btn--outline btn--sm" id="btn-signout" style="margin-left: 8px;">Sign out</button>
            `;
            
            // Add signout listener
            document.getElementById('btn-signout').addEventListener('click', () => {
                localStorage.removeItem('sql_mastery_user');
                showToast('Signed out successfully');
                updateAuthUI();
                showSection('home');
            });

            // Redirect to profile if clicking user info
            document.getElementById('nav-user-dropdown-btn').addEventListener('click', () => showSection('profile'));
        } else {
            authContainer.innerHTML = `
                <a href="login.html" class="btn btn--outline btn--sm" id="btn-signin-nav">
                    <i data-lucide="log-in"></i> Sign in
                </a>
            `;
        }
        if (window.lucide) lucide.createIcons();
    }

    function showSection(sectionId) {
        // Update nav UI
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === sectionId);
        });

        // Update section visibility
        sections.forEach(sec => {
            sec.classList.remove('section--active');
        });

        const target = document.getElementById(`section-${sectionId}`);
        if (target) {
            target.classList.add('section--active');
            // Re-trigger fade animation
            target.style.animation = 'none';
            target.offsetHeight; 
            target.style.animation = '';
        }

        // Initialize section-specific logic if needed
        if (sectionId === 'databases') {
            if (window.initDatabasesSection) initDatabasesSection();
        } else if (sectionId === 'profile') {
            if (window.initProfileSection) initProfileSection();
        }

        // Global icon refresh for new dynamic content
        if (window.lucide) {
            lucide.createIcons();
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Export showSection to window
    window.showSection = showSection;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showSection(link.dataset.section);
        });
    });

    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        showSection('home');
    });

    // Hero buttons
    document.getElementById('hero-learn-btn').addEventListener('click', () => showSection('intro'));
    document.getElementById('hero-practice-btn').addEventListener('click', () => showSection('practice'));

    // Check auth on init
    updateAuthUI();

    // GitHub Connect Button
    const githubBtn = document.getElementById('btn-github-connect');
    if (githubBtn) {
        githubBtn.addEventListener('click', () => {
            if (window.handleGitHubConnect) handleGitHubConnect();
        });
    }

    // ===== INITIALIZE SQL.JS =====
    showToast('⏳ Loading SQL engine...');

    try {
        const SQL = await initSqlJs({
            locateFile: file => `https://sql.js.org/dist/${file}`
        });

        const db = new SQL.Database();
        window.sqlDB = db;

        // Seed the database
        seedDatabase(db);

        showToast('✅ SQL engine ready!');
    } catch (err) {
        console.error('Failed to load sql.js:', err);
        showToast('❌ Failed to load SQL engine');
    }

    // ===== INITIALIZE SECTIONS =====
    initIntroSection();
    initLearnSection();
    initPracticeSection();

    // Initial icon render
    if (window.lucide) {
        lucide.createIcons();
    }

    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const focused = document.activeElement;
            if (focused && focused.classList.contains('sql-editor')) {
                e.preventDefault();
                const id = focused.id;
                if (id.startsWith('editor-')) {
                    if (window.runLearnQuery) runLearnQuery(id.replace('editor-', ''));
                } else if (id.startsWith('practice-editor-')) {
                    if (window.runPracticeQuery) runPracticeQuery(id.replace('practice-editor-', ''));
                }
            }
        }
    });
})();

// ===== SEED DATABASE =====
function seedDatabase(db) {
    db.run(`
        CREATE TABLE employees (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            department TEXT NOT NULL,
            salary REAL NOT NULL,
            hire_date TEXT,
            manager_id INTEGER
        );
    `);

    db.run(`
        INSERT INTO employees (id, name, department, salary, hire_date, manager_id) VALUES
        (1, 'Alice Johnson', 'Engineering', 92000, '2021-03-15', NULL),
        (2, 'Bob Smith', 'Marketing', 75000, '2020-07-22', 1),
        (3, 'Carol Williams', 'Engineering', 98000, '2019-01-10', 1),
        (4, 'Dave Brown', 'Sales', 68000, '2022-05-01', 2),
        (5, 'Eve Davis', 'Engineering', 88000, '2021-09-12', 3),
        (6, 'Frank Miller', 'Marketing', 72000, '2023-01-18', 2),
        (7, 'Grace Wilson', 'Sales', 71000, '2020-11-30', 4),
        (8, 'Hank Taylor', 'Engineering', 105000, '2018-06-05', 1),
        (9, 'Ivy Anderson', 'Marketing', 82000, '2022-08-20', 2),
        (10, 'Jack Thomas', 'Sales', 65000, '2023-04-10', 4);
    `);

    db.run(`
        CREATE TABLE departments (
            dept_id INTEGER PRIMARY KEY,
            dept_name TEXT NOT NULL
        );
    `);

    db.run(`
        INSERT INTO departments (dept_id, dept_name) VALUES
        (1, 'Engineering'),
        (2, 'Marketing'),
        (3, 'Sales'),
        (4, 'HR');
    `);

    db.run(`
        CREATE TABLE products (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            stock INTEGER DEFAULT 0
        );
    `);

    db.run(`
        INSERT INTO products (id, name, category, price, stock) VALUES
        (1, 'Laptop Pro', 'Electronics', 1299.99, 45),
        (2, 'Wireless Mouse', 'Electronics', 29.99, 200),
        (3, 'Standing Desk', 'Furniture', 549.00, 30),
        (4, 'Monitor 27"', 'Electronics', 399.99, 60),
        (5, 'Ergonomic Chair', 'Furniture', 449.00, 25),
        (6, 'USB-C Hub', 'Electronics', 49.99, 150),
        (7, 'Desk Lamp', 'Furniture', 35.00, 80),
        (8, 'Mechanical Keyboard', 'Electronics', 129.99, 100),
        (9, 'Notebook Pack', 'Stationery', 12.99, 300),
        (10, 'Whiteboard', 'Stationery', 89.99, 40);
    `);

    db.run(`
        CREATE TABLE orders (
            id INTEGER PRIMARY KEY,
            employee_id INTEGER,
            product_id INTEGER,
            amount REAL NOT NULL,
            order_date TEXT,
            FOREIGN KEY (employee_id) REFERENCES employees(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        );
    `);

    db.run(`
        INSERT INTO orders (id, employee_id, product_id, amount, order_date) VALUES
        (1, 1, 1, 1299.99, '2024-01-15'),
        (2, 2, 2, 29.99, '2024-01-20'),
        (3, 3, 3, 549.00, '2024-02-01'),
        (4, 1, 4, 399.99, '2024-02-10'),
        (5, 5, 5, 449.00, '2024-02-15'),
        (6, 3, 6, 49.99, '2024-03-01'),
        (7, 8, 1, 1299.99, '2024-03-05'),
        (8, 2, 8, 129.99, '2024-03-10'),
        (9, 9, 7, 35.00, '2024-03-15'),
        (10, 5, 9, 12.99, '2024-03-20'),
        (11, 1, 10, 89.99, '2024-04-01'),
        (12, 3, 2, 29.99, '2024-04-05');
    `);
}

// ===== TOAST =====
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
