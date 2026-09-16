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

    async comecarTarefa(id) {
        const index = this.tarefas.findIndex(t => t.id === id);
        if (index === -1) return;
        
        const tarefa = this.tarefas[index];
        tarefa.status = 'Fazendo';

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

    async concluirTarefa(id) {
        const index = this.tarefas.findIndex(t => t.id === id);
        if (index === -1) return;
        
        const tarefa = this.tarefas[index];
        tarefa.status = 'Feita';

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
        document.getElementById('col-a-fazer').innerHTML = '';
        document.getElementById('col-fazendo').innerHTML = '';
        document.getElementById('col-feita').innerHTML = '';

        this.tarefas.forEach(tarefa => {
            const div = document.createElement('div');
            div.className = 'card mb-2 shadow-sm';
            
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body p-2 d-flex justify-content-between align-items-center';

            const tituloSpan = document.createElement('span');
            tituloSpan.className = `tarefa-titulo ${tarefa.status === 'Feita' ? 'text-decoration-line-through text-muted' : ''}`;
            tituloSpan.textContent = tarefa.titulo;
            
            const acoesDiv = document.createElement('div');
            acoesDiv.className = 'btn-group btn-group-sm';

            if (tarefa.status === 'A Fazer') {
                const btnComecar = document.createElement('button');
                btnComecar.className = 'btn btn-outline-primary';
                btnComecar.textContent = 'Começar';
                btnComecar.onclick = () => this.comecarTarefa(tarefa.id);
                acoesDiv.appendChild(btnComecar);
            } else if (tarefa.status === 'Fazendo') {
                const btnConcluir = document.createElement('button');
                btnConcluir.className = 'btn btn-outline-success';
                btnConcluir.textContent = 'Concluir';
                btnConcluir.onclick = () => this.concluirTarefa(tarefa.id);
                acoesDiv.appendChild(btnConcluir);
            }

            const btnEditar = document.createElement('button');
            btnEditar.className = 'btn btn-outline-warning';
            btnEditar.textContent = '✎';
            btnEditar.onclick = () => this.editarTarefa(tarefa.id);

            const btnExcluir = document.createElement('button');
            btnExcluir.className = 'btn btn-outline-danger';
            btnExcluir.textContent = '✖';
            btnExcluir.onclick = () => this.excluirTarefa(tarefa.id);

            acoesDiv.appendChild(btnEditar);
            acoesDiv.appendChild(btnExcluir);

            cardBody.appendChild(tituloSpan);
            cardBody.appendChild(acoesDiv);
            div.appendChild(cardBody);

            if (tarefa.status === 'A Fazer') {
                document.getElementById('col-a-fazer').appendChild(div);
            } else if (tarefa.status === 'Fazendo') {
                document.getElementById('col-fazendo').appendChild(div);
            } else {
                document.getElementById('col-feita').appendChild(div);
            }
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
