const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: 'POST',
  credentials: false
};

const corsConfig = cors(corsOptions);

module.exports = corsConfig;
