const test = require('node:test');
const assert = require('node:assert');
const app = require('./server');

test('Criação de tarefas', async (t) => {
    // Start the server for testing
    const server = app.listen(3001);
    
    try {
        const novaTarefa = {
            id: 'test-123',
            titulo: 'Tarefa de Teste',
            status: 'A Fazer'
        };

        const response = await fetch('http://localhost:3001/api/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novaTarefa)
        });

        assert.strictEqual(response.status, 201, 'Deveria retornar status 201');
        
        const data = await response.json();
        assert.strictEqual(data.titulo, 'Tarefa de Teste', 'O título deve bater com o enviado');
        assert.strictEqual(data.id, 'test-123', 'O ID deve bater com o enviado');
        assert.strictEqual(data.status, 'A Fazer', 'O status deve bater com o enviado');
    } finally {
        server.close();
    }
});
