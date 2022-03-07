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
const roles = db.roles;

db.sequelize.sync().then(() => {
  console.log('Drop & Re-sync db.');
  initial();
});

const initial = () => {
  roles.upsert({
    id: 1,
    nama: 'admin',
  });

  roles.upsert({
    id: 2,
    nama: 'surveyor',
  });
};

require('./app/routes/owner.route')(app);
require('./app/routes/data-uttp.route')(app);
require('./app/routes/auth.route')(app);

app.get('/', (req, res) => {
  res.json('Welcome to Admin REST APIs');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`this server is running on port ${PORT}`);
});
