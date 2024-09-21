import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppModule} from "../app.module";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-diagnostic-ia',
  standalone: true,
  imports: [
    AppModule,
    NgIf
  ],
  templateUrl: './diagnostic-ia.component.html',
  styleUrl: './diagnostic-ia.component.scss'
})
export class DiagnosticIaComponent implements OnInit {
  patientId: string = '';
  videoUrl: string = '';
  pdfUrl: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.patientId = params['patient_id'] || '';
      this.videoUrl = params['video_url'] || '';
      this.pdfUrl = params['pdf_url'] || '';
    });
  }

  onEdit(): void {
    // Lógica para editar el diagnóstico
    console.log('Edit diagnostic clicked');
  }
}
