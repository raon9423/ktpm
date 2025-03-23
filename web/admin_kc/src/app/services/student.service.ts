
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // ✅ Import đúng cách

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:3105/api/students';
  constructor(private http: HttpClient) { }

  // Lấy danh sách sinh viên
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // lấy sinh vien theo id 
  getStudentById(id: Number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // them moi hoc sinh
  createStudent(studentData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}`, studentData);
  }

  // cap nhat hoc sinh
  updateStudent(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // xoa hoc sinh
  deleteStudent(studentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${studentId}`);
  }

 // Thêm hàm tìm kiếm theo tên
 searchStudentsByName(name: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/search?name=${encodeURIComponent(name)}`);
}

  // lay lop hoc 
  getAllClasses(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3105/api/classes');
  }

  // lay phu huynh
  getParents(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3105/api/users');
  }

  // lay vaccine 
  getStudentVaccines(id: number): Observable<any> {
    return this.http.get<any[]>('http://localhost:3105/api/student-vaccines').pipe(
      map((vaccines) => vaccines.filter((vaccine) => vaccine.student_id === id))
    );
  }

  // lay cac hoat động đã tham giagia
  getStudentActivities(id: number): Observable<any> {
    return this.http.get<any[]>('http://localhost:3105/api/activity-participants').pipe(
      map((activities) => activities.filter((activity) => activity.student_id === id))
    );
  }

  // lấy so buổi vắng 
  getStudentAttendance(id: number): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3105/api/attendance').pipe(
      map((attendances: any[]) => attendances.filter((att: any) => att.student_id === id))
    );
  }
  
}
