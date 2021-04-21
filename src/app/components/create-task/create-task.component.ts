import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as tasksData from '../../../assets/data/taskList.json';

export interface TaskList {
  taskName: string;
  stage: number;
}
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  taskName = new FormControl('');
  tasksList: TaskList[] = tasksData['data'];
  error = false;
  constructor() { }
  
  ngOnInit() {
  }

  checkDuplicate() {
    this.error = false;
    this.taskName.clearValidators();
    if (this.tasksList.find(x => x.taskName === this.taskName.value)) {
      this.error = true;
      this.taskName.setErrors({ duplicate: true });
    }
  }
  
  insertTask() {
    this.tasksList.push({ taskName: this.taskName.value, stage: 1 });
    this.taskName.setValue('');
  }

  deleteTask(taskName) {
    this.tasksList = this.tasksList.filter(x => x.taskName !== taskName);
  }

}
