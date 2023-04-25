import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OrganisationComponent } from './routes/libraries/organisation/organisation.component';
import { DepartmentComponent } from './routes/libraries/department/department.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'library/organisation', component: OrganisationComponent },
  { path: 'library/department', component: DepartmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
