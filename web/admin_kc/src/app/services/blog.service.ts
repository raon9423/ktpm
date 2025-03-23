import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Activity {
  id?: number;
  name: string;
  description?: string;
  teacher_id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3105/api/activities';

  constructor(private http: HttpClient) { }

  // Get all activities
  getActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(this.apiUrl);
  }

  // Get activity by ID
  getActivityById(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.apiUrl}/${id}`);
  }

  // Create new activity
  createActivity(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.apiUrl, activity);
  }

  // Update activity
  updateActivity(id: number, activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(`${this.apiUrl}/${id}`, activity);
  }

  // Delete activity
  deleteActivity(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}