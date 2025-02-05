import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Componente de diálogo para agregar un nuevo paciente.
 * Permite ingresar la identificación del paciente y su número de historia clínica.
 */
@Component({
  selector: 'app-add-patient-dialog',
  templateUrl: './add-patient-dialog.component.html',
  styleUrls: ['./add-patient-dialog.component.scss']
})
export class AddPatientDialogComponent {

  /** Formulario para agregar un nuevo paciente */
  addPatientForm: FormGroup;

  /**
   * Constructor del componente.
   * @param fb FormBuilder para la creación del formulario.
   * @param dialogRef Referencia al diálogo para poder cerrarlo cuando sea necesario.
   */
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddPatientDialogComponent>
  ) {
    this.addPatientForm = this.fb.group({
      /** Identificación del paciente (debe ser un número de 10 dígitos) */
      patientId: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],

      /** Número de historia clínica del paciente */
      numeroHistoriaClinica: ['', Validators.required]
    });
  }

  /**
   * Cierra el diálogo sin realizar ninguna acción.
   */
  onCancel(): void {
    this.dialogRef.close();
  }
}
