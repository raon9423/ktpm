import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExtracurricularActivitiesService {
  private readonly baseUrl = 'http://localhost:3105/api/extracurricular-activities';

  constructor(private http: HttpClient) {}

  getActivities(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}