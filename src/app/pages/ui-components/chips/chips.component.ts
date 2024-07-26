import { Component, OnInit } from '@angular/core';
import { MedicalReportService } from "../../../services/medical-resport-service.service";
import { ToastrService } from 'ngx-toastr';
import {AddPatientDialogComponent} from "../../../add-patient-dialog/add-patient-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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
    private dialog: MatDialog
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
    this.userService.getPatients().subscribe(
      (data) => {
        this.patients = data;
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  generateReport(predictionId: number): void {
    this.userService.downloadReport(predictionId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report_${predictionId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      this.toastr.success('Reporte generado exitosamente', 'Éxito');
    }, error => {
      console.error('Error generating report:', error);
      this.toastr.error('Error al generar el reporte', 'Error');
    });
  }

  diagnoseIA(predictionId: number): void {
    this.userService.downloadVideo(predictionId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diagnosis_${predictionId}.mp4`;
      a.click();
      window.URL.revokeObjectURL(url);
      this.toastr.success('Diagnóstico IA generado exitosamente', 'Éxito');
    }, error => {
      console.error('Error generating IA diagnosis:', error);
      this.toastr.error('Error al generar el diagnóstico IA', 'Error');
    });
  }

  addPatient(): void {
    const dialogRef = this.dialog.open(AddPatientDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.addPatient(result).subscribe(
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
}
