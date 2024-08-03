using Microsoft.EntityFrameworkCore;
using todo_list.Context;
using todo_list.Service.TasksService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<ITasksInterface, TasksService>();
builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy",
        builder => builder
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          //.WithExposedHeaders("Access-Control-Allow-Origin")
                          //.AllowAnyOrigin() // <- allowes all!
                          .WithOrigins("http://localhost:4200", "https://localhost:4200")
                          );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("MyCorsPolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
