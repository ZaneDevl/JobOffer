const mongoose = require('mongoose');

const offertaLavoroSchema = new mongoose.Schema({
  titolo: String,
  descrizioneBreve: String,
  azienda: String,
  provincia: String,
  dataInserimento: { type: Date, default: Date.now },
  smartWorking: Boolean,
  retribuzioneLordo: Number,
  tipologiaContratto: String,
});

const OffertaLavoro = mongoose.model('OffertaLavoro', offertaLavoroSchema);

module.exports = OffertaLavoro;
