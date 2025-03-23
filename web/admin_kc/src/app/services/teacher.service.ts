import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // ✅ Import đúng cách

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private apiUrl = 'http://localhost:3105/api/users'; // Địa chỉ API Node.js

  constructor(private http: HttpClient) {}

  // Lấy danh sách giáo viên
  getAllTeachers(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  getTeacherById(id: number): Observable<any> {
    return this.http
      .get<any[]>('http://localhost:3105/api/users')
      .pipe(
        map((users) =>
          users.find(
            (user) =>
              user.id === id &&
              user.roles.some((role: any) => role.role_name === 'Teacher')
          )
        )
      );
  }
  addTeacher(teacherData: any) {
    return this.http.post('http://localhost:3105/api/users', teacherData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  


  updateTeacher(id: number, teacherData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, teacherData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  deleteTeacher(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  // Tìm kiếm giáo viên theo tên hoặc số điện thoại
  searchTeachers(params: { name?: string; phone?: string }): Observable<any[]> {
    const query = new URLSearchParams();
    if (params.name) query.set('name', params.name);
    if (params.phone) query.set('phone', params.phone);
    return this.http.get<any[]>(`${this.apiUrl}/search-teacher?${query.toString()}`);
  }
}
