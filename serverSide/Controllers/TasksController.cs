using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using todo_list.Enums;
using todo_list.Models;
using todo_list.Service.TasksService;

namespace todo_list.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase {

        private readonly ITasksInterface _iTasksInterface;
        public TasksController(ITasksInterface taskInterface) {
            _iTasksInterface = taskInterface;
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<TasksModel>>>> CreateTask(TasksModel newTask) {
            return await _iTasksInterface.CreateTask(newTask);
        }

        [HttpGet]
        public async Task<ActionResult<ServiceResponse<List<TasksModel>>>> GetTasks() {
            return await _iTasksInterface.GetTasks();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<List<TasksModel>>>> GetTasksById(int id) {
            return await _iTasksInterface.GetTasksById(id);
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<List<TasksModel>>>> UpdateTask(TasksModel editTask) {
            return await _iTasksInterface.UpdateTask(editTask);
        }

        [HttpDelete]
        public async Task<ActionResult<ServiceResponse<List<TasksModel>>>> DeleteTask(int idDelete) {
            return await _iTasksInterface.DeleteTask(idDelete);
        }
    }
}
