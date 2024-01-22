const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();

// Defina o caminho para a raiz do seu projeto
const rootPath = path.join(__dirname, '..');

// Sirva arquivos estáticos da raiz do projeto
app.use(express.static(rootPath));

// Adicione uma rota para servir o HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(rootPath, 'pages', 'home.htm'));
});

app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('https://www.carqueryapi.com/api/0.3/?cmd=getTrims');
    res.json(response.data);
  } catch (error) {
    console.error('Erro na requisição à API', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
