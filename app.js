// App State
let selectedPicks = [];
let autoRefreshInterval = null;
let isRefreshing = false;

// Today's game data - Chiefs vs Jaguars only
const gameData = {
  todays_game: {
    away_team: "Kansas City Chiefs",
    home_team: "Jacksonville Jaguars",
    game_time: "Mon 8:15 PM ET",
    location: "EverBank Stadium, Jacksonville, FL",
    weather: {
      temp: 79,
      condition: "Clear",
      wind_speed: 8,
      humidity: 72
    }
  },
  nfl_props: [
    {
      id: "mahomes-pass-yards",
      player: "Patrick Mahomes",
      position: "QB",
      team: "KC",
      matchup: "KC @ JAX",
      stat_type: "Passing Yards",
      line: 267.5,
      previous_line: 265.5,
      sportsbook: "DraftKings",
      game_time: "Mon 8:15 PM ET",
      recommendation: "more",
      confidence: "high",
      reasoning: "Mahomes has thrown for 270+ yards in 3 of 4 games this season. Jaguars defense allows 265 passing yards per game (19th in NFL). Clear weather conditions in Jacksonville favor the passing game.",
      weather: {
        temp: 79,
        condition: "Clear",
        wind_speed: 8,
        humidity: 72
      },
      injury_status: "Healthy"
    },
    {
      id: "kelce-receptions",
      player: "Travis Kelce",
      position: "TE",
      team: "KC",
      matchup: "KC @ JAX",
      stat_type: "Receptions",
      line: 5.5,
      previous_line: 5.5,
      sportsbook: "FanDuel",
      game_time: "Mon 8:15 PM ET",
      recommendation: "more",
      confidence: "high",
      reasoning: "Kelce has 6+ receptions in 4 straight games. Jaguars allow 6.8 receptions per game to tight ends (3rd worst in NFL). Mahomes' favorite target in primetime games.",
      weather: {
        temp: 79,
        condition: "Clear",
        wind_speed: 8,
        humidity: 72
      },
      injury_status: "Healthy"
    },
    {
      id: "hunt-rush-yards",
      player: "Kareem Hunt",
      position: "RB",
      team: "KC",
      matchup: "KC @ JAX",
      stat_type: "Rushing Yards",
      line: 67.5,
      previous_line: 69.5,
      sportsbook: "BetMGM",
      game_time: "Mon 8:15 PM ET",
      recommendation: "more",
      confidence: "medium",
      reasoning: "Hunt averaging 78 rushing yards per game since returning. Jaguars allow 125 rushing yards per game (22nd in NFL). Line moved down creating value on the over.",
      weather: {
        temp: 79,
        condition: "Clear",
        wind_speed: 8,
        humidity: 72
      },
      injury_status: "Healthy"
    },
    {
      id: "lawrence-pass-yards",
      player: "Trevor Lawrence",
      position: "QB",
      team: "JAX",
      matchup: "KC @ JAX",
      stat_type: "Passing Yards",
      line: 244.5,
      previous_line: 242.5,
      sportsbook: "DraftKings",
      game_time: "Mon 8:15 PM ET",
      recommendation: "less",
      confidence: "medium",
      reasoning: "Lawrence has struggled with consistency this season, under 245 yards in 3 of 5 games. Chiefs defense improved recently. Jaguars may lean on running game at home.",
      weather: {
        temp: 79,
        condition: "Clear",
        wind_speed: 8,
        humidity: 72
      },
      injury_status: "Healthy"
    },
    {
      id: "ridley-rec-yards",
      player: "Calvin Ridley",
      position: "WR",
      team: "JAX",
      matchup: "KC @ JAX",
      stat_type: "Receiving Yards",
      line: 62.5,
      previous_line: 64.5,
      sportsbook: "FanDuel",
      game_time: "Mon 8:15 PM ET",
      recommendation: "more",
      confidence: "medium",
      reasoning: "Ridley averaging 71 receiving yards per game. Chiefs secondary has been vulnerable to slot receivers. Monday Night Football stage could elevate his performance.",
      weather: {
        temp: 79,
        condition: "Clear",
        wind_speed: 8,
        humidity: 72
      },
      injury_status: "Healthy"
    },
    {
      id: "etienne-rush-yards",
      player: "Travis Etienne Jr.",
      position: "RB",
      team: "JAX",
      matchup: "KC @ JAX",
      stat_type: "Rushing Yards",
      line: 73.5,
      previous_line: 75.5,
      sportsbook: "BetMGM",
      game_time: "Mon 8:15 PM ET",
      recommendation: "more",
      confidence: "high",
      reasoning: "Etienne has exceeded 75 rushing yards in 4 of 5 games this season. Chiefs defense allows 118 rushing yards per game (24th in NFL). Home field advantage at EverBank Stadium.",
      weather: {
        temp: 79,
        condition: "Clear",
        wind_speed: 8,
        humidity: 72
      },
      injury_status: "Healthy"
    },
    {
      id: "engram-receptions",
      player: "Evan Engram",
      position: "TE",
      team: "JAX",
      matchup: "KC @ JAX",
      stat_type: "Receptions",
      line: 4.5,
      previous_line: 4.5,
      sportsbook: "DraftKings",
      game_time: "Mon 8:15 PM ET",
      recommendation: "more",
      confidence: "medium",
      reasoning: "Engram has 5+ receptions in 3 of 5 games. Chiefs allow 5.2 receptions per game to tight ends. Lawrence looks to tight ends in crucial situations.",
      weather: {
        temp: 79,
        condition: "Clear",
        wind_speed: 8,
        humidity: 72
      },
      injury_status: "Healthy"
    },
    {
      id: "mahomes-pass-tds",
      player: "Patrick Mahomes",
      position: "QB",
      team: "KC",
      matchup: "KC @ JAX",
      stat_type: "Passing TDs",
      line: 1.5,
      previous_line: 1.5,
      sportsbook: "FanDuel",
      game_time: "Mon 8:15 PM ET",
      recommendation: "more",
      confidence: "high",
      reasoning: "Mahomes has thrown 2+ touchdown passes in 4 of 5 games this season. Jaguars defense allows 1.8 passing touchdowns per game. Chiefs excel in primetime games.",
      weather: {
        temp: 79,
        condition: "Clear",
        wind_speed: 8,
        humidity: 72
      },
      injury_status: "Healthy"
    }
  ],
  payout_table: {
    2: 3,
    3: 6,
    4: 12,
    5: 25,
    6: 50,
    7: 100,
    8: 200
  }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  console.log('🏈 NFL Player Props App initialized - Chiefs @ Jaguars MNF');
  
  // Set up tab navigation
  setupTabNavigation();
  
  // Load API keys from localStorage
  loadApiKeys();
  
  // Render props for tonight's game only
  renderProps();
  
  // Update slip display
  updateSlipDisplay();
  
  // Start auto-refresh
  startAutoRefresh();
  
  // Update timestamp
  updateLastUpdateTime();
  
  // Set up event listeners
  setupEventListeners();
  
  console.log(`📺 Showing props for tonight's game only: ${gameData.todays_game.away_team} @ ${gameData.todays_game.home_team}`);
}

function setupEventListeners() {
  // Refresh button
  const refreshBtn = document.getElementById('refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', manualRefresh);
  }
  
  // Clear all button
  const clearAllBtn = document.getElementById('clear-all-btn');
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', clearAllPicks);
  }
  
  // Submit button
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitEntry);
  }
  
  console.log('✅ Event listeners set up');
}

function setupTabNavigation() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      
      // Remove active class from all tabs and panes
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked tab and corresponding pane
      btn.classList.add('active');
      document.getElementById(`${targetTab}-tab`).classList.add('active');
      
      console.log(`📋 Switched to ${targetTab} tab`);
    });
  });
}

function renderProps() {
  const propsGrid = document.getElementById('props-grid');
  if (!propsGrid) return;
  
  propsGrid.innerHTML = '';
  
  gameData.nfl_props.forEach(prop => {
    const propCard = createPropCard(prop);
    propsGrid.appendChild(propCard);
  });
  
  console.log(`🏈 Rendered ${gameData.nfl_props.length} player props from KC and JAX`);
}

function createPropCard(prop) {
  const isSelected = selectedPicks.some(pick => pick.id === prop.id);
  const selectedPick = selectedPicks.find(pick => pick.id === prop.id);
  
  const lineMovement = prop.line > prop.previous_line ? 'up' : 
                      prop.line < prop.previous_line ? 'down' : '';
  const movementIcon = lineMovement === 'up' ? '↗' : lineMovement === 'down' ? '↘' : '';
  
  const card = document.createElement('div');
  card.className = `prop-card${isSelected ? ' selected' : ''}`;
  
  const moreSelected = selectedPick?.selection === 'more' ? ' selected' : '';
  const lessSelected = selectedPick?.selection === 'less' ? ' selected' : '';
  
  card.innerHTML = `
    <div class="prop-header">
      <div class="prop-player">
        <h3 class="player-name">${prop.player}</h3>
        <div class="player-details">
          <span>${prop.position}</span>
          <span>${prop.team}</span>
          <span>${prop.matchup}</span>
        </div>
      </div>
      <div class="confidence-badge ${prop.confidence}">
        ${prop.confidence}
      </div>
    </div>
    
    <div class="prop-line">
      <div class="stat-type">${prop.stat_type}</div>
      <div class="line-value">
        ${prop.line}
        ${movementIcon ? `<span class="line-movement ${lineMovement}">${movementIcon}</span>` : ''}
      </div>
    </div>
    
    <div class="prop-meta">
      <div class="meta-item">
        <span class="meta-label">Sportsbook</span>
        <span class="meta-value">${prop.sportsbook}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Game Time</span>
        <span class="meta-value">${prop.game_time}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Weather</span>
        <span class="meta-value">${prop.weather.temp}°F, ${prop.weather.condition}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Status</span>
        <span class="meta-value injury-status ${prop.injury_status.toLowerCase()}">${prop.injury_status}</span>
      </div>
    </div>
    
    <div class="prop-actions">
      <button class="bet-btn more-btn${moreSelected}" onclick="selectProp('${prop.id}', 'more')">
        MORE
      </button>
      <button class="bet-btn less-btn${lessSelected}" onclick="selectProp('${prop.id}', 'less')">
        LESS
      </button>
    </div>
    
    <div class="prop-reasoning">
      <strong>Analysis:</strong> ${prop.reasoning}
    </div>
  `;
  
  return card;
}

function selectProp(propId, selection) {
  const prop = gameData.nfl_props.find(p => p.id === propId);
  if (!prop) {
    console.error(`Prop not found: ${propId}`);
    return;
  }
  
  const existingPickIndex = selectedPicks.findIndex(pick => pick.id === propId);
  
  if (existingPickIndex !== -1) {
    // Update existing pick or remove if same selection
    if (selectedPicks[existingPickIndex].selection === selection) {
      // Remove pick if clicking same selection
      selectedPicks.splice(existingPickIndex, 1);
      console.log(`❌ Removed ${prop.player} from slip`);
    } else {
      // Update selection
      selectedPicks[existingPickIndex].selection = selection;
      console.log(`🔄 Updated ${prop.player} to ${selection.toUpperCase()}`);
    }
  } else {
    // Add new pick (max 8)
    if (selectedPicks.length >= 8) {
      alert('Maximum 8 picks allowed!');
      return;
    }
    
    selectedPicks.push({
      id: propId,
      player: prop.player,
      team: prop.team,
      stat_type: prop.stat_type,
      line: prop.line,
      selection: selection,
      sportsbook: prop.sportsbook,
      matchup: prop.matchup
    });
    console.log(`✅ Added ${prop.player} ${selection.toUpperCase()} to slip`);
  }
  
  // Re-render props and update slip
  renderProps();
  updateSlipDisplay();
}

function updateSlipDisplay() {
  const count = selectedPicks.length;
  const slipCount = document.getElementById('slip-count');
  const picksCount = document.querySelector('.picks-count');
  const payoutMultiplier = document.querySelector('.payout-multiplier');
  const emptySlip = document.getElementById('empty-slip');
  const selectedPicksContainer = document.getElementById('selected-picks');
  const clearBtn = document.getElementById('clear-all-btn');
  const submitBtn = document.getElementById('submit-btn');
  
  // Update counts
  if (slipCount) slipCount.textContent = count;
  if (picksCount) picksCount.textContent = `${count}/8 picks selected`;
  
  // Update payout multiplier
  if (payoutMultiplier) {
    if (count >= 2) {
      const multiplier = gameData.payout_table[count] || 1;
      payoutMultiplier.textContent = `${multiplier}x payout multiplier`;
    } else {
      payoutMultiplier.textContent = 'Select 2+ for payout';
    }
  }
  
  // Show/hide slip content
  if (emptySlip && selectedPicksContainer) {
    if (count === 0) {
      emptySlip.style.display = 'block';
      selectedPicksContainer.classList.remove('show');
    } else {
      emptySlip.style.display = 'none';
      selectedPicksContainer.classList.add('show');
      renderSelectedPicks();
    }
  }
  
  // Update button states
  if (clearBtn) clearBtn.disabled = count === 0;
  if (submitBtn) submitBtn.disabled = count < 2;
}

function renderSelectedPicks() {
  const container = document.getElementById('selected-picks');
  if (!container) return;
  
  container.innerHTML = '';
  
  selectedPicks.forEach(pick => {
    const pickItem = document.createElement('div');
    pickItem.className = 'pick-item';
    
    pickItem.innerHTML = `
      <div class="pick-details">
        <h4>${pick.player} <span class="pick-selection">${pick.selection.toUpperCase()}</span></h4>
        <p>${pick.stat_type} ${pick.selection === 'more' ? 'Over' : 'Under'} ${pick.line} • ${pick.matchup} • ${pick.sportsbook}</p>
      </div>
      <button class="remove-pick" onclick="removePick('${pick.id}')">Remove</button>
    `;
    
    container.appendChild(pickItem);
  });
}

function removePick(pickId) {
  const pickIndex = selectedPicks.findIndex(pick => pick.id === pickId);
  if (pickIndex !== -1) {
    const pick = selectedPicks[pickIndex];
    selectedPicks.splice(pickIndex, 1);
    console.log(`🗑️ Removed ${pick.player} from slip`);
    
    renderProps();
    updateSlipDisplay();
  }
}

function clearAllPicks() {
  if (selectedPicks.length === 0) {
    console.log('🤷 No picks to clear');
    return;
  }
  
  if (confirm('Clear all picks from your entry slip?')) {
    const previousCount = selectedPicks.length;
    selectedPicks = [];
    console.log(`🧹 Cleared all ${previousCount} picks`);
    
    renderProps();
    updateSlipDisplay();
    
    // Show success feedback
    alert(`Cleared ${previousCount} picks from your entry slip!`);
  } else {
    console.log('🚫 Clear all cancelled by user');
  }
}

function submitEntry() {
  if (selectedPicks.length < 2) {
    alert('You need at least 2 picks to submit an entry!');
    console.log('⚠️ Submit attempted with insufficient picks');
    return;
  }
  
  const multiplier = gameData.payout_table[selectedPicks.length] || 1;
  const picksList = selectedPicks.map(pick => 
    `${pick.player} ${pick.selection.toUpperCase()} ${pick.line} (${pick.matchup})`
  ).join('\n');
  
  const message = `Monday Night Football Entry Slip:

${picksList}

Total Picks: ${selectedPicks.length}
Payout Multiplier: ${multiplier}x
Game: ${gameData.todays_game.away_team} @ ${gameData.todays_game.home_team}
Time: ${gameData.todays_game.game_time}

Would you like to submit this entry?`;

  console.log('🎯 Submit entry attempt:', {
    picks: selectedPicks.length,
    multiplier: multiplier,
    gameDetails: `${gameData.todays_game.away_team} @ ${gameData.todays_game.home_team}`
  });

  if (confirm(message)) {
    console.log('🎯 MNF Entry submitted:', selectedPicks);
    alert('Entry submitted successfully for tonight\'s Monday Night Football game! Good luck! 🍀');
    
    // Clear picks after successful submission
    selectedPicks = [];
    renderProps();
    updateSlipDisplay();
  } else {
    console.log('🚫 Entry submission cancelled by user');
  }
}

function loadApiKeys() {
  const apiKeys = {
    odds: localStorage.getItem('odds-api-key'),
    balldontlie: localStorage.getItem('balldontlie-key'),
    weather: localStorage.getItem('weather-key')
  };
  
  // Populate input fields
  Object.keys(apiKeys).forEach(key => {
    const input = document.getElementById(`${key === 'odds' ? 'odds-api' : key}-key`);
    if (input && apiKeys[key]) {
      input.value = apiKeys[key];
    }
  });
  
  // Update status indicators
  updateApiStatus();
  updateConnectionStatus();
}

function saveApiKey(apiType) {
  const keyMap = {
    odds: 'odds-api-key',
    balldontlie: 'balldontlie-key', 
    weather: 'weather-key'
  };
  
  const inputId = keyMap[apiType];
  const input = document.getElementById(inputId);
  
  if (!input) {
    console.error(`Input not found for ${apiType}: ${inputId}`);
    return;
  }
  
  const key = input.value.trim();
  
  if (!key) {
    alert('Please enter an API key');
    return;
  }
  
  try {
    // Save to localStorage
    localStorage.setItem(inputId, key);
    console.log(`🔑 Saved ${apiType} API key`);
    
    // Update status
    updateApiStatus();
    updateConnectionStatus();
    
    // Show success message
    alert(`${apiType.charAt(0).toUpperCase() + apiType.slice(1)} API key saved successfully!`);
  } catch (error) {
    console.error('Error saving API key:', error);
    alert('Error saving API key. Please try again.');
  }
}

function updateApiStatus() {
  const statusMap = {
    odds: 'odds-status',
    balldontlie: 'balldontlie-status',
    weather: 'weather-status'
  };
  
  const keyMap = {
    odds: 'odds-api-key',
    balldontlie: 'balldontlie-key',
    weather: 'weather-key'
  };
  
  Object.keys(statusMap).forEach(api => {
    const statusEl = document.getElementById(statusMap[api]);
    const hasKey = localStorage.getItem(keyMap[api]);
    const statusLabel = statusEl?.parentElement?.querySelector('.status-label');
    
    if (statusEl && statusLabel) {
      if (hasKey) {
        statusEl.className = 'status-dot connected';
        statusLabel.textContent = 'Connected';
      } else {
        statusEl.className = 'status-dot disconnected';
        statusLabel.textContent = 'Not Connected';
      }
    }
  });
}

function updateConnectionStatus() {
  const connectedApis = [
    localStorage.getItem('odds-api-key'),
    localStorage.getItem('balldontlie-key'),
    localStorage.getItem('weather-key'),
    'espn' // ESPN is always connected (free)
  ].filter(Boolean).length;
  
  const statusDot = document.querySelector('.connection-status .status-dot');
  const statusText = document.querySelector('.status-text');
  
  if (statusDot && statusText) {
    if (connectedApis >= 3) {
      statusDot.className = 'status-dot connected';
      statusText.textContent = 'Live Data';
    } else {
      statusDot.className = 'status-dot disconnected';
      statusText.textContent = 'Demo Mode';
    }
  }
}

function startAutoRefresh() {
  // Clear existing interval
  if (autoRefreshInterval) {
    clearInterval(autoRefreshInterval);
  }
  
  // Start 30 second auto-refresh
  autoRefreshInterval = setInterval(() => {
    if (!isRefreshing) {
      refreshData();
    }
  }, 30000);
  
  console.log('⏰ Auto-refresh started (30s interval)');
}

function manualRefresh() {
  if (isRefreshing) {
    console.log('🔄 Refresh already in progress, skipping...');
    return;
  }
  
  console.log('🔄 Manual refresh triggered for MNF props');
  refreshData();
}

function refreshData() {
  if (isRefreshing) return;
  
  isRefreshing = true;
  const loadingOverlay = document.getElementById('loading-overlay');
  const refreshBtn = document.getElementById('refresh-btn');
  
  // Show loading state
  if (loadingOverlay) loadingOverlay.classList.add('show');
  if (refreshBtn) refreshBtn.disabled = true;
  
  // Simulate API call delay
  setTimeout(() => {
    try {
      // In a real app, this would fetch from APIs
      // For demo, we'll just update the timestamp and maybe randomize some lines slightly
      simulateDataUpdate();
      
      // Re-render props
      renderProps();
      
      // Update timestamp
      updateLastUpdateTime();
      
      console.log('✅ MNF props data refreshed');
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      // Hide loading state
      if (loadingOverlay) loadingOverlay.classList.remove('show');
      if (refreshBtn) refreshBtn.disabled = false;
      isRefreshing = false;
    }
  }, 1500);
}

function simulateDataUpdate() {
  // Simulate small line movements for demo
  gameData.nfl_props.forEach(prop => {
    // 30% chance of line movement
    if (Math.random() < 0.3) {
      prop.previous_line = prop.line;
      // Small random movement (-0.5 to +0.5)
      const movement = (Math.random() - 0.5);
      prop.line = Math.round((prop.line + movement) * 2) / 2; // Round to nearest 0.5
    }
  });
}

function updateLastUpdateTime() {
  const lastUpdateEl = document.getElementById('last-update-time');
  if (!lastUpdateEl) return;
  
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    timeZone: 'America/Denver',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });
  
  lastUpdateEl.textContent = timeString;
}

// Global functions for HTML onclick handlers
window.selectProp = selectProp;
window.removePick = removePick;
window.saveApiKey = saveApiKey;

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  if (autoRefreshInterval) {
    clearInterval(autoRefreshInterval);
  }
});