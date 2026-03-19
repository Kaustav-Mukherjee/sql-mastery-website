// ===== DATABASE EXPLORER MODULE =====

const DATABASES = [
    {
        id: 'ecommerce',
        name: 'E-commerce Store',
        icon: 'shopping-cart',
        description: 'A complete online store database with products, users, orders, and reviews. Perfect for learning JOINs and Aggregations.',
        stats: { tables: 5, rows: '250+' },
        tables: ['users', 'products', 'orders', 'order_items', 'reviews']
    },
    {
        id: 'social-media',
        name: 'Social Network',
        icon: 'users',
        description: 'Profiles, friendships, posts, and likes. Great for practicing complex relationships and subqueries.',
        stats: { tables: 4, rows: '500+' },
        tables: ['profiles', 'posts', 'comments', 'friendships']
    },
    {
        id: 'university',
        name: 'School Management',
        icon: 'graduation-cap',
        description: 'Students, courses, enrollments, and grades. Good for understanding data integrity and constraints.',
        stats: { tables: 4, rows: '150+' },
        tables: ['students', 'courses', 'instructors', 'enrollments']
    }
];

function renderDatabaseCard(db) {
    return `
        <div class="db-card" id="db-${db.id}">
            <div class="db-card-header">
                <div class="db-card-title">
                    <i data-lucide="${db.icon}" style="width: 18px; color: var(--accent);"></i>
                    ${db.name}
                </div>
                <button class="btn btn--outline btn--sm" onclick="selectDatabase('${db.id}')">
                    Use Dataset
                </button>
            </div>
            <p class="db-card-desc">${db.description}</p>
            <div class="db-card-stats">
                <span><i data-lucide="layout" style="width: 12px; vertical-align: middle; margin-right: 4px;"></i>${db.stats.tables} Tables</span>
                <span><i data-lucide="rows" style="width: 12px; vertical-align: middle; margin-right: 4px;"></i>${db.stats.rows} Rows</span>
            </div>
        </div>
    `;
}

function initDatabasesSection() {
    const section = document.getElementById('section-databases');
    if (!section) return;

    section.innerHTML = `
        <div class="section-header">
            <h2 class="section-title">
                <i data-lucide="database" style="margin-right: 12px; color: var(--accent);"></i>
                Database Explorer
            </h2>
            <p class="section-subtitle">Select a curated dataset to power your learning and practice sessions.</p>
        </div>
        
        <div class="db-grid">
            ${DATABASES.map(renderDatabaseCard).join('')}
        </div>

        <div class="db-status" id="db-load-status">
            <i data-lucide="check-circle" style="width: 14px; color: #3fb950;"></i>
            Connected to SQLite (In-Memory)
        </div>
    `;

    if (window.lucide) {
        lucide.createIcons();
    }
}

function selectDatabase(dbId) {
    const db = DATABASES.find(d => d.id === dbId);
    if (!db) return;

    // In a real app, this would load the SQL dump into sql.js
    console.log(`Loading database: ${db.name}`);
    
    // Show feedback
    const status = document.getElementById('db-load-status');
    status.innerHTML = `<i data-lucide="loader" class="spin" style="width: 14px;"></i> Loading ${db.name}...`;
    lucide.createIcons();

    setTimeout(() => {
        status.innerHTML = `<i data-lucide="check-circle" style="width: 14px; color: #3fb950;"></i> Active Database: ${db.name}`;
        lucide.createIcons();
        
        // Switch to Learn section
        showSection('learn');
        
        // Update toast or notification
        alert(`Successfully connected to ${db.name}!`);
    }, 800);
}

// Export if needed
window.initDatabasesSection = initDatabasesSection;
window.selectDatabase = selectDatabase;
