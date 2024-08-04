# Lista de Tarefa

Aplicação simples de uma lista de tarefas, onde é possível buscar uma lista de tarefas do banco de dados, editar uma tarefa em especifico, deletar uma tarefa, e também filtrar pelo status da tarefa. 

## Tecnologias Utilizadas

- .Net Core 8.0.303
- Angular 18.1.3
- Node v22.5.1
- PostgreSQL 16

## Inicialização

- Clone ou baixe o repositório em sua máquina;
- Apartir do root, navegue para a pasta `serverSide` e abra o arquivo `appsetting.json`, dentro dele está localizado `DefaultConnection`, configure a string com suas credenciais do banco de dados;
- Abra dois terminais no root, em um dê um `cd serverSide` e em outro `cd clientSide`, dentro do terminal serverSide insira o comando `dotnet run` e no terminal clientSide insira `ng serve`;
- Por padrão o Angular utiliza a porta `4200`, mas sinta-se a vontade para alterar, dentro do `appsetting.json` realizei a alteração da porta nativa no dotnet para a `4201`.