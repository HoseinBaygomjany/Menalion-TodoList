import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * کامپوننت هدر برنامه
 * این کامپوننت عنوان و توضیحات برنامه را نمایش می‌دهد
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // اطلاعات هدر
  title = 'مدیریت کارها'; // عنوان اصلی برنامه
  description = 'برنامه‌ای ساده برای مدیریت کارهای روزانه'; // توضیحات برنامه
}
