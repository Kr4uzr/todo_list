import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Tasks } from '../../models/Tasks';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  tasks: Tasks[] = [];
  allTasks: Tasks[] = [];

  constructor(private tasksService: TasksService) {

  }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(data => {
      const dataTasks = data.data;

      dataTasks.map((task) => {
        task.dateCreated = new Date(task.dateCreated!).toLocaleDateString();
        task.dateFinished = new Date(task.dateFinished!).toLocaleDateString();
      });

      this.tasks = data.data;
      this.allTasks = data.data;

    });
  }

  statusFilter(event : Object){

    const target = event as HTMLSelectElement;
    const value = target.value;

    this.tasks = this.allTasks.filter(task => {
      return task.status.includes(value);
    })
  }

  createTask(taskForm: NgForm){

    const taskDescription = taskForm.form.value.task;

    if(taskDescription != ""){
      const date = new Date();
      let dateString = date.toLocaleDateString("en-CA");

      const taskData = {
        "id": 0,
        "status" : "Novo",
        "description": taskDescription,
        "dateCreated": dateString,
        "dateFinished": null
      }

      this.tasksService.createTask(taskData).subscribe((data) => {
        this.ngOnInit
      });
    }
  }
}
