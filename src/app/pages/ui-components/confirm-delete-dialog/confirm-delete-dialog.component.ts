import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-dialog',
  styleUrls: ['./confirm-delete-dialog.component.scss'],
  standalone: true,
  templateUrl: './confirm-delete-dialog.component.html', // Enlazamos al archivo HTML
})
export class ConfirmDeleteDialogComponent {

  constructor(private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false); // No elimina
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Elimina
  }
}
