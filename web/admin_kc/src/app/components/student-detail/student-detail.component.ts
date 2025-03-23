import { Component, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { AssetsLoaderService } from '../../services/assets-loader';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { StudentService } from '../../services/student.service';
@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [FooterComponent,NgFor],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css',
})
export class StudentDetailComponent implements OnInit, OnDestroy {

  student: any = null; // Property to hold the student details

  vaccineCount: number = 0;
  activityCount : number = 0; // Property to hold the number of activities
  absentCount: number = 0; // Property to hold the number of absences
  vaccineList: any[] = [];
  constructor(
    private assetsLoader: AssetsLoaderService,
    private studentService: StudentService,
    private route: ActivatedRoute
  
  ) {}

  ngOnInit(): void {
    this.assetsLoader.loadScript('assets/js/script.js');
  // Get the student ID from the route parameters
  const studentId = Number(this.route.snapshot.paramMap.get('id'));

  // Fetch the student details using the ID
  this.studentService.getStudentById(studentId).subscribe({
    next: (data) => {
      this.student = data;
      console.log('Fetched student details:', this.student);
    },
    error: (err) => {
      console.error('Error fetching student details:', err);
    }
  });
  // lấy so luong vacine đã timtim
  this.studentService.getStudentVaccines(studentId).subscribe({
    next: (data) => {
      this.vaccineCount = data.length; // Lấy số lượng vaccine
      this.vaccineList = data; // Lưu danh sách vaccine vào biến
      console.log('Fetched student vaccines:', this.vaccineList);
      console.log('Fetched student vaccines:', this.vaccineCount);
    },
    error: (err) => {
      console.error('Error fetching student vaccines:', err);
    }
  });

  
  // Lấy số lượng hoạt động
  this.studentService.getStudentActivities(studentId).subscribe({
    next: (data) => {
      this.activityCount = data.length; // Số lượng hoạt động tham gia

    },
    error: (err) => {
      console.error('Error fetching student activities:', err);
    }
  });

  // Lấy số buổi vắng
  this.studentService.getStudentAttendance(studentId).subscribe({
    next: (data: any[]) => {
      this.absentCount = data.filter((att: any) => att.status === 'absent').length; // ✅ Fix lỗi
    },
    error: (err) => {
      console.error('Error fetching student attendance:', err);
    }
  });

  }


  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
  }
}
