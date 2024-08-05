# Lista de Tarefa

Aplicação simples de uma lista de tarefas, onde é possível buscar uma lista de tarefas do banco de dados, editar uma tarefa em especifico, deletar uma tarefa, e também filtrar pelo status da tarefa. Pude adquirir bastante conhecimento, uma vez que não domino as linguagens utilizadas, foi um processo desafiador e de muito aprendizado para mim.

## Tecnologias Utilizadas

- .Net Core 8.0.303
- Angular 18.1.3
- Node v22.5.1
- PostgreSQL 16

## Inicialização

- Clone ou baixe o repositório em sua máquina;
- Apartir do root, navegue para a pasta `serverSide` e abra o arquivo `appsetting.json`, dentro dele está localizado `DefaultConnection`, configure a string com suas credenciais do banco de dados;
- Abra dois terminais no root, em um dê um `cd serverSide` e em outro `cd clientSide`, dentro do terminal serverSideinsira `dotnet run` para iniciar e no terminal clientSide insira o comando `npm install` para baixar as depedências e `ng serve` para iniciar;
- Por padrão o Angular utiliza a porta `4200`, mas sinta-se a vontade para alterar, dentro do `appsetting.json` realizei a alteração da porta nativa no dotnet para a `4201`.
