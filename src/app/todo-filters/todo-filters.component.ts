import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * نوع فیلترهای موجود برای نمایش تسک‌ها
 */
export type FilterType = 'all' | 'active' | 'completed';

/**
 * نوع روش‌های مرتب‌سازی تسک‌ها
 */
export type SortType = 'newest' | 'oldest' | 'alphabetical';

@Component({
  selector: 'app-todo-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-filters.component.html',
  styleUrl: './todo-filters.component.scss'
})
export class TodoFiltersComponent {
  // ورودی‌های کامپوننت
  @Input() filter: FilterType = 'all'; // نوع فیلتر فعلی
  @Input() sortBy: SortType = 'newest'; // روش مرتب‌سازی فعلی
  @Input() hasCompletedTodos: boolean = false; // آیا تسک تکمیل شده وجود دارد؟

  // خروجی‌های کامپوننت
  @Output() filterChange = new EventEmitter<FilterType>(); // رویداد تغییر فیلتر
  @Output() sortByChange = new EventEmitter<SortType>(); // رویداد تغییر مرتب‌سازی
  @Output() clearCompleted = new EventEmitter<void>(); // رویداد پاک کردن تسک‌های تکمیل شده

  /**
   * تغییر فیلتر نمایش تسک‌ها
   * این متد رویداد تغییر فیلتر را با نوع فیلتر جدید منتشر می‌کند
   * @param newFilter نوع فیلتر جدید
   */
  onFilterChange(newFilter: FilterType): void {
    this.filterChange.emit(newFilter);
  }

  /**
   * تغییر روش مرتب‌سازی تسک‌ها
   * این متد رویداد تغییر مرتب‌سازی را با روش جدید منتشر می‌کند
   * @param newSortBy روش مرتب‌سازی جدید
   */
  onSortByChange(newSortBy: SortType): void {
    this.sortByChange.emit(newSortBy);
  }

  /**
   * پاک کردن تمام تسک‌های تکمیل شده
   * این متد رویداد پاک کردن تسک‌های تکمیل شده را منتشر می‌کند
   */
  onClearCompleted(): void {
    this.clearCompleted.emit();
  }
}
