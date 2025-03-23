import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetsLoaderService } from '../../services/assets-loader';
import { TeacherService } from '../../services/teacher.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-teacher-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-detail.component.html',
  styleUrl: './teacher-detail.component.css',
})
export class TeacherDetailComponent implements OnInit, OnDestroy {
  teacher: any = null;
  constructor(
    private assetsLoader: AssetsLoaderService,
    private teacherService: TeacherService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.assetsLoader.loadScript('assets/js/script.js');
    // Get the student ID from the route parameters
    const teacherId = Number(this.route.snapshot.paramMap.get('id'));

    this.teacherService.getTeacherById(teacherId).subscribe({
      next: (teacher) => {
        if (teacher) {
          this.teacher = teacher;
          console.log(teacher);
        } else {
          console.error('Teacher not found');
        }
      },
      error: (err) => {
        console.error('Error fetching teacher details:', err);
      },
    });
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
  }
}
