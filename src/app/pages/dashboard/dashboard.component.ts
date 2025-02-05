import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MedicalReportService } from "../../services/medical-resport-service.service";

/**
 * Componente del dashboard de la aplicación.
 * Muestra gráficos y estadísticas basadas en las respuestas de encuestas sobre el desempeño de la IA en el diagnóstico médico.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit {
  /** Valores de respuestas sobre si la IA mejoró el diagnóstico */
  mejoroIaValues: any[] = [];

  /** Configuración del gráfico de respuestas sobre la mejora de diagnóstico por IA */
  chartOptionsMIA: any;

  /** Valores de respuestas sobre si la IA ayudó en el diagnóstico */
  ayudoIaValues: any[] = [];

  /** Configuración del gráfico de respuestas sobre la ayuda de la IA en el diagnóstico */
  chartOptions: any;

  /** Opciones de respuestas para encuestas */
  readonly allResponses = [
    'Completamente de acuerdo',
    'De acuerdo',
    'Neutral',
    'En desacuerdo',
    'Completamente en desacuerdo',
    'Desconozco'
  ];

  /** Etiquetas cortas para las respuestas de la encuesta */
  readonly shortLabels = [
    'Comp. de acuerdo',
    'De acuerdo',
    'Neutral',
    'En desacuerdo',
    'Comp. desacuerdo',
    'Desconozco'
  ];

  /** Opciones de respuestas para encuestas sobre si la IA mejoró el diagnóstico */
  readonly allResponsesMIA = ['true', 'false'];

  /** Etiquetas cortas para respuestas sobre si la IA mejoró el diagnóstico */
  readonly shortLabelsMIA = ['Sí', 'No'];

  /**
   * Constructor del componente.
   * @param surveyService Servicio que maneja la recuperación de datos de encuestas.
   */
  constructor(private surveyService: MedicalReportService) {}

  /**
   * Inicializa el componente cargando los datos de las encuestas.
   */
  ngOnInit(): void {
    this.loadSurveyData();
    this.loadSurveyDataMIA();
  }

  /**
   * Carga los datos de la encuesta sobre si la IA ayudó en el diagnóstico.
   */
  loadSurveyData() {
    this.surveyService.getSurveyData().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        if (data && Array.isArray(data.ayudo_ia)) {
          this.ayudoIaValues = data.ayudo_ia;
          this.createHistogram(this.ayudoIaValues);
        }
      },
      (error) => console.error('Error:', error)
    );
  }

  /**
   * Genera el histograma basado en los datos de la encuesta sobre si la IA ayudó en el diagnóstico.
   * @param values Valores obtenidos de la encuesta.
   */
  createHistogram(values: any[]) {
    const counts: Record<string, number> = values.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    const allCounts = this.allResponses.map(response => counts[response] || 0);

    this.chartOptions = {
      chart: {
        type: 'bar',
        height: 550
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
        categories: this.shortLabels,
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
        data: allCounts,
        color: '#9a12e3'
      }],
      colors: ['#9a12e3']
    };
  }

  /**
   * Carga los datos de la encuesta sobre si la IA mejoró el diagnóstico.
   */
  loadSurveyDataMIA() {
    this.surveyService.getSurveyDataMejoroIA().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        if (data && Array.isArray(data.mejoro_ia)) {
          this.mejoroIaValues = data.mejoro_ia;
          this.createHistogramMIA(this.mejoroIaValues);
        }
      },
      (error) => console.error('Error:', error)
    );
  }

  /**
   * Genera el histograma basado en los datos de la encuesta sobre si la IA mejoró el diagnóstico.
   * @param values Valores obtenidos de la encuesta.
   */
  createHistogramMIA(values: any[]) {
    const counts: Record<string, number> = values.reduce((acc, curr) => {
      const key = String(curr).trim().toLowerCase();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const allCounts = this.allResponsesMIA.map(response => counts[response] || 0);

    this.chartOptionsMIA = {
      chart: {
        type: 'bar',
        height: 464
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '17%'
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: this.shortLabelsMIA,
        labels: {
          style: {
            fontSize: '10px',
            fontWeight: 'bold'
          },
          offsetY: 0,
          maxWidth: 80
        }
      },
      tooltip: {
        enabled: true
      },
      series: [{
        name: "Respuestas",
        data: allCounts,
        color: '#e312d9'
      }]
    };
  }
}
