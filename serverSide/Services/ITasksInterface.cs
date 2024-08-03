using todo_list.Enums;
using todo_list.Models;

namespace todo_list.Service.TasksService {
    public interface ITasksInterface {

        Task<ServiceResponse<List<TasksModel>>> CreateTask(TasksModel newTask);
        Task<ServiceResponse<List<TasksModel>>> GetTasks();
        Task<ServiceResponse<List<TasksModel>>> GetTasksById(int id);
        Task<ServiceResponse<List<TasksModel>>> UpdateTask(TasksModel editTask);
        Task<ServiceResponse<List<TasksModel>>> DeleteTask(int idDelete);

    }
}
