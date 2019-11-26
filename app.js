const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const routes = require('./routes');

const app = express();
const port = process.env.PORT;

// Load routes
routes(app);

app.listen(port, () => console.log(`Blog app listening on port ${port}!`));
