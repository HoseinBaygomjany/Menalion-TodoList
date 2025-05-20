import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from './todo/todo.component';
import { TodoFiltersComponent, FilterType, SortType } from './todo-filters/todo-filters.component';

/**
 * رابط تعریف ساختار تسک
 */
interface Todo {
  id: number; // شناسه یکتای تسک
  title: string; // عنوان تسک
  completed: boolean; // وضعیت تکمیل تسک
  createdAt: Date; // تاریخ ایجاد تسک
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoComponent, TodoFiltersComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // متغیرهای اصلی برنامه
  todos: Todo[] = []; // لیست تمام تسک‌ها
  activeTodos: Todo[] = []; // لیست تسک‌های فعال
  completedTodos: Todo[] = []; // لیست تسک‌های تکمیل شده
  newTodoTitle = ''; // عنوان تسک جدید
  currentFilter: FilterType = 'all'; // فیلتر فعلی
  currentSort: SortType = 'newest'; // روش مرتب‌سازی فعلی

  /**
   * متد اجرا شده در زمان بارگذاری کامپوننت
   * بازیابی تسک‌های ذخیره شده از localStorage
   */
  ngOnInit() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
      this.applyFilters();
    }
  }

  /**
   * افزودن تسک جدید به لیست
   */
  addTodo() {
    if (this.newTodoTitle.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: this.newTodoTitle.trim(),
        completed: false,
        createdAt: new Date()
      };
      this.todos.push(newTodo);
      this.newTodoTitle = '';
      this.saveTodos();
      this.applyFilters();
    }
  }

  /**
   * تغییر وضعیت تکمیل تسک
   * @param id شناسه تسک مورد نظر
   */
  toggleTodo(id: number) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
      this.applyFilters();
    }
  }

  /**
   * حذف تسک از لیست
   * @param id شناسه تسک مورد نظر
   */
  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
    this.applyFilters();
  }

  /**
   * بروزرسانی عنوان تسک
   * @param id شناسه تسک مورد نظر
   * @param newTitle عنوان جدید تسک
   */
  updateTodo(id: number, newTitle: string) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.title = newTitle;
      this.saveTodos();
      this.applyFilters();
    }
  }

  /**
   * تغییر فیلتر نمایش تسک‌ها
   * @param filter نوع فیلتر جدید
   */
  onFilterChange(filter: FilterType) {
    this.currentFilter = filter;
    this.applyFilters();
  }

  /**
   * تغییر روش مرتب‌سازی تسک‌ها
   * @param sort روش مرتب‌سازی جدید
   */
  onSortChange(sort: SortType) {
    this.currentSort = sort;
    this.applyFilters();
  }

  /**
   * پاک کردن تمام تسک‌های تکمیل شده
   */
  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveTodos();
    this.applyFilters();
  }

  /**
   * اعمال فیلترها و مرتب‌سازی بر روی لیست تسک‌ها
   * @private
   */
  private applyFilters() {
    // مرتب‌سازی تمام تسک‌ها
    const sortedTodos = [...this.todos].sort((a, b) => {
      switch (this.currentSort) {
        case 'newest':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'oldest':
          return a.createdAt.getTime() - b.createdAt.getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    // بروزرسانی لیست‌های تسک‌های فعال و تکمیل شده
    this.activeTodos = sortedTodos.filter(todo => !todo.completed);
    this.completedTodos = sortedTodos.filter(todo => todo.completed);
  }

  /**
   * ذخیره تسک‌ها در localStorage
   * @private
   */
  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
