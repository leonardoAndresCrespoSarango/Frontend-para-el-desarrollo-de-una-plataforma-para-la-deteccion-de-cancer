import { Component, OnInit } from '@angular/core';
import { MedicalReportService } from "../../services/medical-resport-service.service";

@Component({
  selector: 'app-histograma',
  templateUrl: './histograma.component.html',
  styleUrls: ['./histograma.component.scss']
})
export class HistogramaComponent implements OnInit {
  mejoroIaValues: any[] = [];
  chartOptions: any;

  readonly allResponses = [
    'true', 'false'
  ];

  constructor(private surveyService: MedicalReportService) {}

  ngOnInit() {
    this.loadSurveyData();
  }

  loadSurveyData() {
    this.surveyService.getSurveyDataMejoroIA().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);

        if (data && Array.isArray(data.mejoro_ia)) {
          this.mejoroIaValues = data.mejoro_ia;
          this.createHistogram(this.mejoroIaValues);
        }
      },
      (error) => console.error('Error:', error)
    );
  }

  createHistogram(values: any[]) {
    const counts: Record<string, number> = values.reduce((acc, curr) => {
      const key = String(curr); // Convertir explícitamente a string

      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    const allCounts = this.allResponses.map(response => counts[response] || 0);

    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 550 // Aumentamos la altura para más espacio
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%'
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: this.allResponses,
        labels: {
          style: {
            fontSize: '10px',
            fontWeight: 'bold'
          },
          rotate: -90,
          offsetY: 5,
          maxWidth: 80
        }
      },
      tooltip: {
        enabled: true
      },
      series: [{
        name: "Respuestas",
        data: allCounts
      }]
    };
  }
}
