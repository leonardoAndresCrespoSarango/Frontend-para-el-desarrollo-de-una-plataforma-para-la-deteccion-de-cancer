import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { saveAs } from "file-saver";

/**
 * Servicio para gestionar reportes médicos y operaciones relacionadas.
 */
@Injectable({
  providedIn: 'root'
})
export class MedicalReportService {
  /**
   * URL base de la API.
   * @private
   * @type {string}
   */
  private apiUrl = 'http://localhost:5000';

  /**
   * Crea una instancia del servicio.
   *
   * @param {HttpClient} http - Cliente HTTP para realizar peticiones.
   * @param {LoaderService} loaderService - Servicio para gestionar el loader (spinner de carga).
   */
  constructor(private http: HttpClient, private loaderService: LoaderService) { }

  /**
   * Sube archivos al servidor.
   *
   * @param {FormData} formData - Datos del formulario que contienen los archivos.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  uploadFiles(formData: FormData): Observable<any> {
    this.loaderService.show();
    return this.http.post(`${this.apiUrl}/upload`, formData, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Envía datos para realizar una predicción.
   *
   * @param {any} formData - Datos para la predicción.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  predict(formData: any): Observable<any> {
    this.loaderService.show();
    return this.http.post(`${this.apiUrl}/predict`, formData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Obtiene la lista de predicciones.
   *
   * @returns {Observable<any[]>} Observable con un arreglo de predicciones.
   */
  getPredictions(): Observable<any[]> {
    this.loaderService.show();
    return this.http.get<any[]>(`${this.apiUrl}/predictions`, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Descarga el video asociado a una predicción.
   *
   * @param {number} predictionId - ID de la predicción.
   * @returns {Observable<Blob>} Observable con el blob del video.
   */
  downloadVideo(predictionId: number): Observable<Blob> {
    this.loaderService.show();
    return this.http.get(`${this.apiUrl}/predictions/${predictionId}/video`, { responseType: 'blob', withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Obtiene la lista de pacientes.
   *
   * @returns {Observable<any[]>} Observable con un arreglo de pacientes.
   */
  getPatients(): Observable<any[]> {
    this.loaderService.show();
    return this.http.get<any[]>(`${this.apiUrl}/patients`, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Obtiene los diagnósticos de un paciente.
   *
   * @param {string} patientId - ID del paciente.
   * @returns {Observable<any[]>} Observable con un arreglo de diagnósticos.
   */
  getDiagnostics(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/diagnostics/${patientId}`, { withCredentials: true });
  }

  /**
   * Genera un PDF a partir de los datos del diagnóstico.
   *
   * @param {any} diagnosticData - Datos del diagnóstico.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  generateDiagnosticPDF(diagnosticData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/generate-diagnostic-pdf`, diagnosticData, { withCredentials: true });
  }

  /**
   * Obtiene el diagnóstico de un paciente.
   *
   * @param {string} patientId - ID del paciente.
   * @returns {Observable<any>} Observable con el diagnóstico del paciente.
   */
  getDiagnostic(patientId: string): Observable<any> {
    this.loaderService.show();
    return this.http.get<any>(`${this.apiUrl}/get-diagnostic/${patientId}`, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Actualiza el diagnóstico de un paciente.
   *
   * @param {any} data - Datos actualizados del diagnóstico.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  updateDiagnostic(data: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/update-diagnostic`, data, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Agrega un nuevo paciente.
   *
   * @param {any} patientData - Datos del paciente.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  addPatient(patientData: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/add-patient`, patientData, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Elimina un paciente.
   *
   * @param {string} patientId - ID del paciente a eliminar.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  deletePatient(patientId: string): Observable<any> {
    this.loaderService.show();
    return this.http.delete<any>(`${this.apiUrl}/delete-patient/${patientId}`, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Agrega un nuevo diagnóstico.
   *
   * @param {any} diagnosticData - Datos del diagnóstico.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  addDiagnostic(diagnosticData: any): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/add-diagnostic`, diagnosticData, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Genera una predicción basada en IA para un paciente.
   *
   * @param {string} patientId - ID del paciente.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  generateIA(patientId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/predict-ia`, { patient_id: patientId }, { headers, withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Realiza una predicción basada en IA para un paciente.
   *
   * @param {string} patientId - ID del paciente.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  predictIA(patientId: string): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/predict-ia`, { patient_id: patientId }, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Envía retroalimentación para un paciente.
   *
   * @param {string} patientId - ID del paciente.
   * @param {any} feedback - Datos de la retroalimentación.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  submitFeedback(patientId: string, feedback: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit-feedback`, { patient_id: patientId, feedback }, { withCredentials: true });
  }

  /**
   * Envía un reporte al servidor.
   *
   * @param {any} report - Datos del reporte.
   * @returns {Observable<Blob>} Observable con el blob del reporte.
   */
  sendReport(report: any): Observable<Blob> {
    this.loaderService.show();
    return this.http.post(`${this.apiUrl}/send-report`, report, { responseType: 'blob', withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Descarga el reporte de un paciente.
   *
   * @param {string} patientId - ID del paciente.
   * @returns {Observable<Blob>} Observable con el blob del reporte.
   */
  downloadReport(patientId: string): Observable<Blob> {
    this.loaderService.show();
    return this.http.get(`${this.apiUrl}/download-report/${patientId}`, { responseType: 'blob', withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Descarga y guarda el reporte de un paciente en un archivo PDF.
   *
   * @param {string} patientId - ID del paciente.
   */
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

  /**
   * Genera un gráfico de tipo 6 para un paciente.
   *
   * @param {string} patientId - ID del paciente.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  predict6(patientId: string): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/generate-graph6`, { patient_id: patientId }, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Genera un gráfico 3D de diagnóstico para un paciente.
   *
   * @param {string} patientId - ID del paciente.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  predict3D(patientId: string): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/generate-graphDiagnostic`, { patient_id: patientId }, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Genera un gráfico de segmentación para un paciente.
   *
   * @param {string} patientId - ID del paciente.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  predictSeg(patientId: string): Observable<any> {
    this.loaderService.show();
    return this.http.post<any>(`${this.apiUrl}/generate-graphSegmentation`, { patient_id: patientId }, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Sube archivos de segmentación al servidor.
   *
   * @param {FormData} formData - Datos del formulario que contienen los archivos de segmentación.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  uploadFilesSegmentacion(formData: FormData): Observable<any> {
    this.loaderService.show();
    return this.http.post(`${this.apiUrl}/upload-segmentation`, formData, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Obtiene la lista de pacientes junto con sus diagnósticos.
   *
   * @returns {Observable<any[]>} Observable con un arreglo de pacientes y sus diagnósticos.
   */
  getPatientsWithDiagnostics(): Observable<any[]> {
    this.loaderService.show();
    return this.http.get<any[]>(`${this.apiUrl}/patients-with-diagnostics`, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }

  /**
   * Obtiene el estado de la encuesta de un paciente.
   *
   * @param {string} patientId - ID del paciente.
   * @returns {Observable<boolean>} Observable con el estado de la encuesta.
   */
  getPatientSurveyStatus(patientId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/survey-status/${patientId}`, { withCredentials: true });
  }

  /**
   * Actualiza el estado de la encuesta de un paciente.
   *
   * @param {string} patientId - ID del paciente.
   * @param {boolean} status - Nuevo estado de la encuesta.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  updateSurveyStatus(patientId: string, status: boolean): Observable<any> {
    const data = { survey_completed: status };
    return this.http.put(`${this.apiUrl}/patients/${patientId}/survey-status`, data, {
      withCredentials: true
    });
  }

  /**
   * Actualiza el estado de la encuesta de un paciente.
   *
   * @param {string} patientId - ID del paciente.
   * @param {boolean} status - Nuevo estado de la encuesta.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  updateSurvey(patientId: string, status: boolean): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateSurvey/${patientId}`, { status }, {
      withCredentials: true
    });
  }

  /**
   * Obtiene los datos de la encuesta.
   *
   * @returns {Observable<any>} Observable con los datos de la encuesta.
   */
  getSurveyData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/survey-data`, { withCredentials: true });
  }

  /**
   * Obtiene los datos de la encuesta relacionados con la mejora de la IA.
   *
   * @returns {Observable<any>} Observable con los datos de la encuesta.
   */
  getSurveyDataMejoroIA(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/surveymejoro-data`, { withCredentials: true });
  }

  /**
   * Envía retroalimentación extendida para evaluar el impacto de la IA.
   *
   * @param {string} patientId - ID del paciente.
   * @param {string} ayudoIa - Indica si la IA ayudó.
   * @param {boolean} mejoroIa - Indica si la IA mejoró.
   * @param {string} comentariosAdicionales - Comentarios adicionales.
   * @returns {Observable<any>} Observable con la respuesta del servidor.
   */
  submitFeedbackE(patientId: string, ayudoIa: string, mejoroIa: boolean, comentariosAdicionales: string): Observable<any> {
    this.loaderService.show();

    const feedbackData = {
      ayudo_ia: ayudoIa,
      mejoro_ia: mejoroIa,
      comentarios_adicionales: comentariosAdicionales
    };

    return this.http.post<any>(`${this.apiUrl}/submit-feedbackE/${patientId}`, feedbackData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
