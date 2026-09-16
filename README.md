# Prática Scrum LES - Documentação

## 1. Forma de Armazenamento dos Dados
Os dados do sistema são armazenados localmente utilizando o arquivo `tarefas.json`. Essa abordagem baseada em arquivo funciona como um banco de dados simples baseado em JSON (Document-oriented). O backend Node.js com Express lê e escreve as operações diretamente neste arquivo de texto através do módulo `fs` nativo do Node. O formato JSON garante uma persistência leve, de simples serialização, e fácil leitura.

## 2. Esquema de Dados (Task Model)
Cada tarefa armazenada no `tarefas.json` possui a seguinte estrutura:

- **`id`** (`string`): Identificador único da tarefa. Atualmente é gerado utilizando o timestamp do momento de criação (`Date.now().toString()`).
- **`titulo`** (`string`): O título ou descrição da tarefa (ex: "Lavar o carro").
- **`status`** (`string`): O status atual da tarefa. Pode ter os seguintes valores:
  - `"A Fazer"`: Estado inicial de uma nova tarefa.
  - `"Feita"`: Estado que indica que a tarefa foi concluída.
