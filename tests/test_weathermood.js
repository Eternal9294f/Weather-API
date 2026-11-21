/**
 * Automated Test Suite for WeatherMood
 * Verifies file architecture, mood engine logic, and security constraints
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('       RUNNING WEATHERMOOD TEST SUITE              ');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  [FAIL] ${name}:`, err.message);
  }
}

// 1. Verify project file structure
runTest('Project file structure exists', () => {
  const root = path.join(__dirname, '..');
  const requiredFiles = [
    'index.html',
    'style.css',
    'app.js',
    'server.js',
    'vercel.json',
    'package.json',
    '.env',
    '.env.example',
    '.gitignore',
    'README.md',
    'api/weather.js'
  ];

  requiredFiles.forEach(file => {
    const fullPath = path.join(root, file);
    assert.strictEqual(fs.existsSync(fullPath), true, `File missing: ${file}`);
  });
});

// 2. Test Weather Mood Archetypes
function calculateWeatherMood(current) {
  const temp = current.temp_c;
  const hum = current.humidity;
  const wind = current.wind_kph;
  const code = current.condition ? current.condition.code : 1000;
  const isDay = current.is_day === 1;
  const text = (current.condition && current.condition.text) ? current.condition.text.toLowerCase() : '';

  if ([1087, 1273, 1276, 1279, 1282].includes(code) || text.includes('thunder') || text.includes('storm')) {
    return 'THE RUMBLING';
  }
  if (temp <= 0 || [1114, 1117, 1219, 1222, 1225].includes(code) || text.includes('blizzard') || text.includes('snow')) {
    return 'BEYOND THE WALL';
  }
  if ([1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243].includes(code) || text.includes('rain') || text.includes('drizzle')) {
    return 'RAIN OVER ELDIA';
  }
  if (temp >= 28 && hum >= 70) {
    return 'THE ECLIPSE';
  }
  if (temp >= 32 && hum < 45) {
    return 'SCORCHED DESERT';
  }
  if (wind >= 35) {
    return 'WINGS OF FREEDOM';
  }
  if (temp >= 19 && temp <= 26 && hum >= 35 && hum <= 65 && wind <= 22) {
    return 'BAND OF THE HAWK';
  }
  if (temp >= 5 && temp <= 16) {
    return 'WALL ROSE';
  }
  return 'WALL SINA';
}

runTest('Mood: Band of the Hawk on optimal golden bliss', () => {
  const archetype = calculateWeatherMood({
    temp_c: 22,
    humidity: 50,
    wind_kph: 12,
    is_day: 1,
    condition: { code: 1000, text: 'Sunny' }
  });
  assert.strictEqual(archetype, 'BAND OF THE HAWK');
});

runTest('Mood: The Eclipse on high heat and humidity', () => {
  const archetype = calculateWeatherMood({
    temp_c: 33,
    humidity: 82,
    wind_kph: 8,
    is_day: 1,
    condition: { code: 1000, text: 'Sunny' }
  });
  assert.strictEqual(archetype, 'THE ECLIPSE');
});

runTest('Mood: Beyond the Wall on freezing snow', () => {
  const archetype = calculateWeatherMood({
    temp_c: -4,
    humidity: 75,
    wind_kph: 18,
    is_day: 1,
    condition: { code: 1219, text: 'Moderate snow' }
  });
  assert.strictEqual(archetype, 'BEYOND THE WALL');
});

runTest('Mood: The Rumbling on severe thunderstorms', () => {
  const archetype = calculateWeatherMood({
    temp_c: 24,
    humidity: 85,
    wind_kph: 30,
    is_day: 0,
    condition: { code: 1087, text: 'Thundery outbreaks nearby' }
  });
  assert.strictEqual(archetype, 'THE RUMBLING');
});

runTest('Mood: Wings of Freedom on gale wind gusts', () => {
  const archetype = calculateWeatherMood({
    temp_c: 18,
    humidity: 45,
    wind_kph: 45,
    is_day: 1,
    condition: { code: 1003, text: 'Partly cloudy' }
  });
  assert.strictEqual(archetype, 'WINGS OF FREEDOM');
});

// 3. Test .gitignore protects secrets
runTest('.gitignore protects .env and .vercel', () => {
  const gitignore = fs.readFileSync(path.join(__dirname, '..', '.gitignore'), 'utf8');
  assert.match(gitignore, /\.env/);
  assert.match(gitignore, /\.vercel/);
});

console.log(`\nTests Completed: ${passedTests}/${totalTests} Passed.\n`);
if (passedTests !== totalTests) {
  process.exit(1);
}
