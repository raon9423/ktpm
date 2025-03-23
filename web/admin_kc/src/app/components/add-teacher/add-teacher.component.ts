import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TeacherService } from '../../services/teacher.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
})
export class AddTeacherComponent implements OnInit, OnDestroy {
  teacherForm!: FormGroup;
  submitSuccess: boolean = false;
  submitError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.teacherForm = this.fb.group({
      full_name: ['', Validators.required],
      phone_number: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,11}$')],
      ],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
      role_id: [2],
    });
  }

  ngOnDestroy() {}

  submitForm() {
    if (this.teacherForm.valid) {
      if (
        this.teacherForm.value.password !==
        this.teacherForm.value.confirmPassword
      ) {
        alert('Mật khẩu không khớp!');
        return;
      }

      const teacherData = { ...this.teacherForm.value };
      delete teacherData.confirmPassword;

      this.teacherService.addTeacher(teacherData).subscribe({
        next: () => {
          this.submitSuccess = true;
          this.submitError = false;
          alert('Giáo viên đã được thêm thành công!');
          this.resetForm();
        },
        error: (err) => {
          this.submitSuccess = false;
          this.submitError = true;
          console.error('Lỗi API:', err);
          alert('Lỗi: ' + err.error?.message || 'Không thể thêm giáo viên!');
        },
      });
    }
  }

  resetForm() {
    this.teacherForm.reset();
    this.submitSuccess = false;
    this.submitError = false;
  }
}
