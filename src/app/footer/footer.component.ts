import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * کامپوننت فوتر برنامه
 * این کامپوننت اطلاعات پایانی برنامه و لینک‌های شبکه‌های اجتماعی را نمایش می‌دهد
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  // اطلاعات فوتر
  currentYear = new Date().getFullYear(); // سال جاری برای نمایش در کپی‌رایت
  appName = 'مدیریت کارها'; // نام برنامه
  developer = 'توسعه‌دهنده'; // نام توسعه‌دهنده

  // لینک‌های شبکه‌های اجتماعی
  socialLinks = [
    {
      name: 'GitHub', // نام شبکه اجتماعی
      url: 'https://github.com', // آدرس پروفایل
      icon: 'github' // نام آیکون
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      icon: 'twitter'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'linkedin'
    }
  ];
}
