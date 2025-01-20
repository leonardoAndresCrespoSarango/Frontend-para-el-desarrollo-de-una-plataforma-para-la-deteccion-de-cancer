import { Component, OnInit } from '@angular/core';
import { MedicalReportService } from "../../../services/medical-resport-service.service";
import { ToastrService } from 'ngx-toastr';
import {AddPatientDialogComponent} from "../../../add-patient-dialog/add-patient-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddDiagnosticDialogComponent} from "../../../add-diagnostic-dialog/add-diagnostic-dialog.component";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SurveyDialogComponent} from "../../survey-dialog/survey-dialog.component";





@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class AppChipsComponent implements OnInit {
  predictions: any[] = [];
  patients: any[] = [];
  filteredPatients: any[] = [];
  searchTerm: string = '';
  constructor(
    private userService: MedicalReportService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private medicalReportService: MedicalReportService,
    private router: Router,
    private medService: MedicalReportService // Asegúrate de inyectar UserService aquí
  ) {}

  ngOnInit(): void {
    this.fetchPredictions();
    this.fetchPatients();
  }

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

  fetchPatients(): void {
    this.medService.getPatients().subscribe(
      (patients: any[]) => {
        this.patients = patients.map(patient => ({
          ...patient,
          survey_completed: !!patient.survey_completed // Asegúrate de que survey_completed sea booleano
        }));
        this.filteredPatients = [...this.patients]; // Actualizar la lista filtrada
      },
      (error) => {
        console.error('Error fetching patients:', error);
        this.toastr.error('Error al cargar los pacientes', 'Error');
      }
    );
  }






  addPatient(): void {
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medService.addPatient(result).subscribe(
          (response) => {
            this.toastr.success('Paciente agregado exitosamente', 'Éxito');
            this.fetchPatients();  // Actualizar la lista de pacientes después de agregar uno nuevo
          },
          (error) => {
            console.error('Error adding patient:', error);
            this.toastr.error('Error al agregar el paciente', 'Error');
          }
        );
      }
    });
  }

  addDiagnostic(patient: any): void {
    this.router.navigate(['/diagnostico'], {
      queryParams: {
        patient_id: patient.patient_id,
      },
    });
  }




  onGenerateIA(patientId: string): void {
    this.userService.predictIA(patientId).subscribe((response: any) => {
      this.router.navigate(['ui-components/lists', {
        patient_id: patientId,
        html_url1: response.html_url1,
        html_url2: response.html_url2,
        html_url3: response.html_url3,
        html_url4: response.html_url4,
        html_url5: response.html_url5,
        html_url6: response.html_url6,
        report_text2: response.report_text2,
        report_text5: response.report_text5
      }]);
    }, error => {
      console.error('Error during prediction:', error);
      this.toastr.error('Error during prediction', 'Error');
    });
  }
  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPatients = this.patients.filter(patient =>
      patient.patient_id.toLowerCase().includes(term) ||
      patient.numero_historia_clinica.toLowerCase().includes(term)
    );
  }

  openSurveyDialog(patient: any): void {
    const dialogRef = this.dialog.open(SurveyDialogComponent, {
      width: '400px',
      data: { patientId: patient.patient_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        patient.survey_completed = true;  // Marca la encuesta como completada

        // Bloquear el botón de la encuesta para este paciente
        const index = this.patients.findIndex(p => p.patient_id === patient.patient_id);
        if (index !== -1) {
          this.patients[index].survey_completed = true; // Marca el estado de encuesta como completado
          this.filteredPatients = [...this.patients];  // Actualiza la lista filtrada
        }

        this.medService.updateSurveyStatus(patient.patient_id, true).subscribe(
          (response) => {
            this.toastr.success('Encuesta completada exitosamente', 'Éxito');
            // Aquí puedes realizar cualquier otra acción si es necesario.
          },
          (error) => {
            console.error('Error updating survey status:', error);
            this.toastr.error('Error al actualizar estado de encuesta', 'Error');
          }
        );
      } else {
        // Acción si la encuesta no se completó
        // this.toastr.info('Encuesta cancelada', 'Info');
      }
    });
  }

}
