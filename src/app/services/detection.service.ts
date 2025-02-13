import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetectionService {
  private baseURL = 'http://localhost:5000/detection-ai';
  private baseURL2 = 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  detectionC(patientId: string): Observable<any> {
    const requestBody = { patient_id: patientId };

    return this.http.post<any>(this.baseURL, requestBody);
  }

  getDiagnostico(patientId: string): Observable<{ cancer_status: string | null, cancer_prediction: number | null }> {
    return this.http.get<{ cancer_status: string | null, cancer_prediction: number | null }>(
      `${this.baseURL2}/get-diagnosticos?patient_id=${patientId}`
    );
  }


}
