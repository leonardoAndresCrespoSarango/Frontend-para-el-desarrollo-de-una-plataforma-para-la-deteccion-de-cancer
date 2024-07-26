import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

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

  downloadReport(predictionId: number): Observable<Blob> {
    this.loaderService.show();
    return this.http.get(`${this.apiUrl}/predictions/${predictionId}/report`, { responseType: 'blob', withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
  addPatient(patientData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add-patient`, patientData, { withCredentials: true });
  }
  getPatients(): Observable<any[]> {
    this.loaderService.show();
    return this.http.get<any[]>(`${this.apiUrl}/patients`, { withCredentials: true }).pipe(
      finalize(() => this.loaderService.hide())
    );
  }
}
