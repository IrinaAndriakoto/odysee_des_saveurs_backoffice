import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dish-dialog',
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './dish-dialog.html',
  styleUrl: './dish-dialog.css'
})
export class DishDialog {
form: any = {};

    constructor(
      public dialogRef: MatDialogRef<DishDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if (data.mode === 'edit') this.form = { ...data.dish };
    }

    save() {
      this.dialogRef.close(this.form);
    }
}
