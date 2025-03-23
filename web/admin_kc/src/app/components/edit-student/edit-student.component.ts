import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetsLoaderService } from '../../services/assets-loader';
import { StudentService } from '../../services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit, OnDestroy {
  student: any = {
    id: null,
    full_name: '',
    date_of_birth: '',
    gender: '',
    parent_id: null,
    class_id: null,
    image: null // Thêm trường image
  };
  classes: any[] = [];
  parents: any[] = [];
  selectedFile: File | null = null; // File ảnh mới
  currentImage: string | null = null; // Hình ảnh hiện tại

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private assetsLoader: AssetsLoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    Promise.all([
      this.assetsLoader.loadScript('assets/plugins/slimscroll/jquery.slimscroll.min.js'),
      this.assetsLoader.loadScript('assets/plugins/select2/js/select2.min.js'),
      this.assetsLoader.loadScript('assets/plugins/moment/moment.min.js'),
      this.assetsLoader.loadScript('assets/js/bootstrap-datetimepicker.min.js'),
      this.assetsLoader.loadScript('assets/js/script.js')
    ]).catch(error => console.error('Error loading scripts:', error));

    const studentId = Number(this.route.snapshot.paramMap.get('id'));

    // Fetch student details
    this.studentService.getStudentById(studentId).subscribe({
      next: (data) => {
        this.student = {
          ...data,
          date_of_birth: data.date_of_birth ? moment(data.date_of_birth).format('YYYY-MM-DD') : ''
        };
        this.currentImage = data.image; // Lưu hình ảnh hiện tại
      },
      error: (err) => console.error('Error fetching student details:', err)
    });

    // Fetch classes
    this.studentService.getAllClasses().subscribe({
      next: (data) => {
        this.classes = data || [];
        console.log("Classes:", this.classes);
      },
      error: (err) => console.error('Error fetching classes:', err)
    });

    // Fetch parents
    this.studentService.getParents().subscribe({
      next: (data) => {
        this.parents = data.filter(user =>
          user.roles.some((role: any) => role.role_name === 'Parent')
        ) || [];
      },
      error: (err) => console.error('Lỗi khi lấy danh sách phụ huynh:', err)
    });
  }

  // Xử lý khi chọn file ảnh mới
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      alert('Please fill in all required fields!');
      return;
    }

    // Chuẩn bị dữ liệu gửi lên bằng FormData
    const formData = new FormData();
    formData.append('full_name', this.student.full_name);
    formData.append('date_of_birth', this.student.date_of_birth ? moment(this.student.date_of_birth).format('YYYY-MM-DD') : '');
    formData.append('gender', this.student.gender);
    formData.append('class_id', this.student.class_id?.toString() || '');
    formData.append('parent_id', this.student.parent_id?.toString() || '');

    // Chỉ thêm hình ảnh nếu có file mới
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    const studentId = Number(this.route.snapshot.paramMap.get('id'));
    this.studentService.updateStudent(studentId, formData).subscribe({
      next: () => {
        alert('Student updated successfully!');
        this.router.navigate(['/students']);
      },
      error: (err) => {
        console.error('Error updating student:', err);
        console.log('Error details:', err.error); // Log chi tiết lỗi
        alert('Failed to update student. Check console for details.');
      }
    });
  }

  ngOnDestroy(): void {
    this.assetsLoader.unloadScript('assets/plugins/slimscroll/jquery.slimscroll.min.js');
    this.assetsLoader.unloadScript('assets/plugins/select2/js/select2.min.js');
    this.assetsLoader.unloadScript('assets/plugins/moment/moment.min.js');
    this.assetsLoader.unloadScript('assets/js/bootstrap-datetimepicker.min.js');
    this.assetsLoader.unloadScript('assets/js/script.js');
  }
}