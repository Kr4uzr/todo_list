import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tasks } from '../models/Tasks';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  constructor(private http: HttpClient) {

  }


  getTasks() : Observable<Response<Tasks[]>>{
    return this.http.get<Response<Tasks[]>>('http://localhost:5163/api/Tasks');
  }

  createTask(task : Tasks) : Observable<Response<Tasks[]>>{
    return this.http.post<Response<Tasks[]>>('http://localhost:5163/api/Tasks', task);
  }


}
