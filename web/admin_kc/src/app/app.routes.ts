import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentsComponent } from './components/students/students.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './components/edit-teacher/edit-teacher.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';
import { EditSubjectComponent } from './components/edit-subject/edit-subject.component';
import { FeesCollectionsComponent } from './components/fees-collections/fees-collections.component';
import { AddFeesComponent } from './components/add-fees/add-fees.component';
import { FeesComponent } from './components/fees/fees.component';
import { EventComponent } from './components/event/event.component';
import { BlogComponent } from './components/blog/blog.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ComposeComponent } from './components/compose/compose.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TeacherDetailComponent } from './components/teacher-detail/teacher-detail.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },

  { path: 'student-dashboard', component: StudentDashboardComponent }, // Xong
  { path: 'students', component: StudentsComponent }, // Xong
  { path: 'student-detail/:id', component: StudentDetailComponent }, // Xong
  { path: 'add-student', component: AddStudentComponent }, // Xong
  { path: 'edit-student/:id', component: EditStudentComponent }, // Xong

  { path: 'teacher-dashboard', component: TeacherDashboardComponent }, // Xong
  { path: 'teachers', component: TeachersComponent }, // Xong
  { path: 'teacher-detail/:id', component: TeacherDetailComponent }, // Xong
  { path: 'add-teacher', component: AddTeacherComponent }, // Xong
  { path: 'edit-teacher/:id', component: EditTeacherComponent }, // Xong

  { path: 'subjects', component: SubjectsComponent }, // Xong
  { path: 'add-subject', component: AddSubjectComponent }, // Xong
  { path: 'edit-subject/:id', component: EditSubjectComponent }, // Xong

  { path: 'fees-collections', component: FeesCollectionsComponent }, // Xong
  { path: 'add-fees', component: AddFeesComponent }, // Xong
  { path: 'fees', component: FeesComponent }, // Xong

  { path: 'events', component: EventComponent }, // Xong

  { path: 'blogs', component: BlogComponent }, // Xong
  { path: 'add-blog', component: AddBlogComponent }, // Xong
  { path: 'edit-blog/:id', component: EditBlogComponent }, // Xong

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'compose', component: ComposeComponent },

  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '' },
];
