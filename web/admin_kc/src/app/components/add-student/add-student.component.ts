import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetsLoaderService } from '../../services/assets-loader';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit, OnDestroy {
  studentForm!: FormGroup;
  classes: any[] = [];
  parents: any[] = [];
  selectedFile: File | null = null; // Biến lưu file ảnh được chọn

  constructor(
    private assetsLoader: AssetsLoaderService,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.assetsLoader.loadScript('assets/plugins/slimscroll/jquery.slimscroll.min.js');
    this.assetsLoader.loadScript('assets/plugins/select2/js/select2.min.js');
    this.assetsLoader.loadScript('assets/plugins/moment/moment.min.js');
    this.assetsLoader.loadScript('assets/js/bootstrap-datetimepicker.min.js');
    this.assetsLoader.loadScript('assets/js/script.js');


    this.studentForm = this.fb.group({
      full_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      gender: ['', Validators.required],
      class_id: ['', Validators.required],
      parent_id: ['', Validators.required]
    });

    // Fetch classes
    this.studentService.getAllClasses().subscribe({
      next: (data) => {
        this.classes = data || [];
        console.log("lop", this.classes);
      },
      error: (err) => console.error('Error fetching classes:', err)
    });

    // Fetch parents
    this.studentService.getParents().subscribe({
      next: (data) => {
        this.parents = data.filter(user => 
          user.roles.some((role: any) => role.role_name === 'Parent')
        ) || [];
        console.log("phu huynh", this.parents);
      },
      error: (err) => console.error('Lỗi khi lấy danh sách phụ huynh:', err)
    });
  }

  ngOnDestroy(): void {
    this.assetsLoader.unloadScript('assets/plugins/slimscroll/jquery.slimscroll.min.js');
    this.assetsLoader.unloadScript('assets/plugins/select2/js/select2.min.js');
    this.assetsLoader.unloadScript('assets/plugins/moment/moment.min.js');
    this.assetsLoader.unloadScript('assets/js/bootstrap-datetimepicker.min.js');
    this.assetsLoader.unloadScript('assets/js/script.js');
  }

  // Xử lý khi chọn file ảnh
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

 onSubmit(): void {
  if (this.studentForm.invalid) {
    alert('Vui lòng điền đầy đủ thông tin!');
    this.studentForm.markAllAsTouched();
    return;
  }

  const formData = new FormData();
  formData.append('full_name', this.studentForm.get('full_name')?.value);
  formData.append('date_of_birth', this.studentForm.get('date_of_birth')?.value);
  formData.append('gender', this.studentForm.get('gender')?.value === '1' ? 'male' : 'female');
  formData.append('class_id', this.studentForm.get('class_id')?.value);
  formData.append('parent_id', this.studentForm.get('parent_id')?.value);
  if (this.selectedFile) {
    formData.append('image', this.selectedFile, this.selectedFile.name);
  }

  this.studentService.createStudent(formData).subscribe({
    next: () => {
      alert('Thêm sinh viên thành công!');
      this.studentForm.reset();
      this.selectedFile = null;
      this.router.navigate(['/students']);
    },
    error: (err) => {
      console.error('Lỗi khi thêm sinh viên:', err);
      alert('Có lỗi xảy ra khi thêm sinh viên!');
    }
  });
}
}