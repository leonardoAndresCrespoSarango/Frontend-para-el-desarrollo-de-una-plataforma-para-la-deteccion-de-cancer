import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import {saveAs} from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class MedicalReportService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private loaderService: LoaderService) { }

  uploadFiles(formData: FormData): Observable<any> {
    this.loaderService.show();
    return this.http.post(`${this.apiUrl}/upload`, formData, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  predict(formData: any): Observable<any> {
    this.loaderService.show();
    return this.http.post(`${this.apiUrl}/predict`, formData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  getPredictions(): Observable<any[]> {
    this.loaderService.show();
    return this.http.get<any[]>(`${this.apiUrl}/predictions`, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  downloadVideo(predictionId: number): Observable<Blob> {
    this.loaderService.show();
    return this.http.get(`${this.apiUrl}/predictions/${predictionId}/video`, { responseType: 'blob', withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }


  getPatients(): Observable<any[]> {
    this.loaderService.show();
    return this.http.get<any[]>(`${this.apiUrl}/patients`, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }


  getDiagnostics(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/diagnostics/${patientId}`, { withCredentials: true });
  }
  generateDiagnosticPDF(diagnosticData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate-diagnostic-pdf`, diagnosticData, { withCredentials: true });
  }

  getDiagnostic(patientId: string): Observable<any> {
    this.loaderService.show();
    return this.http.get<any>(`${this.apiUrl}/get-diagnostic/${patientId}`, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  updateDiagnostic(data: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/update-diagnostic`, data, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }


  addPatient(patientData: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/add-patient`, patientData, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
  //PRUEBA DEL DELETE PACIENTE
  deletePatient(patientId: string): Observable<any> {
    this.loaderService.show();
    return this.http.delete<any>(`${this.apiUrl}/delete-patient/${patientId}`, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
  //FIN DELETE

  addDiagnostic(diagnosticData: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/add-diagnostic`, diagnosticData, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  generateIA(patientId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/predict-ia`, { patient_id: patientId }, { headers, withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
  predictIA(patientId: string): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/predict-ia`, { patient_id: patientId }, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
  submitFeedback(patientId: string, feedback: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit-feedback`, { patient_id: patientId, feedback }, { withCredentials: true });
  }

  sendReport(report: any): Observable<Blob> {
    this.loaderService.show();
    return this.http.post(`${this.apiUrl}/send-report`, report, { responseType: 'blob', withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
  downloadReport(patientId: string): Observable<Blob> {
    this.loaderService.show();
    return this.http.get(`${this.apiUrl}/download-report/${patientId}`, { responseType: 'blob', withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  saveReportToFile(patientId: string): void {
    this.loaderService.show();
    this.downloadReport(patientId).subscribe(blob => {
      saveAs(blob, `reporte_paciente_${patientId}.pdf`);
      this.loaderService.hide();
    }, error => {
      console.error('Error downloading report:', error);
      this.loaderService.hide();
    });
  }

  //leoanrdo
  predict6(patientId: string): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/generate-graph6`, { patient_id: patientId }, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
  predict3D(patientId: string): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/generate-graphDiagnostic`, { patient_id: patientId }, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
  predictSeg(patientId: string): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/generate-graphSegmentation`, { patient_id: patientId }, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  uploadFilesSegmentacion(formData: FormData): Observable<any> {
    this.loaderService.show();
    return this.http.post(`${this.apiUrl}/upload-segmentation`, formData, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
  ////////////////
  submitFeedbackE(patientId: string, ayudoIa: string, mejoroIa: boolean, comentariosAdicionales: string): Observable<any> {
    this.loaderService.show();

    const feedbackData = {
      ayudo_ia: ayudoIa,
      mejoro_ia: mejoroIa, // Agregar el nuevo campo aquí
      comentarios_adicionales: comentariosAdicionales

    };

    return this.http.post<any>(`${this.apiUrl}/submit-feedbackE/${patientId}`, feedbackData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
  //////////////////

  getPatientsWithDiagnostics(): Observable<any[]> {
    this.loaderService.show();
    return this.http.get<any[]>(`${this.apiUrl}/patients-with-diagnostics`, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  getPatientSurveyStatus(patientId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/survey-status/${patientId}`, { withCredentials: true });
  }

  updateSurveyStatus(patientId: string, status: boolean): Observable<any> {
    const data = { survey_completed: status };
    return this.http.put(`${this.apiUrl}/patients/${patientId}/survey-status`, data, {
      withCredentials: true // Asegúrate de incluir las cookies de sesión
    });
  }
  updateSurvey(patientId: string, status: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateSurvey/${patientId}`, { status }, {
      withCredentials: true
    });
  }




}
