namespace todo_list.Models
{
    public class ServiceResponse<T>
    {

        public T? data { get; set; }
        public string message { get; set; }
        public bool response { get; set; }

    }
}
