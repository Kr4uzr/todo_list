﻿using Microsoft.EntityFrameworkCore;
using todo_list.Enums;
using todo_list.Context;
using todo_list.Models;
using System;

namespace todo_list.Service.TasksService {
    public class TasksService : ITasksInterface {

        private readonly AppDbContext _appDbContext;
        public TasksService(AppDbContext appDbContext) {
            _appDbContext = appDbContext;
        }

        /**
        * Realiza a criação de uma nova tarefa, inserindo no banco
        */
        public async Task<ServiceResponse<List<TasksModel>>> CreateTask(TasksModel newTask) {
            ServiceResponse<List<TasksModel>> serviceResponse = new ServiceResponse<List<TasksModel>>();

            try {
                if (newTask == null) {
                    serviceResponse.data = null;
                    serviceResponse.message = "Insira os dados corretamente";
                    serviceResponse.response = false;

                    return serviceResponse;
                }

                _appDbContext.Add(newTask);
                await _appDbContext.SaveChangesAsync();

                serviceResponse.data = _appDbContext.tasks.ToList();
                serviceResponse.message = "Tarefa criada com sucesso!";
                serviceResponse.response = true;

            } catch (Exception ex) {
                serviceResponse.data = [];
                serviceResponse.message = ex.Message;
                serviceResponse.response = false;
            }

            return serviceResponse;
        }
        
        /**
        * Busca todas as tarefas que estão cadastradas dentro do banco de dados
        */
        public async Task<ServiceResponse<List<TasksModel>>> GetTasks()
        {
            ServiceResponse<List<TasksModel>> serviceResponse = new ServiceResponse<List<TasksModel>>();

            try {
                serviceResponse.data = _appDbContext.tasks.OrderByDescending(x => x.id).ToList();
                serviceResponse.message = serviceResponse.data.Count == 0 ? "Nenhuma tarefa cadastrada!" : "Tarefas encontradas com sucesso!";
                serviceResponse.response = true;

            }
            catch (Exception ex) {
                serviceResponse.data = [];
                serviceResponse.message = ex.Message;
                serviceResponse.response = false;
            }

            return serviceResponse;
        }

        /**
        * Busca uma tarefa em especifico, apartir do id
        */
        public async Task<ServiceResponse<List<TasksModel>>> GetTasksById(int id)
        {
            ServiceResponse<List<TasksModel>> serviceResponse = new ServiceResponse<List<TasksModel>>();

            try {

                serviceResponse.data = _appDbContext.tasks.Where(x => x.id == id).ToList();
                serviceResponse.message = serviceResponse.data.Count == 0 ? serviceResponse.message = "Nenhuma tarefa com o status: " : "Tarefas encontradas com sucesso!";
                serviceResponse.response = true;

            } catch (Exception ex) {
                serviceResponse.data = [];
                serviceResponse.message = ex.Message;
                serviceResponse.response = false;
            }

            return serviceResponse;
        }

        /**
        * Realiza o update de uma tarefa em especifico
        */
        public async Task<ServiceResponse<List<TasksModel>>> UpdateTask(TasksModel editTask)
        {
            ServiceResponse<List<TasksModel>> serviceResponse = new ServiceResponse<List<TasksModel>>();

            try {
                TasksModel task = _appDbContext.tasks.AsNoTracking().FirstOrDefault(x => x.id == editTask.id);

                if (task == null) {
                    serviceResponse.data = null;
                    serviceResponse.message = "Tarefa não encontrada!";
                    serviceResponse.response = false;

                    return serviceResponse;
                }

                //caso tenha sido finalizado, o campo de data finalizada é preenchido
                if(editTask.status == TaskEnum.Feito){
                    editTask.dateFinished = DateTime.UtcNow;
                }

                _appDbContext.tasks.Update(editTask);
                await _appDbContext.SaveChangesAsync();

                serviceResponse.data = _appDbContext.tasks.ToList();
                serviceResponse.message = "Tarefa editada com sucesso!";
                serviceResponse.response = true;

            } catch (Exception ex) {
                serviceResponse.data = [];
                serviceResponse.message = ex.Message;
                serviceResponse.response = false;
            }

            return serviceResponse;
        }

        /**
        * Remove uma tarefa em especifico do banco de dados
        */
        public async Task<ServiceResponse<List<TasksModel>>> DeleteTask(int idDelete) {
            ServiceResponse<List<TasksModel>> serviceResponse = new ServiceResponse<List<TasksModel>>();

            try {
                TasksModel task = _appDbContext.tasks.AsNoTracking().FirstOrDefault(x => x.id == idDelete);

                if (task == null) {
                    serviceResponse.data = null;
                    serviceResponse.message = "Tarefa não encontrada!";
                    serviceResponse.response = false;
                }

                _appDbContext.tasks.Remove(task);
                await _appDbContext.SaveChangesAsync();

                serviceResponse.data = _appDbContext.tasks.ToList();
                serviceResponse.message = "Tarefa deletada com sucesso!";
                serviceResponse.response = true;

            } catch (Exception ex) {
                serviceResponse.data = [];
                serviceResponse.message = ex.Message;
                serviceResponse.response = false;
            }

            return serviceResponse;
        }
    }
}
