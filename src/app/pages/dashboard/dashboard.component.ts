import {Component, ViewEncapsulation, ViewChild, OnInit} from '@angular/core';

import {MedicalReportService} from "../../services/medical-resport-service.service";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

  encapsulation: ViewEncapsulation.None,
})
export class AppDashboardComponent implements OnInit{
  mejoroIaValues: any[] = [];
  chartOptionsMIA: any;

  ayudoIaValues: any[] = [];
  chartOptions: any;

  readonly allResponses = [
    'Completamente de acuerdo',
    'De acuerdo',
    'Neutral',
    'En desacuerdo',
    'Completamente en desacuerdo',
    'Desconozco'
  ];

  readonly shortLabels = [
    'Comp. de acuerdo',
    'De acuerdo',
    'Neutral',
    'En desacuerdo',
    'Comp. desacuerdo',
    'Desconozco'
  ];
  readonly allResponsesMIA = [
    'true', 'false'
  ];
  readonly shortLabelsMIA = [
  'Si', 'No'
  ];

  constructor(private surveyService: MedicalReportService) {}

  ngOnInit(): void {
    this.loadSurveyData();
    this.loadSurveyDataMIA();
    }


  //INICIO DEL METODO PARA EL HISTOGRAMA DE SI PREDIJO BIEN LA IA

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
        color: '#9a12e3' // Color rojo para todas las barras
      }],
      colors: ['#9a12e3'] // Color rojo para todas las barras
    };
  }

  //FIN DEL METODO PARA EL HISTOGRAMA DE SI PREDIJO BIEN LA IA

  //INICIO DEL METODO PARA EL HISTOGRAMA DE SI MEJORO EL DIAGNOSTICO
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
  createHistogramMIA(values: any[]) {
    const counts: Record<string, number> = values.reduce((acc, curr) => {
      const key = String(curr).trim().toLowerCase(); // Normaliza a lowercase y sin espacios
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});


    const allCounts = this.allResponsesMIA.map(response => counts[response] || 0);

    this.chartOptionsMIA = {
      chart: {
        type: 'bar',
        height: 464 // Aumentamos la altura para más espacio
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
          //rotate: -90,
          //rotateAlways: true,  // Forzar rotación

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
        color: '#e312d9' // Color rojo para todas las barras
      }]
    };
  }
  //FIN DEL METODO PARA EL HISTOGRAMA DE SI MEJORO EL DIAGNOSTICO

}
