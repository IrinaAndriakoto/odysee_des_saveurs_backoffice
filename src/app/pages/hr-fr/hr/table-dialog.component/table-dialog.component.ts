import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
  
@Component({
  selector: 'app-table-dialog.component',
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './table-dialog.component.html',
  styleUrl: './table-dialog.component.css'
})
export class TableDialogComponent {
  form: any = {};

    constructor(
      public dialogRef: MatDialogRef<TableDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if (data.mode === 'edit') this.form = { ...data.table };
    }

    save() {
      this.dialogRef.close(this.form);
    }
}
