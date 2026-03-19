// ===== INTRO SECTION DATA =====
const INTRO_TOPICS = [
    {
        id: 'what-is-database',
        icon: 'database',
        title: 'What is a Database?',
        content: `
            <p class="intro-text">
                A <strong>database</strong> is an organized collection of data stored electronically. 
                Think of it like a digital filing cabinet — instead of papers in folders, you have 
                <strong>data organized in tables</strong> (like spreadsheets with rows and columns).
            </p>
            <div class="intro-diagram" style="background:#010409; padding: 16px; border-radius:6px; margin:16px 0; border:1px solid #30363d; text-align:center;">
                <div class="mermaid-source" style="display:none">
                    graph LR
                    App[Client/App] -->|Requests Data| RDBMS[(Database)]
                    RDBMS -->|Returns Data| App
                    style App fill:#1f6feb,stroke:#58a6ff,color:#fff
                    style RDBMS fill:#238636,stroke:#2ea043,color:#fff
                </div>
                <div class="mermaid-container"></div>
            </div>
            <div class="intro-facts">
                <div class="intro-fact">
                    <div class="intro-fact-label">Stores data in</div>
                    <div class="intro-fact-value">Tables with rows & columns</div>
                </div>
                <div class="intro-fact">
                    <div class="intro-fact-label">Used by</div>
                    <div class="intro-fact-value">Every modern app & business</div>
                </div>
            </div>
        `
    },
    {
        id: 'what-is-sql',
        icon: 'terminal',
        title: 'What is SQL?',
        content: `
            <p class="intro-text">
                <strong>SQL</strong> (Structured Query Language) is the standard language for "talking" to databases. 
                It was created in the 1970s and remains the most vital tool for any data-related role.
            </p>
            <div class="cmd-syntax" style="margin: 8px 0 12px;">SELECT name, salary FROM employees WHERE dept = 'Eng';</div>
            <p class="intro-text">
                SQL reads like English: <em>"Get name and salary from employees where department is Engineering."</em>
            </p>
            <div class="intro-diagram" style="background:#010409; padding: 16px; border-radius:6px; margin:16px 0; border:1px solid #30363d; text-align:center;">
                <div class="mermaid-source" style="display:none">
                    graph LR
                    User[You] -.->|Write SQL| Engine[SQL Engine]
                    Engine -->|Execute| Data[(Tables)]
                    style User fill:#8957e5,stroke:#d2a8ff,color:#fff
                    style Engine fill:#1f6feb,stroke:#58a6ff,color:#fff
                    style Data fill:#238636,stroke:#2ea043,color:#fff
                </div>
                <div class="mermaid-container"></div>
            </div>
        `
    },
    {
        id: 'sql-types',
        icon: 'layers',
        title: 'Types of SQL Commands',
        content: `
            <p class="intro-text">SQL commands are categorized into five functional groups:</p>
            <ul class="intro-list">
                <li><strong>DDL</strong> (Data Definition) — Define structure: <code>CREATE</code>, <code>DROP</code>, <code>ALTER</code>, <code>TRUNCATE</code>.</li>
                <li><strong>DML</strong> (Data Manipulation) — Modify data: <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code>.</li>
                <li><strong>DQL</strong> (Data Query) — Fetch data: <code>SELECT</code> (The most used).</li>
                <li><strong>DCL</strong> (Data Control) — Permissions: <code>GRANT</code>, <code>REVOKE</code>.</li>
                <li><strong>TCL</strong> (Transaction Control) — Save points: <code>COMMIT</code>, <code>ROLLBACK</code>.</li>
            </ul>
        `
    },
    {
        id: 'sql-vs-excel',
        icon: 'table',
        title: 'SQL vs Excel: Which one to use?',
        content: `
            <p class="intro-text">Both manage data, but they serve different purposes:</p>
            <div class="intro-facts">
                <div class="intro-fact">
                    <div class="intro-fact-label">Excel</div>
                    <div class="intro-fact-value">Best for quick calculations, small data (< 1M rows), and one-off charts.</div>
                </div>
                <div class="intro-fact">
                    <div class="intro-fact-label">SQL</div>
                    <div class="intro-fact-value">Best for massive datasets, automation, security, and multi-user apps.</div>
                </div>
            </div>
            <p class="intro-text">Think of Excel as a <strong>calculator</strong> and SQL as a <strong>warehouse engine</strong>.</p>
        `
    },
    {
        id: 'what-is-query',
        icon: 'search',
        title: 'What is a Query?',
        content: `
            <p class="intro-text">
                A <strong>query</strong> is an instruction you send to the database. It's how you ask for data 
                or perform operations. Every interaction involves a query.
            </p>
            <div class="intro-facts">
                <div class="intro-fact">
                    <div class="intro-fact-label">Read query</div>
                    <div class="intro-fact-value"><code>SELECT * FROM users;</code></div>
                </div>
                <div class="intro-fact">
                    <div class="intro-fact-label">Write query</div>
                    <div class="intro-fact-value"><code>INSERT INTO users ...</code></div>
                </div>
            </div>
        `
    },
    {
        id: 'what-is-server',
        icon: 'monitor',
        title: 'What is a Database Server?',
        content: `
            <p class="intro-text">
                A <strong>server</strong> (or DBMS) is the software engine that runs 24/7 to store your data and 
                process your SQL queries. Common examples include PostgreSQL, MySQL, and SQL Server.
            </p>
            <div class="intro-diagram" style="background:#010409; padding: 16px; border-radius:6px; margin:16px 0; border:1px solid #30363d; text-align:center;">
                <div class="mermaid-source" style="display:none">
                    graph LR
                    Web[Web Browser] -->|API Request| Backend[App Server]
                    Backend -->|SQL Query| DB[(DB Server)]
                    DB -.->|SQL Result| Backend
                    Backend -.->|Data/HTML| Web
                    
                    style Web fill:#da3633,stroke:#ff7b72,color:#fff
                    style Backend fill:#8957e5,stroke:#d2a8ff,color:#fff
                    style DB fill:#238636,stroke:#2ea043,color:#fff
                </div>
                <div class="mermaid-container"></div>
            </div>
        `
    }
];

// ===== YOUTUBE VIDEO LECTURES =====
const YOUTUBE_VIDEOS = [
    { id: 'HXV3zeQKqGY', title: 'SQL Full Course 2025 — Beginner to Advanced', channel: 'freeCodeCamp.org' },
    { id: '7S_tz1z_5bA', title: 'MySQL Tutorial for Beginners (Full Course)', channel: 'Programming with Mosh' },
    { id: '9Pzj7Aj25lw', title: 'SQL Crash Course — Beginner to Intermediate', channel: 'Traversy Media' },
];

// ===== RENDER FUNCTIONS =====
function renderIntroCard(topic) {
    return `
        <div class="intro-card" id="intro-${topic.id}">
            <div class="intro-card-header" onclick="toggleIntroCard('${topic.id}')">
                <i data-lucide="${topic.icon}" class="intro-card-icon"></i>
                <span class="intro-card-title">${topic.title}</span>
                <i data-lucide="chevron-right" class="intro-card-chevron"></i>
            </div>
            <div class="intro-card-body">
                ${topic.content}
            </div>
        </div>
    `;
}

function renderVideoCard(video) {
    return `
        <div class="video-card">
            <iframe src="https://www.youtube.com/embed/${video.id}" title="${video.title}" allowfullscreen loading="lazy"></iframe>
            <div class="video-card-info">
                <div class="video-card-title">${video.title}</div>
                <div class="video-card-channel">${video.channel}</div>
            </div>
        </div>
    `;
}

// ===== INITIALIZATION =====
window.initIntroSection = function(dialectId = null) {
    const cardsContainer = document.getElementById('intro-cards');
    const videosContainer = document.getElementById('intro-videos');
    if (!cardsContainer) return;

    // 1. Start with General DB Knowledge (from databases.js)
    let allTopics = [...(window.DATABASE_101 || [])];
    
    // 2. Add Dialect Specific Intro
    let dialectName = "Standard SQL";
    if (dialectId && window.DIALECT_DATA && window.DIALECT_DATA[dialectId]) {
        const dialectIntro = window.DIALECT_DATA[dialectId].intro || [];
        allTopics = [...allTopics, ...dialectIntro];
        dialectName = window.DIALECT_DATA[dialectId].name;
    } else {
        // Fallback to default if no dialect or dialect doesn't have intro
        allTopics = [...allTopics, ...INTRO_TOPICS];
    }

    // Update section description
    const sectionDesc = document.querySelector('#section-intro .section-desc');
    if (sectionDesc) {
        sectionDesc.innerHTML = `Comprehensive guide to <strong>Databases</strong> and <strong>${dialectName}</strong>. Master the core theory, architecture, and practical commands.`;
    }

    cardsContainer.innerHTML = allTopics.map(renderIntroCard).join('');

    if (videosContainer) {
        videosContainer.innerHTML = `
            <div class="intro-videos-title"><i data-lucide="video"></i> Recommended Learning Path</div>
            <div class="video-grid">${YOUTUBE_VIDEOS.map(renderVideoCard).join('')}</div>
        `;
    }

    if (window.lucide) lucide.createIcons();

    // Auto-open first card (General Knowledge)
    if (allTopics.length > 0) {
        const firstCard = document.getElementById(`intro-${allTopics[0].id}`);
        if (firstCard) firstCard.classList.add('open');
    }

    // Initialize Sequential Diagram Rendering (Intersection Observer)
    initSequentialDiagrams();
};

function initSequentialDiagrams() {
    if (!window.IntersectionObserver) {
        // Fallback for older browsers
        setTimeout(() => {
            if (window.mermaid) window.mermaid.run({ querySelector: '.mermaid' }).catch(e => {});
        }, 500);
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const container = entry.target;
                const source = container.previousElementSibling;
                
                if (source && source.classList.contains('mermaid-source') && !container.dataset.rendered) {
                    // Add a slight delay for "sequential" feel
                    setTimeout(() => {
                        const mermaidId = 'diag-' + Math.random().toString(36).substr(2, 5);
                        window.mermaid.render(mermaidId, source.textContent.trim())
                            .then(result => {
                                container.innerHTML = result.svg;
                                container.dataset.rendered = 'true';
                                container.classList.add('rendered'); // For CSS animations
                            }).catch(err => console.error("Mermaid error:", err));
                    }, 150);
                }
                observer.unobserve(container);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.mermaid-container').forEach(diag => observer.observe(diag));
}

// ===== INTERACTIONS =====
window.toggleIntroCard = function(id) {
    const card = document.getElementById(`intro-${id}`);
    if (card) {
        card.classList.toggle('open');
        
        // Record activity when opening
        if (card.classList.contains('open') && window.recordActivity) {
            window.recordActivity();
        }
        
        if (card.classList.contains('open') && window.mermaid) {
            const containers = card.querySelectorAll('.mermaid-container');
            const sources = card.querySelectorAll('.mermaid-source');
            
            for (let i = 0; i < sources.length; i++) {
                if (!containers[i].dataset.rendered) {
                    const mermaidId = 'm-' + Math.random().toString(36).substr(2, 5);
                    window.mermaid.render(mermaidId, sources[i].textContent.trim())
                        .then(result => {
                            containers[i].innerHTML = result.svg;
                            containers[i].dataset.rendered = 'true';
                        });
                }
            }
        }
    }
};

// Start on load
document.addEventListener('DOMContentLoaded', () => {
    initIntroSection();
});
