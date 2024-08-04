import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tasks } from '../models/Tasks';
import { Response } from '../models/Response';

@Injectable({
  providedIn: 'root'
})

export class TasksService {

  private urlAPI = `${environment.urlAPI}Tasks`

  constructor(private http: HttpClient) {

  }

  getTasks() : Observable<Response<Tasks[]>>{
    return this.http.get<Response<Tasks[]>>(this.urlAPI);
  }

  getTask(id : any) : Observable<Response<Tasks[]>>{
    return this.http.get<Response<Tasks[]>>(`${this.urlAPI}/${id}`);
  }

  createTask(task : Tasks) : Observable<Response<Tasks[]>>{
    return this.http.post<Response<Tasks[]>>(`${this.urlAPI}`, task);
  }

  editTask(task : Tasks) : Observable<Response<Tasks[]>>{
    return this.http.put<Response<Tasks[]>>(`${this.urlAPI}`, task);
  }

  deleteTask(id : any) : Observable<Response<Tasks[]>>{
    return this.http.delete<Response<Tasks[]>>(`${this.urlAPI}?idDelete=${id}`);
  }
}
