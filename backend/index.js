const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type'
}));
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data', 'pedidos.json');

async function readData() {
  try {
    const raw = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeData(data) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/pedidos', async (req, res) => {
    console.log('get')
  try {
    const pedidos = await readData();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao ler dados' });
  }
});

app.get('/pedidos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const pedidos = await readData();
    const pedido = pedidos.find(p => p.id === id);
    if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao ler dados' });
  }
});

app.post('/pedidos', async (req, res) => {
  console.log('post')
  try {
    const novo = req.body;
    if (!novo || !novo.cliente || !novo.produto || typeof novo.quantidade !== 'number') {
      return res.status(400).json({ error: 'Dados do pedido inválidos' });
    }
    const pedidos = await readData();
    const maxId = pedidos.reduce((m, p) => Math.max(m, p.id || 0), 0);
    novo.id = maxId + 1;
    pedidos.push(novo);
    await writeData(pedidos);
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar pedido' });
  }
});

app.put('/pedidos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const atualizado = req.body;
    const pedidos = await readData();
    const idx = pedidos.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Pedido não encontrado' });
    atualizado.id = id;
    pedidos[idx] = atualizado;
    await writeData(pedidos);
    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar pedido' });
  }
});

app.delete('/pedidos/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const pedidos = await readData();
    const filtrados = pedidos.filter(p => p.id !== id);
    if (filtrados.length === pedidos.length) return res.status(404).json({ error: 'Pedido não encontrado' });
    await writeData(filtrados);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover pedido' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
