import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
// import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservations',
  imports: [CommonModule,MatButtonModule,MatIconModule,MatTableModule,MatFormFieldModule, MatInputModule],
  templateUrl: './reservations.html',
  styleUrl: './reservations.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class Reservations implements OnInit {
  private resService = inject(ReservationService);
  // private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  
  displayedColumns: string[] = ['id','fullname','email','phone','preferredDate','actions'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  dataSource = new MatTableDataSource<any>([]);

  expandedElement: any | null;

  toggle(element: any) {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  isExpanded(element: any): boolean {
    return this.expandedElement === element;
  }

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.resService.getAllReservations().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
      },
      error: (error: any) => {
        console.error('Error loading reservations:', error);
      }
    });
  }

  deleteReservation(id: number) {
    this.resService.deleteReservation(id).subscribe({
      next: () => {
        this.snackBar.open('Reservation deleted successfully', 'Close', { duration: 2000 });
        this.loadReservations();
      },
      error: (error: any) => {
        console.error('Error deleting reservation:', error);
        this.snackBar.open('Failed to delete reservation', 'Close', { duration: 2000 });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // helper pour formatter le statut et retourner icone / libellé / couleur
  getStatusDisplay(status: any) {
    const s = (status ?? '').toString().toUpperCase();
    if (['PENDING', 'EN_ATTENTE', 'WAITING', 'ATTENTE'].includes(s)) {
      return { icon: 'hourglass_top', label: 'En attente', color: 'warn' };
    }
    if (['APPROVED', 'VALIDATED', 'VALIDEE', 'VALIDÉE'].includes(s)) {
      return { icon: 'check_circle', label: 'Validée', color: 'primary' };
    }
    if (['REJECTED', 'REFUSE', 'REFUSEE', 'REFUSÉE', 'REFUSED'].includes(s)) {
      return { icon: 'cancel', label: 'Refusée', color: 'warn' };
    }
    return { icon: 'help_outline', label: status ?? '-', color: '' };
  }

}