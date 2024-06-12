import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService, Task } from '../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: '',
    completed: false
  };
  isEditMode = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskService.getTaskById(+id).subscribe((task) => (this.task = task));
    }
  }

  onSubmit(form: NgForm): void {
    if (this.isEditMode) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(() => this.router.navigate(['/']));
    } else {
      this.taskService.createTask(this.task).subscribe(() => this.router.navigate(['/']));
    }
  }
}
