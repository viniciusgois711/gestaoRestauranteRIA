const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.json());

const SECRET_KEY = 'sua-chave-secreta'; // Em produção, usar variável de ambiente

// Mock users
const users = [
  { username: 'admin', password: bcrypt.hashSync('admin123', 10) }
];

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

// Middleware para verificar token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Endpoint de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

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

app.get('/pedidos', authenticateToken, async (req, res) => {
    console.log('get')
  try {
    const pedidos = await readData();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao ler dados' });
  }
});

app.get('/pedidos/:id', authenticateToken, async (req, res) => {
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

app.post('/pedidos', authenticateToken, async (req, res) => {
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

app.put('/pedidos/:id', authenticateToken, async (req, res) => {
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

app.delete('/pedidos/:id', authenticateToken, async (req, res) => {
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
