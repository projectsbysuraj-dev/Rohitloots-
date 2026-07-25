import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Persistent storage file
const DATA_FILE = path.join(process.cwd(), 'data_store.json');

// Helper to read server data
function getStoreData() {
  if (fs.existsSync(DATA_FILE)) {
    try {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      console.error('Error reading data_store.json:', e);
    }
  }
  return null;
}

// Helper to save server data
function saveStoreData(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (e) {
    console.error('Error writing data_store.json:', e);
    return false;
  }
}

// API Routes
app.get('/api/data', (req, res) => {
  const data = getStoreData();
  res.json({ success: true, data });
});

app.post('/api/data', (req, res) => {
  const { data } = req.body;
  if (data) {
    saveStoreData(data);
    res.json({ success: true, message: 'Data saved successfully' });
  } else {
    res.status(400).json({ success: false, message: 'No data provided' });
  }
});

// Shortlink endpoint (redirects to main page with share tracking)
app.get('/s/:shortId', (req, res) => {
  res.redirect('/?ref=' + req.params.shortId);
});

async function startServer() {
  // Vite middleware for development vs static production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
