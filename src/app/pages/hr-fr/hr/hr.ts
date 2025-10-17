import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PersonnelsService } from '../../../services/personnels.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { HrDialogComponent } from './hr-dialog.component/hr-dialog.component';

@Component({
  selector: 'app-hr',
  imports: [CommonModule,MatButtonModule,MatIconModule,MatTableModule,MatFormFieldModule, MatInputModule],
  templateUrl: './hr.html',
  styleUrl: './hr.css'
})

export class Hr implements OnInit {
  private personnelsService = inject(PersonnelsService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  displayedColumns: string[] = ['id','nom','prenom','adresse','numero_telephone','role','date_embauche','salaire','actions'];
  dataSource = new MatTableDataSource<any>([]);

  ngOnInit() {
    this.loadPersonnels();
  }

  loadPersonnels() {
    this.personnelsService.getAllPersonnels().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error('Erreur lors du chargement du personnel :', err)
    });
  }

  addPersonnel() {
    const dialogRef = this.dialog.open(HrDialogComponent, {
      width: '400px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personnelsService.addPersonnel(result).subscribe({
          next: () => {
            this.snackBar.open('Personnel ajouté', 'Fermer', { duration: 2000 });
            this.loadPersonnels();
          }
        });
      }
    });
  }

  editPersonnel(personnel: any) {
    const dialogRef = this.dialog.open(HrDialogComponent, {
      width: '400px',
      data: { mode: 'edit', personnel }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personnelsService.updatePersonnel(result).subscribe({
          next: () => {
            this.snackBar.open('Personnel modifié', 'Fermer', { duration: 2000 });
            this.loadPersonnels();
          }
        });
      }
    });
  }

  deletePersonnel(id: number) {
    if (confirm('Supprimer ce personnel ?')) {
      this.personnelsService.deletePersonnel(id).subscribe({
        next: () => {
          this.snackBar.open('Personnel supprimé', 'Fermer', { duration: 2000 });
          this.loadPersonnels();
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
