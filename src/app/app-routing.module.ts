import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'ward-admin', loadChildren: './ward-admin/ward-admin.module#WardAdminPageModule' },
  { path: 'ward-manage', loadChildren: './ward-manage/ward-manage.module#WardManagePageModule' },
  { path: 'obs-report', loadChildren: './obs-report/obs-report.module#ObsReportPageModule' },
  { path: 'ward-join', loadChildren: './ward-join/ward-join.module#WardJoinPageModule' },
  { path: 'register-admin', loadChildren: './register-admin/register-admin.module#RegisterAdminPageModule' },
  { path: 'patient-add', loadChildren: './patient-add/patient-add.module#PatientAddPageModule' },
  { path: 'ward-patients', loadChildren: './ward-patients/ward-patients.module#WardPatientsPageModule' },
  { path: 'ward-view-options', loadChildren: './ward-view-options/ward-view-options.module#WardViewOptionsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
