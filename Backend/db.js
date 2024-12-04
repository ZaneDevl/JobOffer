const mongoose = require('mongoose');

// URL di connessione a MongoDB (sostituisci con la tua stringa di connessione)
const dbURL = 'mongodb://localhost:27017/jobOffersDB';

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connesso a MongoDB');
  })
  .catch((error) => {
    console.error('Errore di connessione:', error);
  });
