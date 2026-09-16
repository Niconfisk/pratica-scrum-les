# Contexto do Projeto: Sistema de Gerenciamento de Tarefas

## Visão Geral
Este projeto é um sistema de gerenciamento de tarefas desenvolvido para facilitar o acompanhamento de atividades.

## Funcionalidades Principais (User Stories)
- **US01:** Adicionar tarefa com título
- **US02:** Visualizar todas as tarefas
- **US03:** Marcar tarefa como concluída
- **US04:** Excluir uma tarefa
- **US05:** Editar título de uma tarefa

## Detalhes Técnicos
- O sistema precisará armazenar as tarefas em um arquivo JSON.
- As tarefas serão lidas do arquivo JSON e instanciadas numa classe Tarefa (descrição abaixo);
- Cada instância da classe deve ser renderizada num container no html com a lista de tarefas;
- Mudanças nos dados como criação, edição ou remoção devem ser replicadas no JSON original.
- As operações relacionadas as persistências de dados devem ser organizadas numa classe própria, que contém os métodos de CRUD e mantém informações sobre estado do JSON;
- Precisamos validar se uma tarefa existe antes de manipulá-la.
- O estilo do status da tarefa deve ser definido para fácil visualização, de preferência com organização em quadros e cores.

### A Classe Tarefa
- Atributos: ID, Título, Status (A Fazer [Status Padrão], Fazendo, Feita);
- Métodos: Começar(Alterar Status para Fazendo), Concluir(Altera o Status para Feita), Remover(Remove a instância da lista de tarefas e a remove do arquivo JSON), Editar(Altera Título da tarefa no objeto e no arquivo JSON)
