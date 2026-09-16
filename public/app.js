class Tarefa {
    constructor(id, titulo, status = 'A Fazer') {
        this.id = id;
        this.titulo = titulo;
        this.status = status;
    }
}

class TaskManager {
    constructor() {
        this.tarefas = [];
        this.apiUrl = '/api/tarefas';
    }

    async carregarTarefas() {
        // Will implement in Issue #2
    }

    async adicionarTarefa(titulo) {
        if (!titulo.trim()) return;
        
        const id = Date.now().toString();
        const novaTarefa = new Tarefa(id, titulo);
        
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(novaTarefa)
            });
            if (response.ok) {
                const tarefaCriada = await response.json();
                this.tarefas.push(tarefaCriada);
                this.renderizar();
            }
        } catch (error) {
            console.error('Erro ao adicionar tarefa:', error);
        }
    }

    renderizar() {
        const quadro = document.getElementById('quadro-tarefas');
        quadro.innerHTML = '';

        this.tarefas.forEach(tarefa => {
            const div = document.createElement('div');
            div.className = `tarefa ${tarefa.status === 'Feita' ? 'feita' : ''}`;
            
            const tituloSpan = document.createElement('span');
            tituloSpan.className = 'tarefa-titulo';
            tituloSpan.textContent = tarefa.titulo;
            
            div.appendChild(tituloSpan);
            quadro.appendChild(div);
        });
    }
}

const manager = new TaskManager();

document.getElementById('btn-adicionar').addEventListener('click', () => {
    const input = document.getElementById('nova-tarefa-titulo');
    manager.adicionarTarefa(input.value);
    input.value = '';
});
