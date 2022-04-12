import { Component, OnInit } from '@angular/core';
import { TaskDetail } from '../shared/task-detail.model';
import { ToastrService } from 'ngx-toastr';
import { TaskDetailService } from '../shared/task-detail.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  constructor(public service: TaskDetailService, private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord:TaskDetail){
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number){
      this.service.deleteTaskDetail(id)
      .subscribe(
        res => {
          this.service.refreshList();
          this.toastr.success("Deleted successfully",'Task Detail Register')
        },
        err => {console.log(err)}
      )}
}
