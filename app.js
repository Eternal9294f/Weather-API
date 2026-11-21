/**
 * WeatherMood • Application Engine
 * Luxury weather intelligence with mythic anime archetypes (AoT & Berserk) and PM Telemetry
 */

// Top 10 Curated Metropolises
const TOP_CITIES = [
  { name: 'Tokyo', code: 'TYO', query: 'Tokyo' },
  { name: 'London', code: 'LON', query: 'London' },
  { name: 'New York', code: 'NYC', query: 'New York' },
  { name: 'Paris', code: 'PAR', query: 'Paris' },
  { name: 'Dubai', code: 'DXB', query: 'Dubai' },
  { name: 'Mumbai', code: 'BOM', query: 'Mumbai' },
  { name: 'Singapore', code: 'SIN', query: 'Singapore' },
  { name: 'Sydney', code: 'SYD', query: 'Sydney' },
  { name: 'San Francisco', code: 'SFO', query: 'San Francisco' },
  { name: 'Berlin', code: 'BER', query: 'Berlin' }
];

// App State
const state = {
  activeUnit: 'C', // 'C' or 'F'
  activeCityQuery: 'London',
  activeTab: 'formatted', // 'formatted' or 'raw'
  customApiKey: localStorage.getItem('weathermood_custom_api_key') || '',
  currentPayload: null,
  isLoading: false
};

// DOM References
const elements = {
  searchForm: document.getElementById('searchForm'),
  cityInput: document.getElementById('cityInput'),
  clearSearchBtn: document.getElementById('clearSearchBtn'),
  searchBtn: document.getElementById('searchBtn'),
  cityChips: document.getElementById('cityChips'),
  errorBanner: document.getElementById('errorBanner'),
  errorTitle: document.getElementById('errorTitle'),
  errorMessage: document.getElementById('errorMessage'),
  dismissErrorBtn: document.getElementById('dismissErrorBtn'),
  loadingState: document.getElementById('loadingState'),
  resultsArea: document.getElementById('resultsArea'),
  unitC: document.getElementById('unitC'),
  unitF: document.getElementById('unitF'),
  
  // Hero Elements
  moodHeroCard: document.getElementById('moodHeroCard'),
  ambientGlow1: document.getElementById('ambientGlow1'),
  ambientGlow2: document.getElementById('ambientGlow2'),
  mythicWatermark: document.getElementById('mythicWatermark'),
  locationName: document.getElementById('locationName'),
  locationSub: document.getElementById('locationSub'),
  locationCountryCode: document.getElementById('locationCountryCode'),
  locationTz: document.getElementById('locationTz'),
  localTimeDisplay: document.getElementById('localTimeDisplay'),
  dayNightPill: document.getElementById('dayNightPill'),
  conditionIcon: document.getElementById('conditionIcon'),
  conditionText: document.getElementById('conditionText'),
  tempNumber: document.getElementById('tempNumber'),
  tempUnitSymbol: document.getElementById('tempUnitSymbol'),
  feelsLikeValue: document.getElementById('feelsLikeValue'),
  
  // Mood Engine Elements
  moodArchetypeTag: document.getElementById('moodArchetypeTag'),
  moodVerdict: document.getElementById('moodVerdict'),
  moodDescription: document.getElementById('moodDescription'),
  moodQuoteText: document.getElementById('moodQuoteText'),
  moodTempStatus: document.getElementById('moodTempStatus'),
  moodHumStatus: document.getElementById('moodHumStatus'),
  moodWindStatus: document.getElementById('moodWindStatus'),
  
  // Metric Cards
  humidityValue: document.getElementById('humidityValue'),
  humidityBar: document.getElementById('humidityBar'),
  humidityNote: document.getElementById('humidityNote'),
  
  windSpeedValue: document.getElementById('windSpeedValue'),
  windSpeedUnit: document.getElementById('windSpeedUnit'),
  windDirValue: document.getElementById('windDirValue'),
  windGustValue: document.getElementById('windGustValue'),
  windNote: document.getElementById('windNote'),
  
  uvValue: document.getElementById('uvValue'),
  uvBar: document.getElementById('uvBar'),
  uvNote: document.getElementById('uvNote'),
  
  pressureValue: document.getElementById('pressureValue'),
  dewPointValue: document.getElementById('dewPointValue'),
  precipValue: document.getElementById('precipValue'),
  pressureNote: document.getElementById('pressureNote'),
  
  cloudValue: document.getElementById('cloudValue'),
  cloudBar: document.getElementById('cloudBar'),
  cloudNote: document.getElementById('cloudNote'),
  
  visibilityValue: document.getElementById('visibilityValue'),
  visUnit: document.getElementById('visUnit'),
  visBar: document.getElementById('visBar'),
  visNote: document.getElementById('visNote'),
  
  // Inspector Terminal
  tabFormatted: document.getElementById('tabFormatted'),
  tabRaw: document.getElementById('tabRaw'),
  copyJsonBtn: document.getElementById('copyJsonBtn'),
  copyBtnText: document.getElementById('copyBtnText'),
  formattedJsonView: document.getElementById('formattedJsonView'),
  formattedJsonCode: document.getElementById('formattedJsonCode'),
  rawJsonView: document.getElementById('rawJsonView'),
  payloadMetaInfo: document.getElementById('payloadMetaInfo'),
  payloadTimestamp: document.getElementById('payloadTimestamp'),
  
  // Modals & Toasts
  pmSpecBtn: document.getElementById('pmSpecBtn'),
  pmCaseStudyModal: document.getElementById('pmCaseStudyModal'),
  closePmModalBtn: document.getElementById('closePmModalBtn'),
  dismissPmModalBtn: document.getElementById('dismissPmModalBtn'),
  
  apiKeyModalBtn: document.getElementById('apiKeyModalBtn'),
  apiConfigModal: document.getElementById('apiConfigModal'),
  closeModalBtn: document.getElementById('closeModalBtn'),
  customKeyInput: document.getElementById('customKeyInput'),
  saveKeyBtn: document.getElementById('saveKeyBtn'),
  resetKeyBtn: document.getElementById('resetKeyBtn'),
  credToast: document.getElementById('credToast'),
  toastMessage: document.getElementById('toastMessage')
};

/* ==========================================================================
   1. Atmospheric Mood Calculation Engine (Anime Archetypes)
   Evaluates temperature, humidity, wind velocity, condition codes
   ========================================================================== */
function calculateWeatherMood(current) {
  const temp = current.temp_c;
  const hum = current.humidity;
  const wind = current.wind_kph;
  const code = current.condition ? current.condition.code : 1000;
  const isDay = current.is_day === 1;
  const text = (current.condition && current.condition.text) ? current.condition.text.toLowerCase() : '';

  // Classifications for status badges
  let tempClass = temp <= 5 ? 'FRIGID' : temp <= 16 ? 'COOL' : temp <= 26 ? 'MILD' : temp <= 32 ? 'WARM' : 'TORRID';
  let humClass = hum < 35 ? 'ARID' : hum <= 65 ? 'OPTIMAL' : hum <= 80 ? 'HUMID' : 'SATURATED';
  let windClass = wind < 10 ? 'CALM' : wind <= 24 ? 'BREEZY' : wind <= 40 ? 'GUSTY' : 'GALE-FORCE';

  // 1. Severe Storms & Thunder & Lightning -> THE RUMBLING
  if ([1087, 1273, 1276, 1279, 1282].includes(code) || text.includes('thunder') || text.includes('storm')) {
    return {
      archetype: 'THE RUMBLING',
      verdict: 'TITAN TEMPEST',
      description: 'Charged electromagnetic atmosphere with turbulent skies and rolling thunder. A formidable display of nature’s unstoppable might.',
      quote: 'If you don’t fight, you can’t win. Even in the tempest, keep moving forward.',
      accent: '#A855F7',
      watermarkColor: 'rgba(168, 85, 247, 0.08)',
      tempClass, humClass, windClass
    };
  }

  // 2. Freezing Temperatures & Snow -> BEYOND THE WALL
  if (temp <= 0 || [1114, 1117, 1219, 1222, 1225].includes(code) || text.includes('blizzard') || text.includes('snow')) {
    return {
      archetype: 'BEYOND THE WALL',
      verdict: 'ARCTIC DESOLATION',
      description: 'Sub-zero northern winds and crystalline frost. Draw your Scout mantle tight against the howling snow and seek warm hearths.',
      quote: 'Beyond the wall lies an endless frozen frontier. Keep your resolve burning.',
      accent: '#38BDF8',
      watermarkColor: 'rgba(56, 189, 248, 0.08)',
      tempClass, humClass, windClass
    };
  }

  // 3. Rain & Overcast Drizzle -> RAIN OVER ELDIA
  if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243].includes(code) || text.includes('rain') || text.includes('drizzle')) {
    return {
      archetype: 'RAIN OVER ELDIA',
      verdict: 'COZY & CONTEMPLATIVE',
      description: 'Gentle raindrops drumming against ancient ramparts. A quiet, acoustic ambience made for hot tea, books, and deep tactical thought.',
      quote: 'Rain falls equally on the strong and the weak. Find quiet peace in the deluge.',
      accent: '#818CF8',
      watermarkColor: 'rgba(129, 140, 248, 0.08)',
      tempClass, humClass, windClass
    };
  }

  // 4. High Heat + High Humidity -> THE ECLIPSE
  if (temp >= 28 && hum >= 70) {
    return {
      archetype: 'THE ECLIPSE',
      verdict: 'SULTRY OPPRESSION',
      description: 'Thick, crimson haze locking in oppressive thermal moisture. The air is heavy as iron; retreat to shaded sanctuaries and hydrate.',
      quote: 'A crimson eclipse casting suffocating heat across the realm. Endure the crucible.',
      accent: '#FF4757',
      watermarkColor: 'rgba(255, 71, 87, 0.08)',
      tempClass, humClass, windClass
    };
  }

  // 5. Scorching Desert Heat -> SCORCHED DESERT
  if (temp >= 32 && hum < 45) {
    return {
      archetype: 'SCORCHED DESERT',
      verdict: 'BLAZING ARIDITY',
      description: 'Piercing solar rays and dry thermal drafts sweeping through the district. Seek air-conditioned shelter and cold refreshments.',
      quote: 'The midday sun tests every warrior’s endurance.',
      accent: '#FFB800',
      watermarkColor: 'rgba(255, 184, 0, 0.08)',
      tempClass, humClass, windClass
    };
  }

  // 6. High Wind Speeds -> WINGS OF FREEDOM
  if (wind >= 35) {
    return {
      archetype: 'WINGS OF FREEDOM',
      verdict: 'GALE VELOCITY',
      description: 'Restless high-altitude air currents whipping through the streets. Unchained velocity carrying the spirit of freedom.',
      quote: 'My comrades do not buckle. We take flight upon the storm winds.',
      accent: '#00F0FF',
      watermarkColor: 'rgba(0, 240, 255, 0.08)',
      tempClass, humClass, windClass
    };
  }

  // 7. Perfect Equilibrium (19-26°C, optimal humidity) -> BAND OF THE HAWK
  if (temp >= 19 && temp <= 26 && hum >= 35 && hum <= 65 && wind <= 22) {
    return {
      archetype: 'BAND OF THE HAWK',
      verdict: 'GOLDEN BLISS',
      description: 'Flawless thermal equilibrium, pristine atmosphere, and a caressing gentle breeze. Unhindered sightlines to the horizon.',
      quote: 'A rare dawn of absolute calm and radiant daylight. Clear skies across the territory.',
      accent: '#00E599',
      watermarkColor: 'rgba(0, 229, 153, 0.08)',
      tempClass, humClass, windClass
    };
  }

  // 8. Crisp Cool Weather -> WALL ROSE
  if (temp >= 5 && temp <= 16) {
    return {
      archetype: 'WALL ROSE',
      verdict: 'CRISP VIGILANCE',
      description: 'Sharp, invigorating air clearing the mind and quickening sensory reflexes. Ideal for disciplined walks and purposeful study.',
      quote: 'Clean breezes over the watchtowers. Steady hands and sharp senses.',
      accent: '#38BDF8',
      watermarkColor: 'rgba(56, 189, 248, 0.08)',
      tempClass, humClass, windClass
    };
  }

  // 9. Night Tranquility -> MOONLIT FORTRESS
  if (!isDay && temp >= 15 && temp <= 25) {
    return {
      archetype: 'MOONLIT FORTRESS',
      verdict: 'SERENE NOCTURNE',
      description: 'Velvet nighttime sky and soothing thermal calm under the stars. Quiet restorative stillness before the morning expedition.',
      quote: 'Even in darkness, the stars remember our path.',
      accent: '#A855F7',
      watermarkColor: 'rgba(168, 85, 247, 0.08)',
      tempClass, humClass, windClass
    };
  }

  // Default State -> WALL SINA
  return {
    archetype: 'WALL SINA',
    verdict: 'SERENE EQUILIBRIUM',
    description: 'Steady, balanced atmospheric readings across temperature, humidity, and wind. A peaceful, restorative baseline for daily life.',
    quote: 'Quiet security within the walls. A tranquil sky above.',
    accent: '#00E599',
    watermarkColor: 'rgba(0, 229, 153, 0.08)',
    tempClass, humClass, windClass
  };
}

/* ==========================================================================
   2. API Communication
   Routes to secure /api/weather serverless endpoint, with direct key fallback
   ========================================================================== */
async function fetchWeatherData(city) {
  showLoading(true);
  hideError();

  try {
    let url;
    const activeKey = state.customApiKey.trim() || '1362b3e4f3934d8098d133406261909';
    const isLocalFile = window.location.protocol === 'file:';
    
    if (isLocalFile) {
      // Direct call when user double-clicks index.html in file explorer
      url = `https://api.weatherapi.com/v1/forecast.json?key=${encodeURIComponent(activeKey)}&q=${encodeURIComponent(city)}&days=3&aqi=no&alerts=yes`;
    } else {
      // Standard production Vercel & serverless route
      const queryParams = new URLSearchParams({ q: city });
      if (state.customApiKey.trim()) {
        queryParams.set('key', state.customApiKey.trim());
      }
      url = `/api/weather?${queryParams.toString()}`;
    }

    let response;
    try {
      response = await fetch(url);
    } catch (networkErr) {
      // Fallback if local server is not running
      if (!isLocalFile) {
        const fallbackUrl = `https://api.weatherapi.com/v1/forecast.json?key=${encodeURIComponent(activeKey)}&q=${encodeURIComponent(city)}&days=3&aqi=no&alerts=yes`;
        response = await fetch(fallbackUrl);
      } else {
        throw networkErr;
      }
    }
    const data = await response.json();

    if (!response.ok) {
      const errMsg = (data && data.error && data.error.message) 
        ? data.error.message 
        : `Network response returned HTTP status ${response.status}`;
      throw new Error(errMsg);
    }

    state.currentPayload = data;
    renderWeather(data);
    showToast(`TELEMETRY ACQUIRED: ${data.location.name.toUpperCase()}`);

  } catch (err) {
    console.error('Weather fetch error:', err);
    showError('Scout Telemetry Failed', err.message || 'Unable to contact weather service. Please verify city name.');
  } finally {
    showLoading(false);
  }
}

/* ==========================================================================
   3. UI Rendering & Display
   ========================================================================== */
function renderWeather(data) {
  if (!data || !data.location || !data.current) return;

  const loc = data.location;
  const cur = data.current;
  const mood = calculateWeatherMood(cur);

  // Apply Mood Colors & Glow Accents
  document.documentElement.style.setProperty('--accent-cred', mood.accent);
  elements.ambientGlow1.style.background = mood.accent;
  elements.moodHeroCard.style.borderColor = mood.accent;
  elements.moodVerdict.style.color = mood.accent;
  elements.mythicWatermark.style.color = mood.watermarkColor;

  // Location Metadata
  elements.locationName.textContent = loc.name;
  elements.locationSub.textContent = [loc.region, loc.country].filter(Boolean).join(', ');
  elements.locationCountryCode.textContent = loc.country || 'GLOBAL';
  elements.locationTz.textContent = loc.tz_id || 'UTC';
  elements.localTimeDisplay.textContent = loc.localtime || new Date().toISOString();
  
  elements.dayNightPill.textContent = cur.is_day === 1 ? 'DAYLIGHT' : 'NIGHT';
  elements.dayNightPill.style.color = cur.is_day === 1 ? '#FFB800' : '#818CF8';

  // Condition & Icon
  if (cur.condition) {
    elements.conditionText.textContent = cur.condition.text;
    let iconUrl = cur.condition.icon;
    if (iconUrl.startsWith('//')) {
      iconUrl = 'https:' + iconUrl;
    }
    // High-res icon swap if available
    elements.conditionIcon.src = iconUrl.replace('64x64', '128x128');
    elements.conditionIcon.alt = cur.condition.text;
  }

  // Temperature with Active Unit
  updateTemperatureDisplay(cur);

  // Mood Verdict, Archetype & Anime Commentary
  elements.moodArchetypeTag.textContent = `ARCHETYPE: ${mood.archetype}`;
  elements.moodVerdict.textContent = mood.verdict;
  elements.moodDescription.textContent = mood.description;
  elements.moodQuoteText.textContent = mood.quote;
  elements.moodTempStatus.textContent = mood.tempClass;
  elements.moodHumStatus.textContent = mood.humClass;
  elements.moodWindStatus.textContent = mood.windClass;

  // Humidity Card
  elements.humidityValue.textContent = cur.humidity;
  elements.humidityBar.style.width = `${Math.min(cur.humidity, 100)}%`;
  elements.humidityNote.textContent = cur.humidity > 70 
    ? 'Heavy atmospheric moisture' 
    : cur.humidity < 35 
      ? 'Dry arid equilibrium' 
      : 'Optimal human comfort zone';

  // Wind Card
  const isC = state.activeUnit === 'C';
  elements.windSpeedValue.textContent = isC ? cur.wind_kph.toFixed(1) : cur.wind_mph.toFixed(1);
  elements.windSpeedUnit.textContent = isC ? 'km/h' : 'mph';
  elements.windDirValue.textContent = `${cur.wind_dir} (${cur.wind_degree}°)`;
  elements.windGustValue.textContent = isC 
    ? `${(cur.gust_kph || cur.wind_kph).toFixed(1)} km/h` 
    : `${(cur.gust_mph || cur.wind_mph).toFixed(1)} mph`;
  elements.windNote.textContent = cur.wind_kph > 35 
    ? 'Gale-force gusts sweeping the ramparts' 
    : cur.wind_kph > 15 
      ? 'Wings of Freedom steady breeze' 
      : 'Calm ambient air movement';

  // UV Index Card
  elements.uvValue.textContent = (cur.uv || 0).toFixed(1);
  const uvPercent = Math.min(((cur.uv || 0) / 11) * 100, 100);
  elements.uvBar.style.width = `${Math.max(uvPercent, 4)}%`;
  elements.uvNote.textContent = cur.uv >= 8 
    ? 'Extreme UV: Sun protection mandatory' 
    : cur.uv >= 6 
      ? 'High UV: Seek shade during peak hours' 
      : cur.uv >= 3 
        ? 'Moderate UV: Normal exposure' 
        : 'Minimal / Zero UV radiation';

  // Pressure Card
  elements.pressureValue.textContent = Math.round(cur.pressure_mb);
  const dewVal = isC ? `${cur.dewpoint_c}°C` : `${cur.dewpoint_f}°F`;
  elements.dewPointValue.textContent = dewVal;
  elements.precipValue.textContent = `${cur.precip_mm || 0.0} mm`;
  elements.pressureNote.textContent = cur.pressure_mb > 1020 
    ? 'Robust high-pressure system' 
    : cur.pressure_mb < 1005 
      ? 'Depression front / storm system' 
      : 'Stable standard atmospheric pressure';

  // Cloud Card
  elements.cloudValue.textContent = cur.cloud;
  elements.cloudBar.style.width = `${cur.cloud}%`;
  elements.cloudNote.textContent = cur.cloud > 80 
    ? 'Dense cloud cover / Overcast skies' 
    : cur.cloud > 30 
      ? 'Scattered cumulus formations' 
      : 'Pristine, cloudless sightlines';

  // Visibility Card
  elements.visibilityValue.textContent = isC ? (cur.vis_km || 10).toFixed(1) : (cur.vis_miles || 6).toFixed(1);
  elements.visUnit.textContent = isC ? 'km' : 'mi';
  const visPercent = Math.min(((cur.vis_km || 10) / 10) * 100, 100);
  elements.visBar.style.width = `${visPercent}%`;
  elements.visNote.textContent = cur.vis_km >= 10 
    ? 'Crystal clear optical horizon' 
    : cur.vis_km >= 5 
      ? 'Minor atmospheric haze' 
      : 'Reduced visibility / Fog present';

  // Render JSON Inspector
  renderJsonInspector(data);

  // Update active chip highlight
  highlightActiveChip(loc.name);
}

function updateTemperatureDisplay(cur) {
  if (!cur) return;
  const isC = state.activeUnit === 'C';
  const tempVal = isC ? Math.round(cur.temp_c) : Math.round(cur.temp_f);
  const feelsVal = isC ? Math.round(cur.feelslike_c) : Math.round(cur.feelslike_f);
  const unitSym = isC ? '°C' : '°F';

  elements.tempNumber.textContent = tempVal;
  elements.tempUnitSymbol.textContent = unitSym;
  elements.feelsLikeValue.textContent = `${feelsVal}${unitSym}`;
}

/* ==========================================================================
   4. Developer JSON Inspector & Syntax Highlighting
   ========================================================================== */
function renderJsonInspector(data) {
  const jsonString = JSON.stringify(data, null, 2);
  const rawString = JSON.stringify(data);

  // Syntax Highlighting
  elements.formattedJsonCode.innerHTML = syntaxHighlightJson(jsonString);
  elements.rawJsonView.value = rawString;

  // Metadata
  const sizeBytes = new Blob([jsonString]).size;
  elements.payloadMetaInfo.textContent = `STATUS: 200 OK • BYTES: ${sizeBytes} B • ENCODING: UTF-8`;
  elements.payloadTimestamp.textContent = `TIMESTAMP: ${new Date().toLocaleTimeString()}`;
}

function syntaxHighlightJson(json) {
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'json-number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'json-key';
      } else {
        cls = 'json-string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'json-boolean';
    } else if (/null/.test(match)) {
      cls = 'json-null';
    }
    return `<span class="${cls}">${match}</span>`;
  });
}

/* ==========================================================================
   5. Interactive Chips & Metropolises
   ========================================================================== */
function setupCityChips() {
  elements.cityChips.innerHTML = '';
  TOP_CITIES.forEach(city => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'city-chip';
    chip.dataset.query = city.query;
    chip.innerHTML = `
      <span>${city.name}</span>
      <span class="chip-code">${city.code}</span>
    `;

    chip.addEventListener('click', () => {
      elements.cityInput.value = city.query;
      state.activeCityQuery = city.query;
      fetchWeatherData(city.query);
    });

    elements.cityChips.appendChild(chip);
  });
}

function highlightActiveChip(activeCityName) {
  const chips = elements.cityChips.querySelectorAll('.city-chip');
  chips.forEach(chip => {
    if (chip.dataset.query.toLowerCase() === activeCityName.toLowerCase() ||
        activeCityName.toLowerCase().includes(chip.dataset.query.toLowerCase())) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
}

/* ==========================================================================
   6. UI State Management (Loading, Errors, Toasts)
   ========================================================================== */
function showLoading(show) {
  state.isLoading = show;
  elements.loadingState.style.display = show ? 'flex' : 'none';
  elements.resultsArea.style.opacity = show ? '0.2' : '1';
  elements.resultsArea.style.pointerEvents = show ? 'none' : 'auto';
  elements.searchBtn.disabled = show;
}

function showError(title, message) {
  elements.errorTitle.textContent = title;
  elements.errorMessage.textContent = message;
  elements.errorBanner.style.display = 'flex';
}

function hideError() {
  elements.errorBanner.style.display = 'none';
}

function showToast(message) {
  elements.toastMessage.textContent = message;
  elements.credToast.style.display = 'flex';
  
  if (window.toastTimer) clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    elements.credToast.style.display = 'none';
  }, 2600);
}

/* ==========================================================================
   7. Event Listeners & Bootstrapping
   ========================================================================== */
function initEvents() {
  // Search Form Submit
  elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = elements.cityInput.value.trim();
    if (query) {
      state.activeCityQuery = query;
      fetchWeatherData(query);
    }
  });

  // Clear Search Input Button
  elements.cityInput.addEventListener('input', () => {
    elements.clearSearchBtn.style.display = elements.cityInput.value.trim() ? 'block' : 'none';
  });

  elements.clearSearchBtn.addEventListener('click', () => {
    elements.cityInput.value = '';
    elements.clearSearchBtn.style.display = 'none';
    elements.cityInput.focus();
  });

  // Error Dismiss
  elements.dismissErrorBtn.addEventListener('click', hideError);

  // Unit Switcher (°C / °F)
  elements.unitC.addEventListener('click', () => {
    if (state.activeUnit !== 'C') {
      state.activeUnit = 'C';
      elements.unitC.classList.add('active');
      elements.unitF.classList.remove('active');
      if (state.currentPayload) {
        renderWeather(state.currentPayload);
      }
    }
  });

  elements.unitF.addEventListener('click', () => {
    if (state.activeUnit !== 'F') {
      state.activeUnit = 'F';
      elements.unitF.classList.add('active');
      elements.unitC.classList.remove('active');
      if (state.currentPayload) {
        renderWeather(state.currentPayload);
      }
    }
  });

  // Inspector Tabs (Formatted vs Raw)
  elements.tabFormatted.addEventListener('click', () => {
    state.activeTab = 'formatted';
    elements.tabFormatted.classList.add('active');
    elements.tabRaw.classList.remove('active');
    elements.formattedJsonView.style.display = 'block';
    elements.rawJsonView.style.display = 'none';
  });

  elements.tabRaw.addEventListener('click', () => {
    state.activeTab = 'raw';
    elements.tabRaw.classList.add('active');
    elements.tabFormatted.classList.remove('active');
    elements.formattedJsonView.style.display = 'none';
    elements.rawJsonView.style.display = 'block';
  });

  // Copy JSON Payload Button
  elements.copyJsonBtn.addEventListener('click', async () => {
    if (!state.currentPayload) return;
    const textToCopy = state.activeTab === 'raw' 
      ? JSON.stringify(state.currentPayload) 
      : JSON.stringify(state.currentPayload, null, 2);

    try {
      await navigator.clipboard.writeText(textToCopy);
      elements.copyBtnText.textContent = 'COPIED!';
      showToast('PAYLOAD COPIED TO CLIPBOARD');
      setTimeout(() => {
        elements.copyBtnText.textContent = 'COPY JSON';
      }, 2000);
    } catch (err) {
      // Fallback
      elements.rawJsonView.select();
      document.execCommand('copy');
      showToast('PAYLOAD COPIED TO CLIPBOARD');
    }
  });

  // PM Case Study Modal Toggle
  elements.pmSpecBtn.addEventListener('click', () => {
    elements.pmCaseStudyModal.style.display = 'flex';
  });

  elements.closePmModalBtn.addEventListener('click', () => {
    elements.pmCaseStudyModal.style.display = 'none';
  });

  elements.dismissPmModalBtn.addEventListener('click', () => {
    elements.pmCaseStudyModal.style.display = 'none';
  });

  elements.pmCaseStudyModal.addEventListener('click', (e) => {
    if (e.target === elements.pmCaseStudyModal) {
      elements.pmCaseStudyModal.style.display = 'none';
    }
  });

  // API Config Modal
  elements.apiKeyModalBtn.addEventListener('click', () => {
    elements.customKeyInput.value = state.customApiKey;
    elements.apiConfigModal.style.display = 'flex';
  });

  elements.closeModalBtn.addEventListener('click', () => {
    elements.apiConfigModal.style.display = 'none';
  });

  elements.apiConfigModal.addEventListener('click', (e) => {
    if (e.target === elements.apiConfigModal) {
      elements.apiConfigModal.style.display = 'none';
    }
  });

  elements.saveKeyBtn.addEventListener('click', () => {
    const val = elements.customKeyInput.value.trim();
    state.customApiKey = val;
    if (val) {
      localStorage.setItem('weathermood_custom_api_key', val);
      showToast('CUSTOM API KEY APPLIED');
    } else {
      localStorage.removeItem('weathermood_custom_api_key');
      showToast('RESET TO SERVER ENVIRONMENT KEY');
    }
    elements.apiConfigModal.style.display = 'none';
    fetchWeatherData(state.activeCityQuery);
  });

  elements.resetKeyBtn.addEventListener('click', () => {
    elements.customKeyInput.value = '';
    state.customApiKey = '';
    localStorage.removeItem('weathermood_custom_api_key');
    showToast('RESET TO DEFAULT SERVER KEY');
    elements.apiConfigModal.style.display = 'none';
    fetchWeatherData(state.activeCityQuery);
  });
}

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  setupCityChips();
  initEvents();

  // Initial load with London
  elements.cityInput.value = 'London';
  elements.clearSearchBtn.style.display = 'block';
  fetchWeatherData('London');
});
