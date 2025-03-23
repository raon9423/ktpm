import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SchedulesService, Schedule } from '../../services/schedules.service';
import { AssetsLoaderService } from '../../services/assets-loader';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.css',
})
export class AddSubjectComponent implements OnInit, OnDestroy {
  subjectForm: FormGroup;
  isSubmitting = false;
  error: string | null = null;
  
  // Days of week options for dropdown
  daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private schedulesService: SchedulesService,
    private router: Router,
    private assetsLoader: AssetsLoaderService
  ) {
    this.subjectForm = this.formBuilder.group({
      subject: ['', [Validators.required]],
      class_id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      day_of_week: ['', [Validators.required]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      teacher_id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  ngOnInit() {
    this.assetsLoader.loadScript('assets/js/script.js');
  }

  ngOnDestroy() {
    this.assetsLoader.unloadScript('assets/js/script.js');
  }

  onSubmit() {
    if (this.subjectForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.subjectForm.controls).forEach(key => {
        this.subjectForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.error = null;

    // Format time in HH:MM:SS format if needed by the API
    const startTime = this.subjectForm.value.start_time;
    const endTime = this.subjectForm.value.end_time;

    const scheduleData = {
      subject: this.subjectForm.value.subject,
      class_id: Number(this.subjectForm.value.class_id),
      day_of_week: this.subjectForm.value.day_of_week,
      start_time: startTime.includes(':') ? startTime : `${startTime}:00`,
      end_time: endTime.includes(':') ? endTime : `${endTime}:00`,
      teacher_id: Number(this.subjectForm.value.teacher_id)
    };

    // Log data being sent to help debug
    console.log('Sending schedule data:', scheduleData);

    this.schedulesService.createSchedule(scheduleData).subscribe({
      next: (response) => {
        console.log('Schedule created successfully:', response);
        this.isSubmitting = false;
        this.router.navigate(['/subjects']);
      },
      error: (err: HttpErrorResponse) => {
        this.isSubmitting = false;
        
        // Provide more detailed error information
        if (err.error && typeof err.error === 'object' && err.error.message) {
          this.error = `Error: ${err.error.message}`;
        } else if (err.error && typeof err.error === 'string') {
          this.error = `Error: ${err.error}`;
        } else {
          this.error = `Failed to add subject (${err.status}). Please check your input or try again later.`;
        }
        
        console.error('Error adding subject:', err);
      }
    });
  }
}