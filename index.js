const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Verificação do Webhook
app.get('/', (req, res) => {
  const VERIFY_TOKEN = 'modbot123';

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('🔓 Verificação de webhook bem-sucedida');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Recebimento de mensagens
app.post('/', (req, res) => {
  console.log('📩 Evento recebido:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
