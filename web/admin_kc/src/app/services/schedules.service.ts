import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Schedule {
  id?: number;
  class_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  subject: string;
  teacher_id: number;
  createdAt?: Date;
  updatedAt?: Date;
  class?: {
    id: number;
    name: string;
  };
  teacher?: {
    id: number;
    full_name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  private baseUrl = 'http://localhost:3105/api/schedules';

  constructor(private http: HttpClient) {}

  getAllSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.baseUrl}`);
  }

  getScheduleByClass(classId: number): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(`${this.baseUrl}/${classId}`);
  }

  createSchedule(data: Omit<Schedule, 'id' | 'createdAt' | 'updatedAt' | 'class' | 'teacher'>): Observable<Schedule> {
    return this.http.post<Schedule>(`${this.baseUrl}`, data);
  }

  updateSchedule(id: number, data: Partial<Schedule>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteSchedule(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}