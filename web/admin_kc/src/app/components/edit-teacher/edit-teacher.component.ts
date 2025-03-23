import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // Import thêm FormBuilder

@Component({
  selector: 'app-edit-teacher',
  standalone: true, // Since you're using standalone components
  imports: [ReactiveFormsModule],
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.css'],
})
export class EditTeacherComponent implements OnInit {
  teacherId!: number;
  teacherForm!: FormGroup; // Khai báo form group
  message = '';

  constructor(
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder // Khởi tạo FormBuilder
  ) {}

  ngOnInit() {
    this.teacherId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadTeacher();
  }

  initForm() {
    this.teacherForm = this.fb.group({
      full_name: ['', Validators.required],
      phone_number: [
        '',
        [Validators.required, Validators.pattern(/^\d{10,11}$/)],
      ],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  loadTeacher() {
    this.teacherService.getTeacherById(this.teacherId).subscribe(
      (data) => {
        if (data) {
          this.teacherForm.patchValue(data); // Gán giá trị vào form
        } else {
          this.message = 'Không tìm thấy giáo viên!';
        }
      },
      (error) => console.error(error)
    );
  }

  updateTeacher() {
    if (this.teacherForm.invalid) {
      this.message = 'Vui lòng điền đầy đủ thông tin!';
      return;
    }

    this.teacherService
      .updateTeacher(this.teacherId, this.teacherForm.value)
      .subscribe(
        (response) => {
          this.message = 'Cập nhật thành công!';
          this.router.navigate(['/teachers']);
        },
        (error) => {
          console.error(error);
          this.message = 'Cập nhật thất bại!';
        }
      );
  }
}
