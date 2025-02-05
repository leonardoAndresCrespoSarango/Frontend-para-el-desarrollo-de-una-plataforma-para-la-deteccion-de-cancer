import { Component, OnInit } from '@angular/core';
import { MedicalReportService } from "../../../services/medical-resport-service.service";
import { ToastrService } from 'ngx-toastr';
import { AddPatientDialogComponent } from "../../../add-patient-dialog/add-patient-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AddDiagnosticDialogComponent } from "../../../add-diagnostic-dialog/add-diagnostic-dialog.component";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SurveyDialogComponent } from "../../survey-dialog/survey-dialog.component";
import { ConfirmDeleteDialogComponent } from "../confirm-delete-dialog/confirm-delete-dialog.component";

/**
 * Componente para la gestión de pacientes y diagnósticos en el sistema.
 * Permite visualizar pacientes, realizar predicciones de IA, agregar diagnósticos y encuestas.
 */
@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class AppChipsComponent implements OnInit {
  /** Lista de predicciones de IA */
  predictions: any[] = [];

  /** Lista completa de pacientes */
  patients: any[] = [];

  /** Lista filtrada de pacientes basada en el término de búsqueda */
  filteredPatients: any[] = [];

  /** Término de búsqueda para filtrar pacientes */
  searchTerm: string = '';

  /**
   * Constructor del componente.
   * @param userService Servicio para obtener predicciones de IA.
   * @param toastr Servicio para mostrar notificaciones en la interfaz.
   * @param dialog Servicio de Angular Material para manejar diálogos.
   * @param medicalReportService Servicio de reportes médicos.
   * @param router Servicio de enrutamiento.
   * @param medService Servicio para gestionar pacientes.
   */
  constructor(
    private userService: MedicalReportService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private medicalReportService: MedicalReportService,
    private router: Router,
    private medService: MedicalReportService
  ) {}

  /**
   * Método de inicialización del componente.
   * Se ejecuta cuando el componente es cargado y obtiene la lista de pacientes y predicciones.
   */
  ngOnInit(): void {
    this.fetchPredictions();
    this.fetchPatients();
  }

  /**
   * Obtiene la lista de predicciones de IA desde el servidor.
   */
  fetchPredictions(): void {
    this.userService.getPredictions().subscribe(
      (data) => {
        this.predictions = data;
      },
      (error) => {
        console.error('Error fetching predictions:', error);
      }
    );
  }

  /**
   * Obtiene la lista de pacientes registrados y sus estados diagnósticos.
   */
  fetchPatients(): void {
    this.medService.getPatients().subscribe(
      (patients: any[]) => {
        this.patients = patients.map(patient => ({
          ...patient,
          diagnosticStatus: patient.is_generated ? 'Generado' : 'No generado',
          cancer_status: patient.cancer_status,
          survey_completed: !!patient.survey_completed
        }));
        this.filteredPatients = [...this.patients];
      },
      (error) => {
        console.error('Error fetching patients:', error);
        this.toastr.error('Error al cargar los pacientes', 'Error');
      }
    );
  }

  /**
   * Agrega un nuevo paciente a la base de datos.
   * Abre un diálogo para ingresar los datos del paciente.
   */
  addPatient(): void {
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medService.addPatient(result).subscribe(
          () => {
            this.toastr.success('Paciente agregado exitosamente', 'Éxito');
            this.fetchPatients();
          },
          (error) => {
            console.error('Error adding patient:', error);
            this.toastr.error('Error al agregar el paciente', 'Error');
          }
        );
      }
    });
  }

  /**
   * Redirige al usuario a la página de diagnóstico para un paciente seleccionado.
   * @param patient Datos del paciente.
   */
  addDiagnostic(patient: any): void {
    this.router.navigate(['/diagnostico'], {
      queryParams: {
        patient_id: patient.patient_id,
      },
    });
  }

  /**
   * Aplica un filtro a la lista de pacientes basado en el término de búsqueda.
   */
  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPatients = this.patients.filter(patient =>
      patient.patient_id.toLowerCase().includes(term) ||
      patient.numero_historia_clinica.toLowerCase().includes(term)
    );
  }

  /**
   * Abre un diálogo para completar una encuesta sobre la IA.
   * @param patient Datos del paciente que realiza la encuesta.
   */
  openSurveyDialog(patient: any): void {
    const dialogRef = this.dialog.open(SurveyDialogComponent, {
      width: '600px',
      data: { patientId: patient.patient_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        patient.survey_completed = true;
        this.medService.updateSurveyStatus(patient.patient_id, true).subscribe(
          () => {
            this.toastr.success('Encuesta completada exitosamente', 'Éxito');
          },
          (error) => {
            console.error('Error updating survey status:', error);
            this.toastr.error('Error al actualizar estado de encuesta', 'Error');
          }
        );
      } else {
        this.toastr.info('Encuesta cancelada', 'Info');
      }
    });
  }

  /**
   * Muestra el reporte médico de un paciente en formato PDF.
   * @param reportPath Ruta del reporte en el servidor.
   */
  viewReport(reportPath: string): void {
    if (!reportPath) {
      this.toastr.error('El reporte no está disponible.', 'Error');
      return;
    }

    const baseUrl = 'http://localhost:5000';
    const reportUrl = `${baseUrl}/${reportPath}.pdf`;
    window.open(reportUrl, '_blank');
  }

  /**
   * Redirige al usuario a la sección de segmentación de imágenes para un paciente.
   * @param patient Datos del paciente.
   */
  addSegmentacion(patient: any): void {
    this.router.navigate(['/comparison'], {
      queryParams: {
        patient_id: patient.patient_id,
      },
    });
  }

  /**
   * Elimina un paciente del sistema después de una confirmación en diálogo.
   * @param patientId ID del paciente a eliminar.
   */
  deletePatient(patientId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '400px',
      height: '170px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medService.deletePatient(patientId).subscribe(
          () => {
            this.toastr.success('Paciente eliminado exitosamente', 'Éxito');
            this.fetchPatients();
          },
          (error) => {
            console.error('Error eliminando paciente:', error);
            this.toastr.error('Error al eliminar el paciente', 'Error');
          }
        );
      }
    });
  }
}
