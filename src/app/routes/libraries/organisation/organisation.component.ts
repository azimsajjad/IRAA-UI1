import { Component, ViewChild } from '@angular/core';
import { Organisation } from 'src/app/models/library';
import { GeneralService } from 'src/app/services/general.service';
import { LibraryService } from 'src/app/services/library.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddOrganisationDialogComponent } from './add-organisation.dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.scss'],
})
export class OrganisationComponent {
  opened = true;
  allOrg: MatTableDataSource<Organisation>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['organization', 'organization_description', 'action'];

  constructor(
    private generalService: GeneralService,
    private libraryService: LibraryService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllOrg();
  }

  private getAllOrg() {
    this.generalService.loaderEvent.next(true);
    this.libraryService.getAllOrganizations().subscribe((res) => {
      this.allOrg = new MatTableDataSource(res.data);

      this.allOrg.paginator = this.paginator;
      this.allOrg.sort = this.sort;

      this.generalService.loaderEvent.next(false);
    });
  }

  addNew(ele?: Organisation) {
    const dialogRef = this.dialog.open(AddOrganisationDialogComponent, {
      data: ele,
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((ele) => {
      if (ele != null || ele != undefined) {
        if (ele.organization_uid == null) {
          this.libraryService.addOrganisation(ele).subscribe((res) => {
            if (res.data) {
              this.getAllOrg();
              this._snackBar.open('Added Successfully!', 'Close', {
                duration: 2000,
              });
            } else {
              this._snackBar.open(res.message, 'Close', {
                duration: 2000,
              });
            }
          });
        } else {
          this.libraryService.editOrganisation(ele).subscribe((res) => {
            if (res.data) {
              this.getAllOrg();
              this._snackBar.open('Edited Successfully!', 'Close', {
                duration: 2000,
              });
            } else {
              this._snackBar.open(res.message, 'Close', {
                duration: 2000,
              });
            }
          });
        }
      }
    });
  }

  delete(ele: Organisation) {
    this.generalService.alertEvent.next({
      title: 'Confirmation',
      text: 'Are You sure to delete this Organisation?',
      onOk: () => {
        this.libraryService
          .deleteOrganization(ele.organization_uid)
          .subscribe((res) => {
            if (res.data) {
              this.getAllOrg();
              this._snackBar.open('Deleted Successfully!', 'Close', {
                duration: 2000,
              });
            } else {
              this._snackBar.open(res.message, 'Close', {
                duration: 2000,
              });
            }
          });
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);

    this.allOrg.filter = filterValue.trim().toLowerCase();

    if (this.allOrg.paginator) {
      this.allOrg.paginator.firstPage();
    }
  }

  toggleSidenav() {
    this.opened = !this.opened;
  }
}
