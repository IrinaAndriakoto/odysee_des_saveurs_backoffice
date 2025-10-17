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
import { TablesService } from '../../../services/tables.services';
import { TableDialogComponent } from './table-dialog.component/table-dialog.component';

@Component({
  selector: 'app-hr',
  imports: [CommonModule,MatButtonModule,MatIconModule,MatTableModule,MatFormFieldModule, MatInputModule],
  templateUrl: './hr.html',
  styleUrl: './hr.css'
})

export class Hr implements OnInit {
  private personnelsService = inject(PersonnelsService);
  private tablesService = inject(TablesService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  displayedColumns: string[] = ['nom','prenom','adresse','numero_telephone','role','date_embauche','salaire','actions'];
  dataSource = new MatTableDataSource<any>([]);

  displayedTableColumns: string[] = ['nom_table','nb_place','dispo','actions'];
  dataSourceTable = new MatTableDataSource<any>([]);

  ngOnInit() {
    this.loadPersonnels();
    this.loadTables();
  }

  loadPersonnels() {
    this.personnelsService.getAllPersonnels().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error('Erreur lors du chargement du personnel :', err)
    });
  }

  loadTables(){
    this.tablesService.getAllTables().subscribe({
      next: (data: any) => {
        this.dataSourceTable.data = data;
      },
      error: (err) => console.error('Erreur lors du chargement des tables :', err)
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
            this.snackBar.open('Personnel added', 'OK', { duration: 2000 });
            this.loadPersonnels();
          }
        });
      }
    });
  }

  addTable(){
    const dialogRef = this.dialog.open(TableDialogComponent, {
      width: '400px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tablesService.addTable(result).subscribe({
          next: () => {
            this.snackBar.open('Table added', 'OK', { duration: 2000 });
            this.loadTables();
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

  editTable(table: any) {
    const dialogRef = this.dialog.open(TableDialogComponent, {
      width: '400px',
      data: { mode: 'edit', table }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tablesService.updateTable(result).subscribe({
          next: () => {
            this.snackBar.open('Table modifiée', 'Fermer', { duration: 2000 });
            this.loadTables();
          }
        });
      }
    });
  }

  deletePersonnel(id: number) {
    if (confirm('Delete this personnel ?')) {
      this.personnelsService.deletePersonnel(id).subscribe({
        next: () => {
          this.snackBar.open('Personnel deleted', 'Close', { duration: 2000 });
          this.loadPersonnels();
        }
      });
    }
  }

  deleteTable(id: number) {
    if (confirm('Delete this table ?')) {
      this.tablesService.deleteTable(id).subscribe({
        next: () => {
          this.snackBar.open('Table deleted', 'Close', { duration: 2000 });
          this.loadTables();
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterTable(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTable.filter = filterValue.trim().toLowerCase();
  }
}
