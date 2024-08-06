using System.ComponentModel.DataAnnotations;
using todo_list.Enums;

namespace todo_list.Models {
    public class TasksModel {
        [Key]
        public int id { get; set; }
        public TaskEnum status { get; set; }
        public string description { get; set; }
        public DateTime dateCreated { get; set; }
        public DateTime? dateFinished { get; set; }
    }
}
