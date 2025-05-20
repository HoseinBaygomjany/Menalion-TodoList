import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * رابط تعریف ساختار تسک
 */
export interface Todo {
  id: number; // شناسه یکتای تسک
  title: string; // عنوان تسک
  completed: boolean; // وضعیت تکمیل تسک
  createdAt: Date; // تاریخ ایجاد تسک
}

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  // ورودی‌های کامپوننت
  @Input() id!: number; // شناسه یکتای تسک
  @Input() text!: string; // متن تسک
  @Input() completed!: boolean; // وضعیت تکمیل تسک

  // خروجی‌های کامپوننت
  @Output() delete = new EventEmitter<number>(); // رویداد حذف تسک
  @Output() toggle = new EventEmitter<number>(); // رویداد تغییر وضعیت تسک
  @Output() edit = new EventEmitter<{ id: number; text: string }>(); // رویداد ویرایش تسک

  // متغیرهای داخلی کامپوننت
  isEditing = false; // وضعیت ویرایش
  editText = ''; // متن ویرایش شده

  /**
   * شروع ویرایش تسک
   * این متد وضعیت ویرایش را فعال کرده و متن فعلی را در فیلد ویرایش قرار می‌دهد
   */
  startEditing(): void {
    this.isEditing = true;
    this.editText = this.text;
  }

  /**
   * ذخیره تغییرات ویرایش
   * این متد تغییرات را اعمال کرده و رویداد ویرایش را منتشر می‌کند
   */
  saveEdit(): void {
    if (this.editText.trim()) {
      this.edit.emit({ id: this.id, text: this.editText.trim() });
      this.isEditing = false;
    }
  }

  /**
   * لغو ویرایش
   * این متد وضعیت ویرایش را غیرفعال کرده و متن را به حالت اولیه برمی‌گرداند
   */
  cancelEdit(): void {
    this.isEditing = false;
    this.editText = this.text;
  }

  /**
   * حذف تسک
   * این متد رویداد حذف را با شناسه تسک منتشر می‌کند
   */
  onDelete(): void {
    this.delete.emit(this.id);
  }

  /**
   * تغییر وضعیت تکمیل تسک
   * این متد رویداد تغییر وضعیت را با شناسه تسک منتشر می‌کند
   */
  onToggle(): void {
    this.toggle.emit(this.id);
  }
}
