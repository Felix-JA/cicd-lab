const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend', version: '1.0.0' });
});

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hola desde el Backend!, Pipeline CI/CD, funcionando correctamente', timestamp: new Date() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend corriendo en puerto ${PORT}`);
});
