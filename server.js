/**
 * WeatherMood • Production & Local Development Server
 * Zero external dependencies: serves static frontend and routes /api/weather
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const eqIdx = trimmed.indexOf('=');
          if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim().replace(/^["'](.*)["']$/, '$1');
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      });
      console.log('✓ Successfully loaded .env configurations');
    } catch (e) {
      console.warn('Notice: .env file could not be parsed:', e.message);
    }
  }
}

loadEnv();

const weatherHandler = require('./api/weather');
const PORT = parseInt(process.env.PORT, 10) || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:' + PORT}`);

  // Vercel serverless helper polyfills
  res.status = function (statusCode) {
    this.statusCode = statusCode;
    return this;
  };
  res.json = function (obj) {
    this.setHeader('Content-Type', 'application/json');
    this.end(JSON.stringify(obj, null, 2));
    return this;
  };

  // Serverless API route: /api/weather
  if (parsedUrl.pathname === '/api/weather') {
    try {
      return await weatherHandler(req, res);
    } catch (err) {
      console.error('Internal API error:', err);
      return res.status(500).json({ error: { message: err.message } });
    }
  }

  // Static File Serving
  let filePath = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname;
  const safePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
  const absolutePath = path.join(__dirname, safePath);

  fs.stat(absolutePath, (err, stats) => {
    if (err || !stats.isFile()) {
      if (fs.existsSync(path.join(__dirname, 'index.html'))) {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
        return;
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(absolutePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(absolutePath).pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  WEATHERMOOD is live on http://localhost:${PORT}`);
  console.log(`  Test Endpoint: http://localhost:${PORT}/api/weather?q=Tokyo`);
  console.log(`  Press Ctrl+C to terminate the local server.`);
  console.log(`======================================================\n`);
});
