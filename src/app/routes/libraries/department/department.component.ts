import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Department, Organisation } from 'src/app/models/library';
import { GeneralService } from 'src/app/services/general.service';
import { LibraryService } from 'src/app/services/library.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent {
  opened = true;
  showTable: boolean = true;
  organisationList: Organisation[];
  allDepartment: MatTableDataSource<Department>;

  form: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['department_uid', 'organization', 'department', 'action'];

  constructor(
    private generalService: GeneralService,
    private libraryService: LibraryService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getAllDepartment();

    this.libraryService.getAllOrganizations().subscribe((res) => {
      this.organisationList = res.data;
    });
  }

  private getAllDepartment() {
    this.generalService.loaderEvent.next(true);
    this.libraryService.getAllDepartment().subscribe((res) => {
      this.allDepartment = new MatTableDataSource(res.data);

      this.allDepartment.paginator = this.paginator;
      this.allDepartment.sort = this.sort;

      this.generalService.loaderEvent.next(false);
    });
  }

  addNew(ele?: Department) {
    this.showTable = false;

    this.form = this.fb.group({
      department_uid: ele ? ele.department_uid : null,
      organization: [ele ? ele.organization : null],
      organization_id: [
        ele ? ele.organization_id : null,
        [Validators.required],
      ],
      department: [ele ? ele.department : null, [Validators.required]],
    });
  }

  onFormSubmit() {
    if (this.form.value.department_uid == null) {
      this.form
        .get('organization')
        ?.setValue(
          this.organisationList.find(
            (ele) =>
              ele.organization_id == this.form.get('organization_id')?.value
          )?.organization
        );

      this.libraryService.addDepartment(this.form.value).subscribe((res) => {
        if (res.data) {
          this._snackBar.open('Added Successfully!', 'Close', {
            duration: 2000,
          });
          this.showTable = !this.showTable;
          this.getAllDepartment();
        } else {
          this._snackBar.open(res.message, 'Close', {
            duration: 2000,
          });
          this.showTable = !this.showTable;
        }
      });
    } else {
      this.libraryService.editDepartment(this.form.value).subscribe((res) => {
        if (res.data) {
          this._snackBar.open('Edited Successfully!', 'Close', {
            duration: 2000,
          });
          this.showTable = !this.showTable;
          this.getAllDepartment();
        } else {
          this._snackBar.open(res.message, 'Close', {
            duration: 2000,
          });
          this.showTable = !this.showTable;
        }
      });
    }
  }

  delete(ele: Department) {
    this.generalService.alertEvent.next({
      title: 'Confirmation',
      text: 'Are you sure to delete this department?',
      onOk: () => {
        this.libraryService
          .deleteDepartment(ele.department_uid)
          .subscribe((res) => {
            if (res.data) {
              this._snackBar.open('Deleted Successfully!', 'Close', {
                duration: 2000,
              });
              this.getAllDepartment();
            } else {
              this._snackBar.open(res.message, 'Close', {
                duration: 2000,
              });
            }
          });
      },
    });
  }

  applyFilter(event: Event) {}

  toggleSidenav() {
    this.opened = !this.opened;
  }
}
