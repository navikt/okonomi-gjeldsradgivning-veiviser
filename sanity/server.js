const express = require('express');
const path = require('path');

const app = express(); // create express app
app.disable('x-powered-by');

const buildPath = path.resolve(__dirname, 'build');

const basePath = '/okonomi-og-gjeld/studio';

app.use(basePath, express.static(buildPath, { index: false }));

app.get(`${basePath}/internal/isAlive|isReady`, (req, res) => res.sendStatus(200));

app.use(basePath, (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// start express server on port 3000
app.listen(3000, () => {
    console.log('server started on port 3000');
});
