import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private BASE_URL = 'http://localhost:8080/reservations';
  private http = inject(HttpClient);

  getAllReservations() {
    return this.http.get(`${this.BASE_URL}/getAll`);
  }

  addReservation(r: any) {
    return this.http.post(`${this.BASE_URL}/postReservation`, r);
  } 

  updateReservation(r: any) {
    return this.http.put(`${this.BASE_URL}/update/${r.id}`, r);
  }

  deleteReservation(id: number) {
    return this.http.delete(`${this.BASE_URL}/delete/${id}`);
  }

  validateReservation(id: number) {
    return this.http.post(`${this.BASE_URL}/validate/${id}`, {});
  }

  refuseReservation(id: number) {
    return this.http.post(`${this.BASE_URL}/refuse/${id}`, {});
  }
}
