import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MedicalReportService } from "../../services/medical-resport-service.service";
import { ToastrService } from 'ngx-toastr'; // Importa ToastrService

@Component({
  templateUrl: './survey-dialog.component.html',
  styleUrls: ['./survey-dialog.component.scss'],
  selector: 'app-survey-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ]
})
export class SurveyDialogComponent {
  // Opciones de la encuesta
  calificarApp = ['Si', 'No'];
  calificacionSeleccionada = '';
  mejoroIaOpciones = ['Si', 'No'];
  mejoroIaSeleccionada = ''; // Nuevo campo para "mejoro_ia"
  comentarios = '';

  // ID dinámico del paciente
  patientId: string;

  constructor(
    private dialogRef: MatDialogRef<SurveyDialogComponent>,
    private medicalReportService: MedicalReportService,
    private toastr: ToastrService, // Inyecta ToastrService
    @Inject(MAT_DIALOG_DATA) public data: { patientId: string } // Inyecta el ID del paciente
  ) {
    this.patientId = data.patientId; // Asigna el ID del paciente desde los datos inyectados
  }

  onCancel(): void {
    this.dialogRef.close(); // Cierra el diálogo sin enviar datos
  }

  onSubmit(): void {
    // Verifica que los campos necesarios estén llenos
    if (this.patientId && this.calificacionSeleccionada && this.mejoroIaSeleccionada !== undefined) {
      const ayudoIa = this.calificacionSeleccionada === 'Si';
      const comentariosAdicionales = this.comentarios;
      const mejoroIa = this.mejoroIaSeleccionada === 'Si';  // Convierte a booleano

      // Envía los datos al backend
      this.medicalReportService.submitFeedbackE(this.patientId, ayudoIa,mejoroIa, comentariosAdicionales)
        .subscribe(
          response => {
            // Maneja una respuesta exitosa
            this.dialogRef.close({ success: true });
            this.toastr.success('Encuesta enviada con éxito', 'Éxito');
          },
          error => {
            // Maneja errores
            this.toastr.error('Hubo un error al enviar la Encuesta', 'Error');
            console.error('Error:', error);
          }
        );
    } else {
      this.toastr.warning('Por favor, complete todos los campos', 'Advertencia');
    }
  }

}
