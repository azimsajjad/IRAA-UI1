import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddOrgBody, EditOrgBody } from '../models/library';

@Injectable()
export class LibraryService {
  constructor(private http: HttpClient) {}

  public getAllOrganizations(): Observable<any> {
    return this.http.get(
      environment.api_prefix + 'libraries/loadorganizations'
    );
  }

  public addOrganisation(organisation: AddOrgBody): Observable<any> {
    return this.http.post(
      environment.api_prefix + 'libraries/addorganizations',
      organisation
    );
  }

  public editOrganisation(organisation: EditOrgBody): Observable<any> {
    return this.http.put(
      environment.api_prefix + 'libraries/putorganization',
      organisation
    );
  }

  public deleteOrganization(id: any): Observable<any> {
    return this.http.delete(
      environment.api_prefix + 'libraries/deleteorganization/' + id
    );
  }

  public getAllDepartment(): Observable<any> {
    return this.http.get(environment.api_prefix + 'libraries/loaddepartments');
  }

  public addDepartment(department: any): Observable<any> {
    return this.http.post(
      environment.api_prefix + 'libraries/adddepartments',
      department
    );
  }

  public editDepartment(department: any): Observable<any> {
    return this.http.put(
      environment.api_prefix + 'libraries/putdepartment',
      department
    );
  }

  public deleteDepartment(id: any): Observable<any> {
    return this.http.delete(
      environment.api_prefix + 'libraries/deletedepartment/' + id
    );
  }
}
