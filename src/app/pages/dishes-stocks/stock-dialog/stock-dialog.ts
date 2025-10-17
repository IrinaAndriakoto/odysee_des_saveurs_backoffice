import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DishDialog } from '../dish-dialog/dish-dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-stock-dialog',
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule, MatDatepickerModule],
  templateUrl: './stock-dialog.html',
  styleUrl: './stock-dialog.css'
})
export class StockDialog {
form: any = {};

    constructor(
      public dialogRef: MatDialogRef<StockDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if (data.mode === 'edit') this.form = { ...data.stock };
    }

    save() {
      this.dialogRef.close(this.form);
    }
}
