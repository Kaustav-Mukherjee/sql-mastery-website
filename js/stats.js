// ===== ACTIVITY TRACKING MODULE =====

const STATS_KEY = 'sql_mastery_activity';

/**
 * Records an activity for the current day.
 * Increments the counter for today's date (YYYY-MM-DD).
 */
window.recordActivity = function() {
    try {
        const today = new Date().toISOString().split('T')[0];
        let stats = JSON.parse(localStorage.getItem(STATS_KEY)) || {};
        
        stats[today] = (stats[today] || 0) + 1;
        
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
        console.log(`[Stats] Activity recorded for ${today}. Total today: ${stats[today]}`);
        
        // If we are currently viewing the profile, refresh the graph
        if (typeof initProfileSection === 'function' && document.getElementById('section-profile')?.style.display !== 'none') {
            generateContributionGraph();
        }
    } catch (e) {
        console.error('Failed to record activity:', e);
    }
};

/**
 * Gets activity data for a specific date.
 */
window.getActivityForDate = function(dateString) {
    const stats = JSON.parse(localStorage.getItem(STATS_KEY)) || {};
    return stats[dateString] || 0;
};
