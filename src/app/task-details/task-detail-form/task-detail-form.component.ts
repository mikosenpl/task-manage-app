import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskDetail } from 'src/app/shared/task-detail.model';
import { TaskDetailService } from 'src/app/shared/task-detail.service';

@Component({
  selector: 'app-task-detail-form',
  templateUrl: './task-detail-form.component.html',
  styleUrls: ['./task-detail-form.component.css']
})
export class TaskDetailFormComponent implements OnInit {

  constructor(public service:TaskDetailService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
   if(this.service.formData.taskId == 0)
    this.insertRecord(form);
   else
    this.updateRecord(form);
  }

  insertRecord(form: NgForm){
    this.service.postTaskDetail().subscribe(
      res => {
        this.resetForm(form)
        this.service.refreshList();
        this.toastr.success('Submitted successfully','Task Detail Register')
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm){
    this.service.putTaskDetail().subscribe(
      res => {
        this.resetForm(form)
        this.service.refreshList();
        this.toastr.info('Updatted successfully','Task Detail Register')
      },
      err => { console.log(err); }
    );
  }
  

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new TaskDetail();
  }

}
