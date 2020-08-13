const express = require('express');
const app = express();

const port = process.env.PORT || 8080;
const contextPath = '/';
const staticDir = __dirname + '/out';

app.use(
    contextPath,
    express.static(staticDir, {
        redirect: true,
    })
);

app.get('/', (req, res) => res.redirect(301, contextPath));
app.listen(port);
console.info('Server is listening on port: ' + port);
console.info('serving:' + staticDir);

// Readiness / liveness probes
const ready = express();
ready.get('*', (req, res) => res.send('ok'));
ready.listen(2022);
