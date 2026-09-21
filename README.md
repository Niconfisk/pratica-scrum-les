# 📋 Prática Scrum LES - Gerenciador de Tarefas Kanban

Sistema de Gerenciamento de Tarefas desenvolvido com fluxo visual baseado em **Quadro Kanban**, permitindo o acompanhamento ágil de atividades com persistência local de dados e suporte a arrastar e soltar (*drag-and-drop*).

---

## 🚀 Funcionalidades

- **Criação de Tarefas:** Adicione novas tarefas com título diretamente pelo painel.
- **Quadro Kanban com 3 Colunas:**
  - 📌 **A Fazer:** Estado inicial das tarefas recém-criadas.
  - ⏳ **Fazendo:** Tarefas em andamento.
  - ✅ **Feita:** Tarefas concluídas (com visual riscado).
- **Arrastar e Soltar (*Drag-and-Drop*):**
  - Mova tarefas livremente entre as colunas utilizando o ícone de arrasto (`⠿`) ou o próprio card.
  - O status é atualizado e persistido automaticamente no backend ao soltar na coluna de destino.
  - Feedback visual interativo (animação de transparência, rotação suave e destaque na coluna receptora).
- **Ações Rápidas por Botões:**
  - **Começar:** Avança a tarefa de *A Fazer* para *Fazendo*.
  - **Concluir:** Finaliza a tarefa, movendo-a para *Feita*.
  - **Editar (✎):** Altera o título da tarefa.
  - **Excluir (✖):** Remove a tarefa com confirmação prévia.
- **Interface Moderna (UI/UX Refatorada):**
  - Estilo moderno com efeitos de *Glassmorphism* (fundo translúcido com desfoque).
  - Tipografia contemporânea (*Inter* via Google Fonts).
  - Micro-interações, sombras suaves e elevação ao passar o mouse (*hover*).
  - Espaçamento aprimorado entre cards para evitar sobreposições.

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework minimalista para criação dos endpoints da API REST e servidor de arquivos estáticos.
- **CORS & Body-Parser**: Middlewares para tratamento de requisições e JSON.
- **Node Test Runner (`node:test` e `node:assert`)**: Para testes automatizados.

### Frontend
- **HTML5 & CSS3**: Estrutura semântica, gradientes, sombras e animações.
- **JavaScript Vanilla (ES6+)**: Orientação a objetos (`Tarefa`, `TaskManager`) e integração assíncrona com `fetch`.
- **HTML5 Drag and Drop API**: Para manipulação nativa de eventos de arrasto.
- **Bootstrap 5**: Estrutura de grid e componentes auxiliares.

---

## 💾 Persistência e Esquema de Dados

### Forma de Armazenamento
Os dados são armazenados localmente no arquivo [`tarefas.json`](./tarefas.json). O backend Express lê e escreve as operações diretamente através do módulo nativo `fs`, funcionando como um banco de dados leve baseado em documentos JSON.

### Modelo da Tarefa (Task Model)
Cada objeto de tarefa possui o seguinte esquema:

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | `string` | Identificador único da tarefa (gerado via timestamp `Date.now().toString()`). |
| `titulo` | `string` | Título ou descrição da tarefa. |
| `status` | `string` | Estado atual da tarefa: `"A Fazer"`, `"Fazendo"` ou `"Feita"`. |

Exemplo:
```json
{
  "id": "1726937123456",
  "titulo": "Implementar testes automatizados",
  "status": "Fazendo"
}
```

---

## 🔌 Endpoints da API REST

A API responde no prefixo `/api/tarefas`:

| Método | Rota | Descrição | Status de Sucesso |
|---|---|---|---|
| `GET` | `/api/tarefas` | Retorna a lista de todas as tarefas cadastradas | `200 OK` |
| `POST` | `/api/tarefas` | Cria uma nova tarefa | `201 Created` |
| `PUT` | `/api/tarefas/:id` | Atualiza dados/status de uma tarefa existente | `200 OK` |
| `DELETE` | `/api/tarefas/:id` | Remove uma tarefa pelo ID | `204 No Content` |

---

## 📂 Estrutura do Projeto

```text
pratica-scrum-les/
├── public/                 # Frontend estático servido pelo Express
│   ├── app.js             # Lógica cliente, classes Tarefa, TaskManager e Drag-and-Drop
│   ├── index.html         # Estrutura HTML do quadro Kanban
│   └── style.css          # Estilização visual moderna e classes de feedback do Drag-and-Drop
├── server.js              # Servidor Express, rotas da API REST e manipulação de tarefas.json
├── tarefas.json           # Armazenamento persistente das tarefas em JSON
├── tarefas.test.js        # Testes automatizados de integração
├── package.json           # Dependências e scripts do projeto
├── context.md             # Especificações de requisitos e User Stories
├── infra.md               # Notas sobre infraestrutura do projeto
└── README.md              # Documentação completa do projeto
```

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- [npm](https://www.npmjs.com/) (instalado junto com o Node.js)

---

## 🚀 Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Niconfisk/pratica-scrum-les.git
   cd pratica-scrum-les
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor:**
   ```bash
   node server.js
   ```

4. **Acesse no navegador:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 🧪 Executando os Testes

O projeto utiliza o módulo de testes nativo do Node.js:

```bash
npm test
```
