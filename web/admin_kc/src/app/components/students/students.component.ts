import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { AssetsLoaderService } from '../../services/assets-loader';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [FooterComponent, CommonModule, RouterLink, FormsModule],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, OnDestroy {
  students: any[] = [];
  selectedStudent: any = null;
  showDeleteModal = false; // Điều khiển hiển thị modal
  showSuccessNotification = false; // Điều khiển hiển thị thông báo
  studentIdToDelete: number | null = null; // Lưu ID học sinh cần xóa
  notificationMessage: string = ''; // Biến để lưu nội dung thông báo
  searchName: string = ''; // Biến lưu giá trị tìm kiếm theo tên

  constructor(
    private assetsLoader: AssetsLoaderService,
    private studentService: StudentService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.assetsLoader.loadScript('assets/plugins/datatables/datatables.min.js');
    this.assetsLoader.loadScript('assets/js/script.js');
    this.loadStudents();


  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (data) => {
        this.students = data;
        console.log('Student list:', this.students);
      },
      error: (err) => {
        console.error('Error fetching student list:', err);
      }
    });
  }
  
  fetchStudentById(id: number) {
    this.studentService.getStudentById(id).subscribe({
      next: (data) => {
        this.selectedStudent = data;
        console.log('Fetched student by ID:', this.selectedStudent);
      },
      error: (err) => {
        console.error('Error fetching student by ID:', err);
      }
    });
  }

  // Mở modal xác nhận xóa
  openDeleteModal(studentId: number): void {
    this.studentIdToDelete = studentId;
    this.showDeleteModal = true;
  }

  // Đóng modal
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.studentIdToDelete = null;
  }

  // Xác nhận xóa
  confirmDelete(): void {
    if (this.studentIdToDelete !== null) {
      this.studentService.deleteStudent(this.studentIdToDelete).subscribe({
        next: () => {
          this.students = this.students.filter(student => student.id !== this.studentIdToDelete);
          this.closeDeleteModal();
          this.notificationMessage = 'Đã xóa thành công!'; // Cập nhật nội dung thông báo
          this.showSuccessNotification = true;
          // Ẩn thông báo sau 3 giây
          setTimeout(() => {
            this.notificationMessage = 'Đã xóa thành công!';
            this.showSuccessNotification = false;
          }, 3000);
        },
        error: (err) => {
          console.error('Error deleting student:', err);
          alert('Có lỗi xảy ra khi xóa học sinh!');
          this.closeDeleteModal();
        }
      });
    }
    
  }
// Hàm tìm kiếm theo tên
searchStudentsByName() {
  if (!this.searchName.trim()) {
    this.loadStudents();
    return;
  }

  console.log('Calling API with searchName:', this.searchName); // Log giá trị tìm kiếm
  this.studentService.searchStudentsByName(this.searchName).subscribe({
    next: (data) => {
      this.students = data;
      console.log('Found students:', this.students);
      if (this.students.length === 0) {
        this.notificationMessage = 'Không tìm thấy học sinh nào với tên "' + this.searchName + '"!';
        this.showSuccessNotification = true;
        setTimeout(() => {
          this.showSuccessNotification = false;
        }, 3000);
      }
    },
    error: (err) => {
      console.error('Error searching students by name:', err);
      this.notificationMessage = err.status === 404 
        ? 'API không tìm thấy, kiểm tra route backend!' 
        : 'Có lỗi xảy ra khi tìm kiếm!';
      this.students = [];
      this.showSuccessNotification = true;
      setTimeout(() => {
        this.showSuccessNotification = false;
      }, 3000);
    }
  });
}
  
// Hàm tải xuống file CSV với mã hóa UTF-8
downloadCSV(): void {
  // Định nghĩa tiêu đề cột
  const headers = ['ID', 'Họ và Tên', 'Ngày Sinh', 'Giới Tính', 'Lớp', 'Người giám hộ'];
  
  // Chuyển đổi dữ liệu học sinh thành định dạng CSV
  const csvData = this.students.map(student => {
    return [
      student.id,
      `"${student.full_name}"`, // Thêm dấu nháy kép để xử lý dấu phẩy trong tên
      `"${new Date(student.date_of_birth).toLocaleDateString('vi-VN')}"`, // Định dạng ngày
      student.gender === 'male' ? 'Nam' : student.gender === 'female' ? 'Nữ' : 'Không xác định',
      student.classes.length > 0 ? `"${student.classes[0].name}"` : 'Chưa có lớp',
      student.parent?.full_name ? `"${student.parent.full_name}"` : 'Không có phụ huynh'
    ].join(',');
  });

  // Kết hợp tiêu đề và dữ liệu, thêm BOM để hỗ trợ UTF-8
  const csvContent = '\ufeff' + [ // Thêm BOM ở đầu file
    headers.join(','),
    ...csvData
  ].join('\n');

  // Tạo file CSV và tải xuống
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'danh_sach_hoc_sinh.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/img/profiles/avatar-01.jpg';
  }
  
  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
    this.assetsLoader.unloadScript('assets/plugins/datatables/datatables.min.js');
  }
}