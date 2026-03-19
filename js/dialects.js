// ===== DIALECTS SECTION DATA =====
const DIALECT_TOPICS = [
    {
        id: 'dialect-postgresql',
        icon: 'database',
        title: 'PostgreSQL',
        content: `
            <p class="intro-text">
                <strong>PostgreSQL</strong> (often called Postgres) is an advanced, enterprise-class, open-source object-relational database system.
                It is known for its robust feature set, standard compliance, and extensibility.
            </p>
            <div class="intro-facts">
                <div class="intro-fact">
                    <div class="intro-fact-label">Auto-increment Syntax</div>
                    <div class="intro-fact-value"><code>SERIAL</code> or <code>GENERATED ALWAYS AS IDENTITY</code></div>
                </div>
                <div class="intro-fact">
                    <div class="intro-fact-label">Best Use Case</div>
                    <div class="intro-fact-value">Complex analytical queries, Geospatial data (PostGIS), JSON/Document mixed workloads.</div>
                </div>
            </div>
            
            <p class="intro-text" style="margin-top: 16px;"><strong>Architecture Overview</strong></p>
            <div class="intro-diagram" style="background:#010409; padding: 16px; border-radius:6px; margin: 16px 0; border:1px solid #30363d; text-align:center;">
                <div class="mermaid-source" style="display:none">
                    graph LR
                    Client[Client App] -->|Connection| Postmaster[Postmaster Process]
                    Postmaster -->|Spawns| Worker[Backend Process]
                    Worker -->|Read/Write| Buffer[Shared Buffers]
                    Buffer -->|Sync| Disk[(Disk Storage)]
                    
                    style Client fill:#1f6feb,stroke:#58a6ff,color:#fff
                    style Postmaster fill:#8957e5,stroke:#d2a8ff,color:#fff
                    style Worker fill:#8957e5,stroke:#d2a8ff,color:#fff
                    style Buffer fill:#d2a8ff,stroke:#8957e5,color:#000
                    style Disk fill:#238636,stroke:#2ea043,color:#fff
                </div>
                <div class="mermaid-container"></div>
            </div>
        `
    },
    {
        id: 'dialect-mysql',
        icon: 'table',
        title: 'MySQL',
        content: `
            <p class="intro-text">
                <strong>MySQL</strong> is the world's most popular open-source relational database. 
                It powers a huge portion of the web, famously part of the LAMP stack (Linux, Apache, MySQL, PHP/Python).
            </p>
            <div class="intro-facts">
                <div class="intro-fact">
                    <div class="intro-fact-label">Auto-increment Syntax</div>
                    <div class="intro-fact-value"><code>AUTO_INCREMENT</code></div>
                </div>
                <div class="intro-fact">
                    <div class="intro-fact-label">Best Use Case</div>
                    <div class="intro-fact-value">Web applications, Read-heavy workloads, Content Management Systems (WordPress).</div>
                </div>
            </div>
            
            <div class="intro-diagram" style="background:#010409; padding: 16px; border-radius:6px; margin: 16px 0; border:1px solid #30363d; text-align:center;">
                <div class="mermaid-source" style="display:none">
                    graph TD
                    App[Web App] -->|Queries| Parser[MySQL Parser]
                    Parser -->|Compiled| Optimizer[Query Optimizer]
                    Optimizer -->|Execution| Engine[Pluggable Storage Engine]
                    Engine -.-> InnoDB[(InnoDB Disk)]
                    
                    style App fill:#da3633,stroke:#ff7b72,color:#fff
                    style Parser fill:#1f6feb,stroke:#58a6ff,color:#fff
                    style Engine fill:#d2a8ff,stroke:#8957e5,color:#000
                    style InnoDB fill:#238636,stroke:#2ea043,color:#fff
                </div>
                <div class="mermaid-container"></div>
            </div>
        `
    },
    {
        id: 'dialect-sqlserver',
        icon: 'server',
        title: 'Microsoft SQL Server',
        content: `
            <p class="intro-text">
                <strong>SQL Server</strong> is a robust enterprise database developed by Microsoft. 
                It integrates deeply with the .NET ecosystem and uses a proprietary SQL dialect called T-SQL (Transact-SQL).
            </p>
            <div class="intro-facts">
                <div class="intro-fact">
                    <div class="intro-fact-label">Auto-increment Syntax</div>
                    <div class="intro-fact-value"><code>IDENTITY(1,1)</code></div>
                </div>
                <div class="intro-fact">
                    <div class="intro-fact-label">Top Features</div>
                    <div class="intro-fact-value">T-SQL scripting, SSMS (SQL Server Management Studio), excellent Windows integration.</div>
                </div>
            </div>
            
            <p class="intro-text" style="margin-top: 16px;"><strong>Syntax Example:</strong></p>
            <div class="cmd-syntax" style="margin: 8px 0 12px;">SELECT TOP 10 name FROM users;</div>
            <p class="intro-text">Notice <code>TOP 10</code> instead of the standard <code>LIMIT 10</code> used in MySQL/Postgres.</p>
        `
    },
    {
        id: 'dialect-sqlite',
        icon: 'file-code',
        title: 'SQLite',
        content: `
            <p class="intro-text">
                <strong>SQLite</strong> is unique because it isn't a standalone server. 
                It's a C-language library that embeds a complete SQL engine directly into your app. 
                The entire database is just a single file on your disk!
            </p>
            <div class="intro-facts">
                <div class="intro-fact">
                    <div class="intro-fact-label">Auto-increment Syntax</div>
                    <div class="intro-fact-value"><code>AUTOINCREMENT</code></div>
                </div>
                <div class="intro-fact">
                    <div class="intro-fact-label">Use Cases</div>
                    <div class="intro-fact-value">Mobile Apps (iOS/Android), IoT devices, local testing, Desktop applications.</div>
                </div>
            </div>
            
            <div class="intro-diagram" style="background:#010409; padding: 16px; border-radius:6px; margin: 16px 0; border:1px solid #30363d; text-align:center;">
                <div class="mermaid-source" style="display:none">
                    graph LR
                    App[Mobile/Desktop App] -->|Includes| Lib[SQLite Library]
                    Lib -->|Direct Read/Write| File[(my_database.sqlite)]
                    
                    style App fill:#8957e5,stroke:#d2a8ff,color:#fff
                    style Lib fill:#1f6feb,stroke:#58a6ff,color:#fff
                    style File fill:#238636,stroke:#2ea043,color:#fff
                </div>
                <div class="mermaid-container"></div>
            </div>
        `
    },
    {
        id: 'dialect-oracle',
        icon: 'layout',
        title: 'Oracle Database',
        content: `
            <p class="intro-text">
                <strong>Oracle</strong> is a powerful, commercial database used by large enterprises. 
                It is known for massive scalability, high security, and its procedural language PL/SQL.
            </p>
            <div class="intro-facts">
                <div class="intro-fact">
                    <div class="intro-fact-label">Auto-increment Syntax</div>
                    <div class="intro-fact-value"><code>CREATE SEQUENCE</code> (Or <code>GENERATED AS IDENTITY</code> in 12c+)</div>
                </div>
                <div class="intro-fact">
                    <div class="intro-fact-label">Key Features</div>
                    <div class="intro-fact-value">RAC (Real Application Clusters), Data Guard, PL/SQL blocks.</div>
                </div>
            </div>
        `
    }
];

// ===== RENDER FUNCTIONS =====
function renderDialectCard(topic) {
    return `
        <div class="intro-card" id="dialect-${topic.id}">
            <div class="intro-card-header" onclick="toggleDialectCard('${topic.id}')">
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

// ===== INITIALIZATION =====
function initDialectsSection() {
    const container = document.getElementById('dialects-cards');
    if (container && !container.dataset.initialized) {
        container.innerHTML = DIALECT_TOPICS.map(renderDialectCard).join('');
        container.dataset.initialized = 'true';
        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

// ===== INTERACTIONS =====
function toggleDialectCard(id) {
    const card = document.getElementById(`dialect-${id}`);
    if (card) {
        card.classList.toggle('open');
        
        // Dynamic Mermaid Rendering
        if (card.classList.contains('open') && window.mermaid) {
            const containers = card.querySelectorAll('.mermaid-container');
            const sources = card.querySelectorAll('.mermaid-source');
            
            for (let i = 0; i < sources.length; i++) {
                if (!containers[i].dataset.rendered) {
                    const mermaidId = 'mermaid-dialect-' + Math.random().toString(36).substr(2, 9);
                    window.mermaid.render(mermaidId, sources[i].textContent.trim())
                        .then(result => {
                            containers[i].innerHTML = result.svg;
                            containers[i].dataset.rendered = 'true';
                        })
                        .catch(err => {
                            console.error('Mermaid render error:', err);
                            containers[i].innerHTML = `<span style="color:red; font-size:12px; display:block; padding:10px;">Graphic failed: ${err.message || err}</span>`;
                        });
                }
            }
        }
    }
}
