import { Component, OnInit } from '@angular/core';
import { MedicalReportService } from "../../services/medical-resport-service.service";

/**
 * Componente que genera un histograma basado en los datos de encuesta sobre si la IA mejoró el diagnóstico.
 */
@Component({
  selector: 'app-histograma',
  templateUrl: './histograma.component.html',
  styleUrls: ['./histograma.component.scss']
})
export class HistogramaComponent implements OnInit {
  /** Valores de respuestas de la encuesta sobre si la IA mejoró el diagnóstico */
  mejoroIaValues: any[] = [];

  /** Configuración del gráfico de barras */
  chartOptions: any;

  /** Respuestas posibles en la encuesta */
  readonly allResponses = ['true', 'false'];

  /**
   * Constructor del componente.
   * @param surveyService Servicio que maneja la obtención de datos de la encuesta.
   */
  constructor(private surveyService: MedicalReportService) {}

  /**
   * Inicializa el componente cargando los datos de la encuesta.
   */
  ngOnInit() {
    this.loadSurveyData();
  }

  /**
   * Carga los datos de la encuesta sobre si la IA mejoró el diagnóstico.
   */
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

  /**
   * Genera un histograma basado en los datos de la encuesta.
   * @param values Valores obtenidos de la encuesta.
   */
  createHistogram(values: any[]) {
    const counts: Record<string, number> = values.reduce((acc, curr) => {
      const key = String(curr); // Convertir explícitamente a string
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const allCounts = this.allResponses.map(response => counts[response] || 0);

    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 550 // Ajuste de altura para mejor visualización
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
