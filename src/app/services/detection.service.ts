import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DetectionService {
  private baseURL = 'http://localhost:5000/detection-ai';
  constructor(private http: HttpClient) { }

  detectionC(patientId: string): Observable<any> {
    const requestBody = { patient_id: patientId };

    return this.http.post<any>(this.baseURL, requestBody);
  }
}
