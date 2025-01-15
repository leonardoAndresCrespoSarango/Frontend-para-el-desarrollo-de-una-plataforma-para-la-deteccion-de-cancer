import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-refuerzo',
  templateUrl: './refuerzo.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./refuerzo.component.scss']
})
export class RefuerzoComponent {

  // Pregunta1
  calificarApp = ['Afirmo', 'Necesita optimización'];
  calificacionSeleccionada = '';

  // Pregunta2
  utilidadNiveles = ['Muy útil', 'Útil', 'Regular', 'Poco útil'];
  utilidadSeleccionada = '';

  // Pregunta3
  nivelesPrecision = ['Muy Preciso', 'Preciso', 'Regular', 'Poco Preciso'];
  precisionSeleccionada = '';

  // Pregunta4
  comparacionNiveles = ['Más efectivo', 'Similar','Menos adecuado'];
  comparacionSeleccionada = '';

  // Pregunta5
  confiabilidadNiveles = ['Muy confiable', 'Confiable', 'Regular', 'Poco confiable'];
  confiabilidadSeleccionada = '';

  // Pregunta6
  aspectosCumplidos = [
    { nombre: 'La segmentación fue precisa', seleccionado: false },
    { nombre: 'La interfaz es intuitiva', seleccionado: false },
    { nombre: 'Las modalidades de MRI son claras', seleccionado: false },
    { nombre: 'El tiempo de predicción fue adecuado', seleccionado: false }
  ];

  // Pregunta 7
  comentarios = '';

  // Método para enviar los datos
  enviarFormulario() {
    if (!this.calificacionSeleccionada || !this.utilidadSeleccionada || !this.precisionSeleccionada ||
      !this.comparacionSeleccionada || !this.confiabilidadSeleccionada|| !this.confiabilidadSeleccionada) {
      alert('Por favor complete todas las preguntas.');
      return;
    }
    const retroalimentacion = {
      aspectosCumplidos: this.aspectosCumplidos.filter(a => a.seleccionado).map(a => a.nombre),
      precisionSeleccionada: this.precisionSeleccionada,
      comentarios: this.comentarios
    };
    console.log('Retroalimentación enviada:', retroalimentacion);
    alert('¡Gracias por tu retroalimentación!');
  }

}
