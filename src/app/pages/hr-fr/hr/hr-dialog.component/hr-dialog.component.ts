import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-hr-dialog.component',
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, FormsModule,MatDatepickerModule],
  templateUrl: './hr-dialog.component.html',
  styleUrl: './hr-dialog.component.css'
})

export class HrDialogComponent {
  form: any = {};

  constructor(
    public dialogRef: MatDialogRef<HrDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.mode === 'edit') this.form = { ...data.personnel };
  }

  save() {
    this.dialogRef.close(this.form);
  }
}