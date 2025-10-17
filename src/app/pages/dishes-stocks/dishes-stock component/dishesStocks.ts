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
import { StockDialog } from '../stock-dialog/stock-dialog';

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
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  displayedColumns: string[] = ['nom','description','prix','dispo','actions'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource = new MatTableDataSource<any>([]);

  expandedElement: any | null;

  displayedStockColumns: string[] = ['produitNom','quantite','unite','prix','dateInsertion','actions'];
  dataSourceStock = new MatTableDataSource<any>([]);


  toggle(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  isExpanded(element: any): boolean {
    return this.expandedElement === element;
  }

  ngOnInit() {
    this.loadDishes();
    this.loadStocks();
  }

  loadDishes() {
    this.dishesService.getAllDishes().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error('Erreur lors du chargement du personnel :', err)
    });
  }

  loadStocks(){
    this.dishesService.getAllStocks().subscribe({
      next: (data: any) => {
        this.dataSourceStock.data = data;
      },
      error: (err) => console.error('Erreur lors du chargement des stocks :', err)
    });
  }

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

  addStock(){
    const dialogRef = this.dialog.open(StockDialog, {
      width: '400px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dishesService.addStock(result).subscribe({
          next: () => {
            this.snackBar.open('Product added', 'OK', { duration: 2000 });
            this.loadStocks();
          }
        });
      }
    });
  }

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

  editStock(stock: any) {
    const dialogRef = this.dialog.open(StockDialog, {
      width: '400px',
      data: { mode: 'edit', stock }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dishesService.updateStock(result).subscribe({
          next: () => {
            this.snackBar.open('Product updated', 'OK', { duration: 2000 });
            this.loadStocks();
          }, 
          error: (err) => console.error('Erreur lors de la mise à jour du stock :', err)
        });
      }
    });
  }

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

  deleteStock(id: number) {
    if (confirm('Delete this product ?')) {
      this.dishesService.deleteStock(id).subscribe({
        next: () => {
          this.snackBar.open('Product deleted', 'Close', { duration: 2000 });
          this.loadStocks();
        }
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterStock(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceStock.filter = filterValue.trim().toLowerCase();
  }

  
}
