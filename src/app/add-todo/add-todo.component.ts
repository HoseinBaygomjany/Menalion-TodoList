import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss'
})
export class AddTodoComponent {
  // خروجی کامپوننت برای افزودن تسک جدید
  @Output() add = new EventEmitter<string>();

  // متغیر داخلی برای نگهداری متن تسک جدید
  newTodoText = '';

  /**
   * افزودن تسک جدید
   * این متد زمانی فراخوانی می‌شود که کاربر دکمه افزودن را کلیک می‌کند
   */
  addTodo(): void {
    if (this.newTodoText.trim()) {
      this.add.emit(this.newTodoText.trim());
      this.newTodoText = ''; // پاک کردن فیلد ورودی پس از افزودن
    }
  }
}
