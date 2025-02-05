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
import { ToastrService } from 'ngx-toastr';

/**
 * Componente de diálogo para la encuesta de satisfacción sobre la IA en diagnósticos médicos.
 * Permite a los usuarios calificar la utilidad y precisión de la IA en el sistema.
 */
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
  /** Opciones de calificación de la IA */
  calificarApp = [
    'Completamente de acuerdo',
    'De acuerdo',
    'Neutral',
    'En desacuerdo',
    'Completamente en desacuerdo',
    'Desconozco'
  ];

  /** Calificación seleccionada */
  calificacionSeleccionada = '';

  /** Opciones de mejora de la IA */
  mejoroIaOpciones = ['Si', 'No'];

  /** Opción seleccionada sobre si la IA mejoró el diagnóstico */
  mejoroIaSeleccionada = '';

  /** Comentarios adicionales del usuario */
  comentarios = '';

  /** ID del paciente para asociar la encuesta */
  patientId: string;

  /**
   * Constructor del componente.
   * @param dialogRef Referencia al diálogo de Material para manejar su estado.
   * @param medicalReportService Servicio para enviar la encuesta al backend.
   * @param toastr Servicio de notificaciones Toastr para mostrar mensajes.
   * @param data Datos inyectados en el diálogo, incluyendo el ID del paciente.
   */
  constructor(
    private dialogRef: MatDialogRef<SurveyDialogComponent>,
    private medicalReportService: MedicalReportService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { patientId: string }
  ) {
    this.patientId = data.patientId;
  }

  /**
   * Cierra el diálogo sin realizar ninguna acción.
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Envía la encuesta de satisfacción sobre la IA al backend.
   * Verifica que todos los campos obligatorios estén completos antes de enviarla.
   */
  onSubmit(): void {
    if (this.patientId && this.calificacionSeleccionada && this.mejoroIaSeleccionada !== undefined) {
      const ayudoIa = this.calificacionSeleccionada;
      const comentariosAdicionales = this.comentarios;
      const mejoroIa = this.mejoroIaSeleccionada === 'Si';

      this.medicalReportService.submitFeedbackE(this.patientId, ayudoIa, mejoroIa, comentariosAdicionales)
        .subscribe(
          response => {
            this.dialogRef.close({ success: true });
            this.toastr.success('Encuesta enviada con éxito', 'Éxito');
          },
          error => {
            this.toastr.error('Hubo un error al enviar la Encuesta', 'Error');
            console.error('Error:', error);
          }
        );
    } else {
      this.toastr.warning('Por favor, complete todos los campos', 'Advertencia');
    }
  }
}
