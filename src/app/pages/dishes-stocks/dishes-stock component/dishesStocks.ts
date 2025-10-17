import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DishesService } from '../../../services/dishes.service';
import { DishDialog } from '../dish-dialog/dish-dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dishes',
  imports: [CommonModule,MatButtonModule,MatIconModule,MatTableModule,MatFormFieldModule, MatInputModule],
  templateUrl: './dishesStocks.html',
  styleUrl: './dishesStocks.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DishesStocks {
  private dishesService = inject(DishesService);
  // private tablesService = inject(TablesService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  displayedColumns: string[] = ['nom','description','prix','dispo','actions'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource = new MatTableDataSource<any>([]);

  expandedElement: any | null;

  // displayedTableColumns: string[] = ['nom_table','nb_place','dispo','actions'];
  // dataSourceTable = new MatTableDataSource<any>([]);


  toggle(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  isExpanded(element: any): boolean {
    return this.expandedElement === element;
  }

  ngOnInit() {
    this.loadDishes();
    // this.loadTables();
  }

  loadDishes() {
    this.dishesService.getAllDishes().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error('Erreur lors du chargement du personnel :', err)
    });
  }

  // loadTables(){
  //   this.tablesService.getAllTables().subscribe({
  //     next: (data: any) => {
  //       this.dataSourceTable.data = data;
  //     },
  //     error: (err) => console.error('Erreur lors du chargement des tables :', err)
  //   });
  // }

  addDish() {
    const dialogRef = this.dialog.open(DishDialog, {
      width: '400px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dishesService.addDish(result).subscribe({
          next: () => {
            this.snackBar.open('Dish added', 'OK', { duration: 2000 });
            this.loadDishes();
          }
        });
      }
    });
  }

  // addTable(){
  //   const dialogRef = this.dialog.open(TableDialogComponent, {
  //     width: '400px',
  //     data: { mode: 'add' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.tablesService.addTable(result).subscribe({
  //         next: () => {
  //           this.snackBar.open('Table added', 'OK', { duration: 2000 });
  //           this.loadTables();
  //         }
  //       });
  //     }
  //   });
  // }

  editDish(dish: any) {
    const dialogRef = this.dialog.open(DishDialog, {
      width: '400px',
      data: { mode: 'edit', dish }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dishesService.updateDish(result).subscribe({
          next: () => {
            this.snackBar.open('Dish updated', 'OK', { duration: 2000 });
            this.loadDishes();
          }
        });
      }
    });
  }

  // editTable(table: any) {
  //   const dialogRef = this.dialog.open(TableDialogComponent, {
  //     width: '400px',
  //     data: { mode: 'edit', table }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.tablesService.updateTable(result).subscribe({
  //         next: () => {
  //           this.snackBar.open('Table modifiée', 'Fermer', { duration: 2000 });
  //           this.loadTables();
  //         }
  //       });
  //     }
  //   });
  // }

  deleteDish(id: number) {
    if (confirm('Delete this dish ?')) {
      this.dishesService.deleteDish(id).subscribe({
        next: () => {
          this.snackBar.open('Dish deleted', 'Close', { duration: 2000 });
          this.loadDishes();
        }
      });
    }
  }

  // deleteTable(id: number) {
  //   if (confirm('Delete this table ?')) {
  //     this.tablesService.deleteTable(id).subscribe({
  //       next: () => {
  //         this.snackBar.open('Table deleted', 'Close', { duration: 2000 });
  //         this.loadTables();
  //       }
  //     });
  //   }
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // applyFilterTable(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSourceTable.filter = filterValue.trim().toLowerCase();
  // }

  
}
