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
    const dialogRef = this.dialog.open(AddDiagnosticDialogComponent, {
      data: {
        patient_id: patient.patient_id,
        patient_name: patient.patient_name,
        patient_age: patient.patient_age,
        patient_gender: patient.patient_gender
      },
      panelClass: 'custom-dialog-container', // Clase personalizada para el diálogo
      width: '90vw', // 90% del ancho de la ventana
      height: '90vh', // 90% del alto de la ventana

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.medService.addDiagnostic(result).subscribe(
          () => {
            console.log('Diagnostic added successfully');
          },
          (error) => {
            console.error('Error adding diagnostic:', error);
          }
        );
      }
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

}
