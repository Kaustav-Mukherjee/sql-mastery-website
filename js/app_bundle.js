// ===== DIALECTS SECTION DATA & LOGIC =====
const DIALECT_TOPICS = [
    {
        id: 'dialect-postgresql',
        icon: 'database',
        title: 'PostgreSQL',
        content: `
            <p class="intro-text">
                <strong>PostgreSQL</strong> is an advanced, enterprise-class, open-source object-relational database system.
            </p>
            <div class="intro-facts">
                <div class="intro-fact"><div class="intro-fact-label">Syntax</div><div class="intro-fact-value"><code>SERIAL</code></div></div>
                <div class="intro-fact"><div class="intro-fact-label">Use Case</div><div class="intro-fact-value">Complex analytics, Geospatial.</div></div>
            </div>
            <div class="intro-diagram" style="background:#010409; padding: 16px; border-radius:6px; margin: 16px 0; border:1px solid #30363d; text-align:center;">
                <div class="mermaid-source" style="display:none">graph LR\nApp --> Postmaster\nPostmaster --> Worker\nWorker --> Buffer\nBuffer --> Disk</div>
                <div class="mermaid-container"></div>
            </div>
        `
    },
    {
        id: 'dialect-mysql',
        icon: 'table',
        title: 'MySQL',
        content: `
            <p class="intro-text"><strong>MySQL</strong> is the most popular open-source database for web development.</p>
            <div class="intro-facts">
                <div class="intro-fact"><div class="intro-fact-label">Syntax</div><div class="intro-fact-value"><code>AUTO_INCREMENT</code></div></div>
            </div>
            <div class="intro-diagram" style="background:#010409; padding: 16px; border-radius:6px; margin: 16px 0; border:1px solid #30363d; text-align:center;">
                <div class="mermaid-source" style="display:none">graph TD\nApp --> Parser\nParser --> Optimizer\nOptimizer --> Engine\nEngine --> Disk</div>
                <div class="mermaid-container"></div>
            </div>
        `
    },
    {
        id: 'dialect-sqlserver',
        icon: 'server',
        title: 'SQL Server',
        content: `
            <p class="intro-text"><strong>SQL Server</strong> is Microsoft's enterprise database system using T-SQL.</p>
            <div class="intro-facts">
                <div class="intro-fact"><div class="intro-fact-label">Syntax</div><div class="intro-fact-value"><code>IDENTITY(1,1)</code></div></div>
            </div>
        `
    },
    {
        id: 'dialect-sqlite',
        icon: 'file-code',
        title: 'SQLite',
        content: `
            <p class="intro-text"><strong>SQLite</strong> is zero-config and stores the entire DB in a single file.</p>
            <div class="intro-facts">
                <div class="intro-fact"><div class="intro-fact-label">Syntax</div><div class="intro-fact-value"><code>AUTOINCREMENT</code></div></div>
            </div>
        `
    }
];

function renderDialectCard(topic) {
    return `
        <div class="intro-card" id="dialect-topic-${topic.id}">
            <div class="intro-card-header">
                <i data-lucide="${topic.icon}" class="intro-card-icon"></i>
                <span class="intro-card-title">${topic.title}</span>
                <i data-lucide="chevron-right" class="intro-card-chevron"></i>
            </div>
            <div class="intro-card-body">${topic.content}</div>
        </div>
    `;
}

window.initDialectsSection = function() {
    const container = document.getElementById('dialects-cards');
    if (container && !container.dataset.initialized) {
        container.innerHTML = DIALECT_TOPICS.map(renderDialectCard).join('');
        container.dataset.initialized = 'true';
        if (window.lucide) lucide.createIcons();
    }
};



    // Helper for Mermaid rendering
    window.renderMermaid = async (container, text) => {
        if (!text) return;
        
        // Wait for mermaid to be ready
        if (!window.mermaid) {
            console.warn("Mermaid not ready, waiting...");
            setTimeout(() => window.renderMermaid(container, text), 500);
            return;
        }

        try {
            console.log("Attempting to render Mermaid diagram...");
            // Use a unique ID for each render
            const id = 'graph-' + Math.random().toString(36).substr(2, 5);
            
            // Try the standard render first as it's cleaner for injecting into containers
            const { svg } = await window.mermaid.render(id, text);
            container.innerHTML = svg;
            container.dataset.rendered = 'true';
            container.classList.add('fade-in');
            console.log("Mermaid render successful");
        } catch (e) {
            console.error("Mermaid Render Error:", e);
            // Fallback: try mermaid.run logic
            try {
                container.innerHTML = text;
                container.classList.add('mermaid');
                container.removeAttribute('data-processed');
                await window.mermaid.run({ nodes: [container] });
                container.dataset.rendered = 'true';
                container.classList.add('fade-in');
            } catch (e2) {
                console.error("Mermaid Fallback Error:", e2);
                container.innerHTML = `<div class="mermaid-error" style="color:#ff5555;padding:20px;text-align:center;">
                    <i data-lucide="alert-triangle"></i><br>
                    Diagram rendering failed.
                </div>`;
                if (window.lucide) window.lucide.createIcons();
            }
        }
    };

window.currentDialect = 'sqlite';

window.onDialectChange = function(newDialect) {
    window.currentDialect = newDialect;
    
    // Sync all dropdowns
    document.querySelectorAll('.dialect-selector').forEach(sel => {
        sel.value = newDialect;
    });

    // Refresh active section
    const activeSection = document.querySelector('.section--active');
    if (activeSection) {
        const id = activeSection.id;
        if (id === 'section-learn') window.initLearnSection(newDialect);
        if (id === 'section-practice') window.initPracticeSection(newDialect);
        if (id === 'section-intro') window.initIntroSection(newDialect);
    }
    
    if (window.showToast) {
        window.showToast(`Switched to ${newDialect.toUpperCase()} context`);
    }
};

window.initIntroSection = function(dialectId = window.currentDialect) {
    const container = document.getElementById('intro-cards');
    if (!container) return;

        let html = '';
        if (window.DATABASE_101) {
            window.DATABASE_101.forEach(topic => {
                html += `
                    <div class="intro-card" id="intro-${topic.id}">
                        <div class="intro-card-header">
                            <div class="intro-card-title">
                                <i data-lucide="${topic.icon}" class="intro-card-icon"></i>
                                <span>${topic.title}</span>
                            </div>
                            <i data-lucide="chevron-down" class="chevron"></i>
                        </div>
                        <div class="intro-card-body">
                            <p class="intro-text">${topic.content}</p>
                            ${topic.list ? `
                                <ul class="intro-list">
                                    ${topic.list.map(l => `<li><i data-lucide="check-circle-2"></i><span>${l}</span></li>`).join('')}
                                </ul>
                            ` : ''}
                            ${topic.diagram ? `
                                <div class="mermaid-container"></div>
                                <pre class="mermaid-source" style="display:none">${topic.diagram}</pre>
                            ` : ''}
                        </div>
                    </div>
                `;
            });
        }

        const dialectData = window.DIALECT_DATA ? window.DIALECT_DATA[dialectId] : null;
        if (dialectData && dialectData.intro) {
            dialectData.intro.forEach(topic => {
                html += `
                    <div class="intro-card" id="intro-${topic.id}">
                        <div class="intro-card-header">
                            <div class="intro-card-title">
                                <i data-lucide="${topic.icon || 'star'}" class="intro-card-icon"></i>
                                <span>${topic.title}</span>
                            </div>
                            <i data-lucide="chevron-down" class="chevron"></i>
                        </div>
                        <div class="intro-card-body">
                            <p class="intro-text">${topic.content}</p>
                        </div>
                    </div>
                `;
            });
        }

        container.innerHTML = html;
        if (window.lucide) lucide.createIcons();
    };

// Event Delegation for Toggles
document.addEventListener('click', (e) => {
    const header = e.target.closest('.intro-card-header, .learn-card-header');
    if (!header) return;
    
    const card = header.parentElement;
    if (!card) return;
    
    card.classList.toggle('open');
    
    if (card.classList.contains('open')) {
        const container = card.querySelector('.mermaid-container');
        const source = card.querySelector('.mermaid-source');
        if (container && source && !container.dataset.rendered) {
            console.log("Rendering diagram for card:", card.id);
            window.renderMermaid(container, source.textContent.trim());
        }
    }
});



// ===== PROFILE LOGIC (Revamped) =====
window.initProfileSection = function() {
    const container = document.getElementById('profile-content');
    if (!container) return;

    const user = JSON.parse(localStorage.getItem('sql_mastery_user')) || { username: 'Guest Master', bio: 'Exploring the depths of SQL.', location: 'Localhost', joined: 'Mar 2024' };
    const avatar = user.avatarUrl || `https://github.com/${user.username.replace(/\s+/g, '')}.png`;

    container.innerHTML = `
        <div class="profile-layout">
            <div class="profile-header-main">
                <div class="profile-avatar-wrapper">
                    <img src="${avatar}" alt="Avatar" class="profile-avatar-large" onerror="this.src='https://github.com/github.png'">
                    <div class="profile-status-ping"></div>
                </div>
                <div class="profile-info-main">
                    <h1 class="profile-name">${user.username}</h1>
                    <p class="profile-bio">${user.bio || 'SQL Enthusiast & Learner'}</p>
                    <div class="profile-meta">
                        <span><i data-lucide="map-pin"></i> ${user.location || 'Distributed'}</span>
                        <span><i data-lucide="calendar"></i> Joined ${user.joined || 'Recently'}</span>
                    </div>
                </div>
                <div class="profile-actions-top">
                    <button class="btn btn--outline btn--sm" onclick="showEditProfile()"><i data-lucide="edit-3"></i> Edit Profile</button>
                    <button class="btn btn--primary btn--sm" style="background:#238636; border:none;"><i data-lucide="share-2"></i> Share</button>
                </div>
            </div>
            <div class="profile-grid-layout">
                <aside class="profile-sidebar">
                    <div class="profile-card">
                        <h3>Contribution Streak</h3>
                        <div id="contribution-graph" class="contribution-graph"></div>
                        <p class="stats-text">Total Activities: <span id="total-activities-count">0</span></p>
                    </div>
                </aside>
                <main class="profile-main-area">
                    <div class="profile-card">
                        <h3>Learning Progress</h3>
                        <p>Complete lessons to see your progress here.</p>
                    </div>
                </main>
            </div>
        </div>
    `;
    if (window.lucide) lucide.createIcons();
    generateContributionGraph();
};

function generateContributionGraph() {
    const graph = document.getElementById('contribution-graph');
    if (!graph) return;
    let html = '';
    let total = 0;
    for (let i = 0; i < 28; i++) {
        const date = new Date();
        date.setDate(date.getDate() - (27 - i));
        const ds = date.toISOString().split('T')[0];
        const count = window.getActivityForDate ? window.getActivityForDate(ds) : 0;
        total += count;
        const level = count === 0 ? 0 : (count < 3 ? 1 : (count < 6 ? 2 : 3));
        html += `<div class="graph-day level-${level}" title="${ds}: ${count} activities"></div>`;
    }
    graph.innerHTML = html;
    const countEl = document.getElementById('total-activities-count');
    if (countEl) countEl.textContent = total;
}

window.showEditProfile = function() {
    const user = JSON.parse(localStorage.getItem('sql_mastery_user')) || { username: 'Guest Master' };
    const container = document.getElementById('profile-content');
    container.innerHTML = `
        <div class="profile-card edit-card">
            <h2>Edit Profile</h2>
            <div class="edit-form-grid">
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" id="edit-username" value="${user.username}">
                </div>
                <div class="form-group">
                    <label>Bio</label>
                    <textarea id="edit-bio" placeholder="Tell us about yourself">${user.bio || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Profile Picture</label>
                    <div class="avatar-edit-zone">
                        <img src="${user.avatarUrl || ''}" id="edit-avatar-preview" style="width:60px; height:60px; border-radius:50%; object-fit:cover; display:${user.avatarUrl ? 'block' : 'none'}">
                        <input type="file" id="avatar-upload" onchange="previewProfileImage(this)" accept="image/*">
                        <p class="hint">Upload an image from your device.</p>
                    </div>
                </div>
            </div>
            <div class="edit-actions">
                <button class="btn btn--primary" onclick="saveProfileChanges()">Save Changes</button>
                <button class="btn btn--outline" onclick="initProfileSection()">Cancel</button>
            </div>
        </div>
    `;
};

window.previewProfileImage = function(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('edit-avatar-preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
            window.tempAvatar = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
};

window.saveProfileChanges = function() {
    const user = JSON.parse(localStorage.getItem('sql_mastery_user')) || {};
    user.username = document.getElementById('edit-username').value;
    user.bio = document.getElementById('edit-bio').value;
    if (window.tempAvatar) user.avatarUrl = window.tempAvatar;
    localStorage.setItem('sql_mastery_user', JSON.stringify(user));
    window.showToast('Profile updated!');
    window.initProfileSection();
};

// ===== LEARN SECTION LOGIC =====
window.initLearnSection = function(dialectId = window.currentDialect) {
    const categoriesContainer = document.getElementById('learn-categories');
    const cardsContainer = document.getElementById('learn-cards');
    if (!categoriesContainer || !cardsContainer) return;

    const commands = window.SQL_COMMANDS || [];
    const dialectData = window.DIALECT_DATA ? window.DIALECT_DATA[dialectId] : null;
    const allItems = [...commands, ...(dialectData?.learn || [])];

    const categories = ['All', ...new Set(allItems.map(c => c.category))];
    
    categoriesContainer.innerHTML = categories.map(cat => `
        <button class="category-btn ${cat === 'All' ? 'active' : ''}" onclick="filterLearnCategory('${cat}')">${cat}</button>
    `).join('');

    window.filterLearnCategory = (category) => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.toggle('active', b.textContent === category));
        const filtered = category === 'All' ? allItems : allItems.filter(c => c.category === category);
        
        cardsContainer.innerHTML = filtered.map(cmd => `
            <div class="learn-card" id="learn-card-${cmd.id}">
                <div class="learn-card-header">
                    <div class="learn-card-info">
                        <h3>${cmd.name || cmd.title}</h3>
                        <p>${cmd.brief || cmd.category}</p>
                    </div>
                    <i data-lucide="chevron-down"></i>
                </div>
                <div class="learn-card-body">
                    <div class="learn-content-grid">
                        <div class="learn-text-side">
                            <p class="description">${cmd.description}</p>
                            <h4>Syntax</h4>
                            <pre><code>${cmd.syntax}</code></pre>
                            <h4>Example</h4>
                            <pre><code class="language-sql">${cmd.example}</code></pre>
                            <button class="btn btn--sm btn--primary" onclick="window.tryExample('${cmd.id}')">Try in Playground</button>
                        </div>
                        <div class="learn-visual-side">
                            ${cmd.diagram ? renderCommandDiagram(cmd.diagram) : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        if (window.lucide) lucide.createIcons();
    };



    window.tryExample = (id) => {
        const cmd = allItems.find(c => c.id === id);
        if (cmd) {
            window.showSection('practice'); // Switch to practice section
            // In a real app, we'd pre-fill the editor. For now, just toast.
            window.showToast(`Pre-filling playground with ${cmd.name} example...`);
        }
    };

    filterLearnCategory('All');
};

function renderCommandDiagram(diagram) {
    if (typeof diagram === 'string') {
        return `
            <div class="mermaid-viewer">
                <div class="mermaid-container"></div>
                <pre class="mermaid-source" style="display:none">${diagram}</pre>
            </div>
        `;
    }
    
    const renderTable = (data, isAfter = false) => `
        <div class="diagram-table-wrapper">
            <span class="table-title">${data.title}</span>
            <table class="mini-table ${isAfter ? 'table-after' : 'table-before'}">
                <thead><tr>${data.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
                <tbody>
                    ${data.rows.map((row, i) => `
                        <tr class="${row[row.length-1] === 'highlight' ? 'highlight' : (row[row.length-1] === 'added' ? 'added' : (row[row.length-1] === 'deleted' ? 'deleted' : ''))}" 
                            style="animation-delay: ${isAfter ? (0.3 + i * 0.1) : (i * 0.1)}s">
                            ${row.slice(0, data.headers.length).map(cell => `<td>${cell}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    return `
        <div class="diagram-tables">
            ${renderTable(diagram.before)}
            <div class="diagram-arrow"><i data-lucide="arrow-right"></i></div>
            ${renderTable(diagram.after, true)}
        </div>
    `;
}

// ===== PRACTICE SECTION LOGIC =====
window.initPracticeSection = function(dialectId = window.currentDialect) {
    const container = document.getElementById('practice-challenges');
    const tabs = document.querySelectorAll('.practice-tab');
    if (!container) return;

    let currentMode = 'beginner';

    window.loadChallenges = (mode) => {
        currentMode = mode;
        tabs.forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
        
        const coreChallenges = window.CHALLENGES ? window.CHALLENGES[mode] : [];
        const dialectChallenges = window.DIALECT_DATA?.[dialectId]?.practice?.[mode] || [];
        const all = [...coreChallenges, ...dialectChallenges];

        container.innerHTML = all.map(ch => `
            <div class="challenge-card" id="ch-${ch.id}">
                <div class="challenge-info">
                    <h3>${ch.title}</h3>
                    <p>${ch.desc}</p>
                    <div class="challenge-meta">
                        <span class="badge ${mode}">${mode.toUpperCase()}</span>
                        <span class="hint-trigger" onclick="toggleHint('${ch.id}')"><i data-lucide="help-circle"></i> Hint</span>
                    </div>
                    <div id="hint-${ch.id}" class="challenge-hint" style="display:none;">${ch.hint || 'No hint available.'}</div>
                </div>
                <div class="challenge-editor">
                    <textarea id="editor-${ch.id}" placeholder="Write your SQL here..."></textarea>
                    <div class="editor-actions">
                        <button class="btn btn--sm btn--outline" onclick="runChallengeQuery('${ch.id}')">Run Query</button>
                        <button class="btn btn--sm btn--primary" onclick="checkChallengeAnswer('${ch.id}')">Submit</button>
                    </div>
                </div>
                <div id="result-${ch.id}" class="challenge-result"></div>
            </div>
        `).join('');
        if (window.lucide) lucide.createIcons();
    };

    tabs.forEach(tab => tab.onclick = () => loadChallenges(tab.dataset.mode));
    loadChallenges('beginner');
};

window.toggleHint = (id) => {
    const hint = document.getElementById(`hint-${id}`);
    if (hint) hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
};

window.runChallengeQuery = function(id) {
    const sql = document.getElementById(`editor-${id}`).value;
    const resultDiv = document.getElementById(`result-${id}`);
    if (!sql.trim()) return window.showToast('Please enter a query!');

    try {
        const res = window.sqlDB.exec(sql);
        if (res.length === 0) {
            resultDiv.innerHTML = '<p class="success-text">Query executed successfully (no results).</p>';
        } else {
            const { columns, values } = res[0];
            resultDiv.innerHTML = `
                <table class="result-table">
                    <thead><tr>${columns.map(c => `<th>${c}</th>`).join('')}</tr></thead>
                    <tbody>${values.map(r => `<tr>${r.map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}</tbody>
                </table>
            `;
        }
        window.recordActivity();
    } catch (e) {
        resultDiv.innerHTML = `<p class="error-text">Error: ${e.message}</p>`;
    }
};

window.checkChallengeAnswer = function(id) {
    window.showToast('Checking your answer...');
    // Simulated check - in a real app, we'd compare results
    setTimeout(() => {
        window.showToast('🎉 Correct! Challenge completed.');
        window.recordActivity();
    }, 800);
};

// ===== DATABASES SECTION LOGIC =====
window.initDatabasesSection = function() {
    const container = document.getElementById('db-list');
    if (!container || !window.EXPLORER_DATASETS) return;
    container.innerHTML = window.EXPLORER_DATASETS.map(db => `
        <div class="db-card" onclick="window.selectDataset('${db.id}')">
            <div class="db-card-icon"><i data-lucide="${db.icon}"></i></div>
            <div class="db-card-content">
                <h4>${db.name}</h4>
                <p>${db.desc}</p>
                <div class="db-tables">
                    ${db.tables.map(t => `<span class="table-tag">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
};

window.selectDataset = function(id) {
    window.showToast(`Loading dataset: ${id}`);
    // Simulate table creation
    try {
        if (id === 'hr') {
            window.sqlDB.run("CREATE TABLE IF NOT EXISTS employees (id INT, name TEXT, department TEXT, salary INT);");
            window.sqlDB.run("INSERT INTO employees VALUES (1, 'Alice', 'Engineering', 90000), (2, 'Bob', 'Marketing', 75000);");
        }
        window.showToast('Dataset ready in Practice Arena!');
        window.showSection('practice');
    } catch(e) { console.error(e); }
};

// ===== MAIN APP ENTRY =====
(async function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    window.showSection = function(id) {
        navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === id));
        sections.forEach(s => s.classList.remove('section--active'));
        const target = document.getElementById(`section-${id}`);
        if (target) {
            target.classList.add('section--active');
            // Trigger specific section Inits
            const activeSection = document.getElementById(`section-${id}`);
            if (activeSection.id === 'section-intro') window.initIntroSection(window.currentDialect);
            if (activeSection.id === 'section-learn') window.initLearnSection(window.currentDialect);
            if (activeSection.id === 'section-practice') window.initPracticeSection(window.currentDialect);
            if (activeSection.id === 'section-dialects') window.initDialectsSection();
            if (activeSection.id === 'section-profile') window.initProfileSection();
            if (activeSection.id === 'section-databases') window.initDatabasesSection();
        }
        window.scrollTo(0,0);
        if (window.lucide) lucide.createIcons();
    };

    navLinks.forEach(link => link.addEventListener('click', (e) => {
        e.preventDefault();
        window.showSection(link.dataset.section);
    }));

    // Toast Utility
    window.showToast = function(msg) {
        const t = document.getElementById('toast');
        if (!t) return;
        t.textContent = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3000);
    };

    // SQL Init
    try {
        const SQL = await initSqlJs({ locateFile: f => `https://sql.js.org/dist/${f}` });
        window.sqlDB = new SQL.Database();
        window.showToast('✅ SQL System Ready');
    } catch(e) { 
        console.error(e); 
        window.showToast('❌ SQL Init Failed');
    }

    window.showSection('home');
    
    // Mobile toggle
    const toggle = document.getElementById('nav-mobile-toggle');
    const menu = document.getElementById('nav-links-container');
    if (toggle && menu) {
        toggle.onclick = () => menu.classList.toggle('open');
    }
})();
