const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001; // Cambia la porta se necessario

// Abilita CORS per tutte le richieste
app.use(cors());

// Connessione a MongoDB
require('./db');

// Middleware per il parsing del corpo delle richieste
app.use(express.json());

// Importa il modello dell'offerta di lavoro
const OffertaLavoro = require('./models/offertaLavoro');

// Modifica della GET esistente per restituire le offerte ordinate per DataInserimento e con limite
app.get('/api/offerte', async (req, res) => {
  try {
    // Prendi il parametro limit dalla query (default a 10 se non è specificato)
    const limit = parseInt(req.query.limit);

    // Se limit è un numero valido e positivo, usa limit, altrimenti non lo limitiamo
    const queryLimit = isNaN(limit) || limit <= 0 ? 0 : limit;

    // Recupera le offerte ordinate per DataInserimento e limita il numero di risultati
    const offerte = await OffertaLavoro.find()
      .sort({ dataInserimento: -1 }) // Ordinamento decrescente
      .limit(queryLimit === 0 ? 0 : queryLimit); // Se queryLimit è 0, non limitiamo i risultati

    res.json(offerte);
  } catch (error) {
    console.error('Errore nel recupero delle offerte:', error);
    res.status(500).json({ message: 'Errore nel recupero delle offerte' });
  }
});

// Aggiungi una nuova offerta di lavoro
app.post('/api/offerte', async (req, res) => {
    try {
        // Recupera i dati inviati nel corpo della richiesta
        const { titolo, descrizioneBreve, azienda, provincia, smartWorking, retribuzioneLordo, tipologiaContratto } = req.body;

        // Verifica che tutti i campi obbligatori siano stati forniti
        if (!titolo || !descrizioneBreve || !azienda || !provincia || smartWorking === undefined || !retribuzioneLordo || !tipologiaContratto) {
            return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
        }

        // Crea un nuovo oggetto OffertaLavoro
        const nuovaOfferta = new OffertaLavoro({
            titolo,
            descrizioneBreve,
            azienda,
            provincia,
            smartWorking,
            retribuzioneLordo,
            tipologiaContratto,
        });

        // Salva la nuova offerta nel database
        await nuovaOfferta.save();

        // Rispondi con l'offerta appena aggiunta
        res.status(201).json(nuovaOfferta);
    } catch (error) {
        console.error('Errore nell\'aggiunta dell\'offerta:', error);
        res.status(500).json({ message: 'Errore nell\'aggiunta dell\'offerta' });
    }
});

// Modifica un'offerta di lavoro
app.put('/api/offerte/:id', async (req, res) => {
    try {
        // Recupera l'ID dalla route
        const { id } = req.params;

        // Recupera i nuovi dati dal corpo della richiesta
        const { titolo, descrizioneBreve, azienda, provincia, smartWorking, retribuzioneLordo, tipologiaContratto } = req.body;

        // Verifica che tutti i campi obbligatori siano stati forniti
        if (!titolo || !descrizioneBreve || !azienda || !provincia || smartWorking === undefined || !retribuzioneLordo || !tipologiaContratto) {
            return res.status(400).json({ message: 'Tutti i campi sono obbligatori' });
        }

        // Trova l'offerta con l'ID fornito e aggiorna i campi
        const offertaAggiornata = await OffertaLavoro.findByIdAndUpdate(
            id,
            { titolo, descrizioneBreve, azienda, provincia, smartWorking, retribuzioneLordo, tipologiaContratto },
            { new: true } // Restituisce l'offerta aggiornata
        );

        // Se l'offerta non è stata trovata
        if (!offertaAggiornata) {
            return res.status(404).json({ message: 'Offerta di lavoro non trovata' });
        }

        // Restituisce l'offerta aggiornata
        res.json(offertaAggiornata);
    } catch (error) {
        console.error('Errore nella modifica dell\'offerta:', error);
        res.status(500).json({ message: 'Errore nella modifica dell\'offerta' });
    }
});

// Elimina un'offerta di lavoro
app.delete('/api/offerte/:id', async (req, res) => {
    try {
      const { id } = req.params;
      
      // Trova e elimina l'offerta di lavoro con l'ID fornito
      const offertaEliminata = await OffertaLavoro.findByIdAndDelete(id);
      
      // Se l'offerta non è stata trovata
      if (!offertaEliminata) {
        return res.status(404).json({ message: 'Offerta di lavoro non trovata' });
      }
      
      res.json({ message: 'Offerta di lavoro eliminata con successo' });
    } catch (error) {
      console.error('Errore nell\'eliminazione dell\'offerta:', error);
      res.status(500).json({ message: 'Errore nell\'eliminazione dell\'offerta' });
    }
  });

  // Restituisce la lista delle offerte di lavoro che contengono un determinato testo
app.get('/api/offerte/ricerca', async (req, res) => {
    try {
      const { testo, limit } = req.query;
      
      // Verifica che sia stato fornito un testo da ricercare
      if (!testo) {
        return res.status(400).json({ message: 'Il parametro "testo" è obbligatorio' });
      }

      
      
      // Se limit non è specificato o non è un numero valido, non applicare il limite
      const limite = parseInt(limit);
      const queryLimit = isNaN(limite) || limite <= 0 ? 0 : limite;  // Se limite non è valido o non è fornito, queryLimit sarà 0 (nessun limite)
      
      // Trova le offerte che contengono il testo nel titolo o nella descrizione
      const offerte = await OffertaLavoro.find({
        $or: [
          { titolo: { $regex: testo, $options: 'i' } },  // ricerca per titolo (case-insensitive)
          { descrizioneBreve: { $regex: testo, $options: 'i' } }  // ricerca per descrizione breve (case-insensitive)
        ]
      })
      .sort({ dataInserimento: -1 }) // Ordinamento decrescente per dataInserimento
      .limit(limite); // Limita i risultati in base al parametro limit
      
      // Restituisce le offerte trovate
      res.json(offerte);
    } catch (error) {
      console.error('Errore nella ricerca delle offerte:', error);
      res.status(500).json({ message: 'Errore nella ricerca delle offerte' });
    }
  });

  // Recupera un'offerta di lavoro tramite ID
app.get('/api/offerte/:id', async (req, res) => {
  try {
      const { id } = req.params;

      // Trova l'offerta tramite l'ID
      const offerta = await OffertaLavoro.findById(id);

      // Se l'offerta non esiste
      if (!offerta) {
          return res.status(404).json({ message: 'Offerta non trovata' });
      }

      // Restituisce l'offerta trovata
      res.json(offerta);
  } catch (error) {
      console.error('Errore durante il recupero dell\'offerta:', error);
      res.status(500).json({ message: 'Errore durante il recupero dell\'offerta' });
  }
});
  
// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});
