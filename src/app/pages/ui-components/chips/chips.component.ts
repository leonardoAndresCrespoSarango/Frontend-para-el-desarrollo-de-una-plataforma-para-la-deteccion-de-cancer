import { Component, OnInit } from '@angular/core';
import { MedicalReportService } from "../../../services/medical-resport-service.service";
import { ToastrService } from 'ngx-toastr';
import {AddPatientDialogComponent} from "../../../add-patient-dialog/add-patient-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AddDiagnosticDialogComponent} from "../../../add-diagnostic-dialog/add-diagnostic-dialog.component";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

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
    this.medService.getPatientsWithDiagnostics().subscribe(
      (data) => {
        this.patients = data.map(patient => ({
          ...patient,
          diagnosticStatus: patient.is_generated ? 'Generado' : 'No generado'
        }));
        this.filteredPatients = [...this.patients]; // Inicializar lista filtrada
      },
      (error) => {
        console.error('Error fetching patients with diagnostics:', error);
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

}
