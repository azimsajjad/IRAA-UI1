import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Organisation } from 'src/app/models/library';

@Component({
  templateUrl: 'add-organisation.dialog.html',
})
export class AddOrganisationDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddOrganisationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Organisation,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      organization_uid: this.data?.organization_uid || null,
      organization: [this.data?.organization || null, Validators.required],
      organization_description: [
        this.data?.organization_description || null,
        Validators.required,
      ],
    });
  }

  close(type: 'save' | 'reset') {
    if (type == 'reset') {
      this.dialogRef.close(null);
    } else {
      this.dialogRef.close(this.form.value);
    }
  }
}
