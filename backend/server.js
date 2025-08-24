const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const plantsFile = path.join(__dirname, 'plants.json');

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Mini Plant Store API!');
});

// Get all plants
app.get('/plants', (req, res) => {
  fs.readFile(plantsFile, (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read data' });
    const plants = JSON.parse(data);
    res.json(plants);
  });
});

// Search plants
app.get('/plants/search', (req, res) => {
  const { q } = req.query;
  fs.readFile(plantsFile, (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read data' });
    let plants = JSON.parse(data);
    if (q) {
      const query = q.toLowerCase();
      plants = plants.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.categories.some(c => c.toLowerCase().includes(query))
      );
    }
    res.json(plants);
  });
});

// Add new plant
app.post('/plants', (req, res) => {
  const { name, price, categories, available } = req.body;
  if (!name || !price || !categories) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  fs.readFile(plantsFile, (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read data' });
    let plants = JSON.parse(data);
    const newPlant = {
      id: plants.length + 1,
      name,
      price,
      categories,
      available
    };
    plants.push(newPlant);
    fs.writeFile(plantsFile, JSON.stringify(plants, null, 2), err => {
      if (err) return res.status(500).json({ error: 'Failed to save plant' });
      res.status(201).json(newPlant);
    });
  });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
