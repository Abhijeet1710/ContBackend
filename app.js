const express = require('express');
const bodyparser = require('body-parser');
const allRoutes = require('./router/allRoutes.js')
const port = process.env.PORT || 3000;
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyparser.json());

app.use('/', allRoutes);

app.listen(port, () => console.log(`Server up and running on port`));