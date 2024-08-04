import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Tasks } from '../../models/Tasks';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'status', 'description', 'dateCreated', 'dateFinished', 'actions'];

  dataSource = new MatTableDataSource();
  allDataSource = new MatTableDataSource();

  tasks: Tasks[] = [];
  allTasks: Tasks[] = [];

  constructor(private tasksService: TasksService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe(tasks => {

      this.tasks = tasks.data;
      this.allTasks = tasks.data;
      this.dataSource.data = this.tasks;
      this.allDataSource.data = this.allTasks;

    });
  }

  statusFilter(event : Object){

    const target = event as HTMLSelectElement;
    const value = target.value;

    this.dataSource.data = this.allDataSource.data.filter((task : any) => {
      return task.status.includes(value);
    })

    this.tasks = this.allTasks.filter(task => {
      return task.status.includes(value);
    })
  }

  createTask(taskForm: NgForm){

    const taskDescription = taskForm.form.value.task;

    if(taskDescription != ""){

      const taskData = {
        "id": 0,
        "status" : "Novo",
        "description": taskDescription,
        "dateCreated": new Date(),
        "dateFinished": null
      }

      this.tasksService.createTask(taskData).subscribe(() => {
        window.location.reload();
      });
    }
  }

  openModalEdit(id : any){
    this.dialog.open(ModalEditComponent, {
      width: '50rem',
      height: '22rem',
      data: {
        id: id
      }
    });
  }

  deleteTask(id : any){
    this.tasksService.deleteTask(id).subscribe(() => {
      window.location.reload();
    });
  }
}
