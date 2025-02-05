import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

/**
 * Componente de encuesta de refuerzo.
 * Permite a los usuarios evaluar la precisión, utilidad y confiabilidad de la aplicación.
 */
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
  /** Opciones para calificar la aplicación */
  calificarApp = ['Afirmo', 'Necesita optimización'];
  /** Opción seleccionada para la calificación de la aplicación */
  calificacionSeleccionada = '';

  /** Opciones sobre la utilidad de los niveles */
  utilidadNiveles = ['Muy útil', 'Útil', 'Regular', 'Poco útil'];
  /** Opción seleccionada sobre la utilidad */
  utilidadSeleccionada = '';

  /** Opciones sobre la precisión del sistema */
  nivelesPrecision = ['Muy Preciso', 'Preciso', 'Regular', 'Poco Preciso'];
  /** Opción seleccionada sobre la precisión */
  precisionSeleccionada = '';

  /** Opciones de comparación con otros métodos */
  comparacionNiveles = ['Más efectivo', 'Similar','Menos adecuado'];
  /** Opción seleccionada sobre la comparación */
  comparacionSeleccionada = '';

  /** Opciones sobre la confiabilidad del sistema */
  confiabilidadNiveles = ['Muy confiable', 'Confiable', 'Regular', 'Poco confiable'];
  /** Opción seleccionada sobre la confiabilidad */
  confiabilidadSeleccionada = '';

  /** Lista de aspectos que los usuarios pueden marcar como cumplidos */
  aspectosCumplidos = [
    { nombre: 'La segmentación fue precisa', seleccionado: false },
    { nombre: 'La interfaz es intuitiva', seleccionado: false },
    { nombre: 'Las modalidades de MRI son claras', seleccionado: false },
    { nombre: 'El tiempo de predicción fue adecuado', seleccionado: false }
  ];

  /** Comentarios adicionales del usuario */
  comentarios = '';

  /**
   * Método para enviar los datos de la encuesta de refuerzo.
   * Valida que todas las preguntas obligatorias sean respondidas antes de enviar.
   */
  enviarFormulario() {
    if (!this.calificacionSeleccionada || !this.utilidadSeleccionada || !this.precisionSeleccionada ||
      !this.comparacionSeleccionada || !this.confiabilidadSeleccionada) {
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
