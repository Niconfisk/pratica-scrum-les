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
        try {
            const response = await fetch(this.apiUrl);
            if (response.ok) {
                this.tarefas = await response.json();
                this.renderizar();
            }
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
        }
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

    async concluirTarefa(id) {
        const index = this.tarefas.findIndex(t => t.id === id);
        if (index === -1) return;
        
        const tarefa = this.tarefas[index];
        tarefa.status = tarefa.status === 'Feita' ? 'A Fazer' : 'Feita';

        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tarefa)
            });
            if (response.ok) {
                this.renderizar();
            }
        } catch (error) {
            console.error('Erro ao atualizar tarefa:', error);
        }
    }

    async excluirTarefa(id) {
        if (!confirm('Deseja realmente excluir esta tarefa?')) return;

        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                this.tarefas = this.tarefas.filter(t => t.id !== id);
                this.renderizar();
            }
        } catch (error) {
            console.error('Erro ao excluir tarefa:', error);
        }
    }

    async editarTarefa(id) {
        const index = this.tarefas.findIndex(t => t.id === id);
        if (index === -1) return;

        const tarefa = this.tarefas[index];
        const novoTitulo = prompt('Edite o título da tarefa:', tarefa.titulo);
        
        if (novoTitulo !== null && novoTitulo.trim() !== '') {
            tarefa.titulo = novoTitulo.trim();
            try {
                const response = await fetch(`${this.apiUrl}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(tarefa)
                });
                if (response.ok) {
                    this.renderizar();
                }
            } catch (error) {
                console.error('Erro ao editar tarefa:', error);
            }
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
            
            const acoesDiv = document.createElement('div');
            acoesDiv.className = 'tarefa-acoes';

            const btnConcluir = document.createElement('button');
            btnConcluir.className = 'btn-concluir';
            btnConcluir.textContent = tarefa.status === 'Feita' ? 'Desfazer' : 'Concluir';
            btnConcluir.onclick = () => this.concluirTarefa(tarefa.id);

            const btnEditar = document.createElement('button');
            btnEditar.className = 'btn-editar';
            btnEditar.textContent = 'Editar';
            btnEditar.onclick = () => this.editarTarefa(tarefa.id);

            const btnExcluir = document.createElement('button');
            btnExcluir.className = 'btn-excluir';
            btnExcluir.textContent = 'Excluir';
            btnExcluir.onclick = () => this.excluirTarefa(tarefa.id);

            acoesDiv.appendChild(btnConcluir);
            acoesDiv.appendChild(btnEditar);
            acoesDiv.appendChild(btnExcluir);

            div.appendChild(tituloSpan);
            div.appendChild(acoesDiv);
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
manager.carregarTarefas();
