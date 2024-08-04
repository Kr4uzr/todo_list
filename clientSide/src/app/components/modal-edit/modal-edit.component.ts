import { Component, Inject, inject, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tasks } from '../../models/Tasks';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrl: './modal-edit.component.scss'
})
export class ModalEditComponent implements OnInit {

  inputData: any;
  task!: Tasks;

  constructor(private tasksService : TasksService, @Inject(MAT_DIALOG_DATA) public data : any){}

  ngOnInit(): void {
    this.inputData = this.data;

    this.tasksService.getTask(this.inputData.id).subscribe((data) =>{
      const dataTask = data.data[0];
      this.task = dataTask;

    });

  }

  edit(taskEditForm: NgForm, id : any){

    const editDescription = taskEditForm.form.value.taskEdit;
    const editStatus = taskEditForm.form.value.statusEdit;

    this.tasksService.getTask(id).subscribe((data) =>{
      const dataTask = data.data[0];

      if(dataTask.status != editStatus && dataTask.description != editDescription){

        const taskData = {
          "id": dataTask.id,
          "status" : editStatus != '' ? editStatus : dataTask.status,
          "description": editDescription != '' ? editDescription : dataTask.description,
          "dateCreated": new Date(dataTask.dateCreated),
          "dateFinished": null
        }
        console.log(taskData);

        this.tasksService.editTask(taskData).subscribe(() => {
          window.location.reload();
        });
      }
    });


  }
}
