const express = require('express');
const cors = require('cors');
const app = express();
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require('./app/models');
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop & Re-sync db.');
});

require('./app/routes/owner.route')(app);
require('./app/routes/data-uttp.route')(app);

app.get('/', (req, res) => {
  res.json('Welcome to Admin REST APIs');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`this server is running on port ${PORT}`);
});
