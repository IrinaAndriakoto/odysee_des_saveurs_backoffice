import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  private BASE_URL = 'http://localhost:8080/dishes';
    private http = inject(HttpClient);

    getAllDishes() {
        return this.http.get(`${this.BASE_URL}/getAll`);
    }

    addDish(t: any) {
      return this.http.post(`${this.BASE_URL}/add`, t);
    }

    updateDish(t: any) {
      return this.http.put(`${this.BASE_URL}/update/${t.id}`, t);
    }

    deleteDish(id: number) {
      return this.http.delete(`${this.BASE_URL}/delete/${id}`);
    }
}
