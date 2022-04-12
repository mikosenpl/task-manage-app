import { Injectable } from '@angular/core';
import { TaskDetail } from './task-detail.model';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class TaskDetailService {

  constructor(private http:HttpClient) { }

  formData:TaskDetail = new TaskDetail();
  readonly baseURL = 'http://localhost:45163/api/TaskDetail'
  
  list:TaskDetail[];

  postTaskDetail(){
    return this.http.post(this.baseURL,this.formData);
  }

  putTaskDetail(){
    return this.http.put(`${this.baseURL}/${this.formData.taskId}`,this.formData);
  }

  deleteTaskDetail(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList(){
    this.http.get(this.baseURL)
    .toPromise()
    .then(res=>this.list = res as TaskDetail[]);
  }
}
