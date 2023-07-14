const express = require('express');
const corsConfig = require('./config/corsConfig');
const bodyParser = require('body-parser');


const app = express();
app.use(corsConfig);
const PORT = 3000;
const routes = require('./app/routes/router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
