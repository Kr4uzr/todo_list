import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'status', 'description', 'dateCreated', 'dateFinished', 'actions'];

  dataSource = new MatTableDataSource();
  allDataSource = new MatTableDataSource();

  status = '';

  constructor(
    private tasksService : TasksService,
    public dialog : MatDialog
  ) {

  }

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(){
    this.tasksService.getTasks().subscribe(tasks => {

      this.dataSource.data = tasks.data;
      this.allDataSource.data = tasks.data;

    });
  }

  statusFilter(){

    const value = this.status;

    this.dataSource.data = this.allDataSource.data.filter((task : any) => {
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

      this.tasksService.createTask(taskData).subscribe((data) => {
        if(data.response == true){
          Swal.fire({
            text: data.message,
            icon: "success",
          }).then(() => {
            this.loadTable();
            taskForm.resetForm();
            this.status = '';
          });
        } else if(data.response == false){
          Swal.fire({
            text: data.message,
            icon: "warning",
          });
        }
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
    }).afterClosed().subscribe(result => {
      this.loadTable();
      this.status = '';
    });
  }

  deleteTask(id : any){
    Swal.fire({
      text: "Deseja realmente apagar essa tarefa?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Deletar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.tasksService.deleteTask(id).subscribe((data) => {
          if(data.response == true){
            Swal.fire({
              text: data.message,
              icon: "success",
            }).then(() => {
              this.loadTable();
              this.status = '';
            });
          } else if(data.response == false){
            Swal.fire({
              text: data.message,
              icon: "warning",
            });
          }
        });
      }
    });
  }
}
