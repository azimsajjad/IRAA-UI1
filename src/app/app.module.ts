import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertComponent } from './components/alert/alert.component';
import { OrganisationComponent } from './routes/libraries/organisation/organisation.component';
import { LibraryService } from './services/library.service';
import { AddOrganisationDialogComponent } from './routes/libraries/organisation/add-organisation.dialog';
import { DepartmentComponent } from './routes/libraries/department/department.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoaderComponent,
    LoginComponent,
    OrganisationComponent,
    AddOrganisationDialogComponent,
    DepartmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AuthService, LibraryService],
  bootstrap: [AppComponent],
  entryComponents: [AddOrganisationDialogComponent],
})
export class AppModule {}
