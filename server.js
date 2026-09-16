const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'tarefas.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Helpers for read/write
function readData() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, '[]');
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
}

function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// GET: List all tasks
app.get('/api/tarefas', (req, res) => {
    res.json(readData());
});

// POST: Add new task
app.post('/api/tarefas', (req, res) => {
    const data = readData();
    const novaTarefa = req.body;
    data.push(novaTarefa);
    writeData(data);
    res.status(201).json(novaTarefa);
});

// PUT: Edit task
app.put('/api/tarefas/:id', (req, res) => {
    const data = readData();
    const index = data.findIndex(t => t.id === req.params.id);
    if (index !== -1) {
        data[index] = { ...data[index], ...req.body, id: req.params.id };
        writeData(data);
        res.json(data[index]);
    } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
    }
});

// DELETE: Remove task
app.delete('/api/tarefas/:id', (req, res) => {
    let data = readData();
    const id = req.params.id;
    if (data.some(t => t.id === id)) {
        data = data.filter(t => t.id !== id);
        writeData(data);
        res.status(204).send();
    } else {
        res.status(404).json({ error: 'Tarefa não encontrada' });
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}

module.exports = app;
