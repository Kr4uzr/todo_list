using Microsoft.EntityFrameworkCore;
using todo_list.Models;

namespace todo_list.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<TasksModel> tasks { get; set; }
    }
}
