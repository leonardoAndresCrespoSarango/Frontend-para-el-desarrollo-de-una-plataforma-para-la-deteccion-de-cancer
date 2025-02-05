import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/**
 * Componente de diálogo de confirmación para eliminar un paciente u otro elemento del sistema.
 * Presenta al usuario la opción de confirmar o cancelar la acción de eliminación.
 */
@Component({
  selector: 'app-confirm-delete-dialog',
  styleUrls: ['./confirm-delete-dialog.component.scss'],
  standalone: true,
  templateUrl: './confirm-delete-dialog.component.html',
})
export class ConfirmDeleteDialogComponent {

  /**
   * Constructor del componente.
   * @param dialogRef Referencia al diálogo de Angular Material, utilizado para cerrar el diálogo y devolver la respuesta del usuario.
   */
  constructor(private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>) {}

  /**
   * Cancela la eliminación y cierra el diálogo.
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }

  /**
   * Confirma la eliminación y cierra el diálogo con un valor de `true`.
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
