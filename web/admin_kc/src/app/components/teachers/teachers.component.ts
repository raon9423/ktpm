import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { AssetsLoaderService } from '../../services/assets-loader';
import { TeacherService } from '../../services/teacher.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FooterComponent,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit, OnDestroy {
  teachers: any[] = []; // Danh sách giáo viên gốc
  filteredTeachers: any[] = []; // Danh sách sau khi tìm kiếm
  searchId: string = ''; // ID nhập vào để tìm kiếm
  searchName: string = ''; // Tên nhập vào để tìm kiếm
  searchPhone: string = ''; // Số điện thoại nhập vào để tìm kiếm
  showDeleteModal = false;
  showSuccessNotification = false;
  teacherIdToDelete: number | null = null;
  notificationMessage: string = '';

  constructor(
    private assetsLoader: AssetsLoaderService,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.assetsLoader.loadScript('assets/plugins/datatables/datatables.min.js');
    this.assetsLoader.loadScript('assets/js/script.js');
    this.getTeachersList();
  }

  // Lấy danh sách giáo viên
  getTeachersList() {
    this.teacherService.getAllTeachers().subscribe({
      next: (data) => {
        if (!Array.isArray(data)) {
          console.error('API không trả về mảng hợp lệ:', data);
          return;
        }
        this.teachers = data.filter((teacher) =>
          teacher.roles?.some((role: any) => role.role_name === 'Teacher')
        );
        this.filteredTeachers = [...this.teachers];
        console.log('Danh sách giáo viên:', this.teachers);
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách giáo viên:', err);
      },
    });
  }

  // Tìm kiếm giáo viên theo ID
  searchTeacherById() {
    if (!this.searchId.trim()) {
      this.filteredTeachers = [...this.teachers];
      return;
    }

    this.teacherService.getTeacherById(Number(this.searchId)).subscribe({
      next: (data) => {
        this.filteredTeachers = [data];
        console.log('Tìm thấy giáo viên:', data);
      },
      error: (err) => {
        console.error(`Lỗi khi tìm giáo viên ID ${this.searchId}:`, err);
        this.filteredTeachers = [];
      },
    });
  }

  // Tìm kiếm giáo viên theo tên hoặc số điện thoại
  searchTeachers() {
    if (!this.searchName.trim() && !this.searchPhone.trim()) {
      this.filteredTeachers = [...this.teachers]; // Nếu không nhập gì, hiển thị toàn bộ
      return;
    }

    this.teacherService
      .searchTeachers({ name: this.searchName, phone: this.searchPhone })
      .subscribe({
        next: (data) => {
          this.filteredTeachers = data;
          console.log('Kết quả tìm kiếm giáo viên:', data);
          if (data.length === 0) {
            this.notificationMessage = 'Không tìm thấy giáo viên nào!';
            this.showSuccessNotification = true;
            setTimeout(() => {
              this.showSuccessNotification = false;
            }, 3000);
          }
        },
        error: (err) => {
          console.error('Lỗi khi tìm kiếm giáo viên:', err);
          this.filteredTeachers = [];
          this.notificationMessage = 'Có lỗi xảy ra khi tìm kiếm!';
          this.showSuccessNotification = true;
          setTimeout(() => {
            this.showSuccessNotification = false;
          }, 3000);
        },
      });
  }

  // Mở modal xác nhận xóa
  openDeleteModal(teacherId: number): void {
    this.teacherIdToDelete = teacherId;
    this.showDeleteModal = true;
  }

  // Đóng modal
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.teacherIdToDelete = null;
  }

  // Xác nhận xóa
  confirmDelete(): void {
    if (this.teacherIdToDelete !== null) {
      this.teacherService.deleteTeacher(this.teacherIdToDelete).subscribe({
        next: () => {
          this.teachers = this.teachers.filter(
            (teacher) => teacher.id !== this.teacherIdToDelete
          );
          this.filteredTeachers = this.filteredTeachers.filter(
            (teacher) => teacher.id !== this.teacherIdToDelete
          );
          this.closeDeleteModal();
          this.notificationMessage = 'Đã xóa giáo viên thành công!';
          this.showSuccessNotification = true;
          setTimeout(() => {
            this.showSuccessNotification = false;
          }, 3000);
        },
        error: (err) => {
          console.error('Lỗi khi xóa giáo viên:', err);
          this.notificationMessage = 'Có lỗi xảy ra khi xóa giáo viên!';
          this.showSuccessNotification = true;
          this.closeDeleteModal();
          setTimeout(() => {
            this.showSuccessNotification = false;
          }, 3000);
        },
      });
    }
  }

  // Hàm tải xuống file CSV
  downloadCSV() {
    const headers = ['ID', 'Username', 'Email', 'Full name', 'Phone', 'Address'];
    const csvData = this.filteredTeachers.map((teacher) => {
      return [
        teacher.id,
        `"${teacher.username}"`,
        `"${teacher.email}"`,
        `"${teacher.full_name}"`,
        `"${teacher.phone_number || 'N/A'}"`,
        `"${teacher.address || 'N/A'}"`,
      ].join(',');
    });

    const csvContent = '\ufeff' + [headers.join(','), ...csvData].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'danh_sach_giao_vien.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
    this.assetsLoader.unloadScript('assets/plugins/datatables/datatables.min.js');
  }
}