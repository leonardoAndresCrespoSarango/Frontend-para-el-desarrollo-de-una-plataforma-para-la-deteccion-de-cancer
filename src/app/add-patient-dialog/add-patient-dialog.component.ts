import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.scss']
})
export class AddPatientDialogComponent {

  addPatientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPatientDialogComponent>
  ) {
    this.addPatientForm = this.fb.group({
      patientId: ['', Validators.required],
      numeroHistoriaClinica: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
