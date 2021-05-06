const express = require('express');
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(require('cookie-parser')());
app.use(require('cors')({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use('/api/v1/email', require('./controllers/email'));
app.use('/api/v1/auth', require('./controllers/auth'));
app.use('/api/v1/images', require('./controllers/uploads'));
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
