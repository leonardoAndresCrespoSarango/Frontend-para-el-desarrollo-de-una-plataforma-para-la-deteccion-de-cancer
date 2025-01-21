import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiagnosticService {
  private diagnosticDataSubject = new BehaviorSubject<any[]>([]); // Lista inicial vacía
  public diagnosticData$ = this.diagnosticDataSubject.asObservable();

  // Actualiza los datos de diagnóstico
  updateDiagnosticData(data: any[]): void {
    this.diagnosticDataSubject.next(data);
  }

  // Añade un nuevo diagnóstico a la lista
  addDiagnostic(diagnostic: any): void {
    const currentData = this.diagnosticDataSubject.getValue();
    this.diagnosticDataSubject.next([...currentData, diagnostic]);
  }

  // Obtiene los datos actuales
  getDiagnosticData(): any[] {
    return this.diagnosticDataSubject.getValue();
  }
}
