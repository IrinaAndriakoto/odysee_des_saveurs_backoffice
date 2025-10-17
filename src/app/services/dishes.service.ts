import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  private BASE_URL = 'http://localhost:8080';
    private http = inject(HttpClient);

    /* DISHES */

    getAllDishes() {
        return this.http.get(`${this.BASE_URL}/dishes/getAll`);
    }

    addDish(t: any) {
      return this.http.post(`${this.BASE_URL}/dishes/add`, t);
    }

    updateDish(t: any) {
      return this.http.put(`${this.BASE_URL}/dishes/update/${t.id}`, t);
    }

    deleteDish(id: number) {
      return this.http.delete(`${this.BASE_URL}/dishes/delete/${id}`);
    }

    /* STOCKS */

    getAllStocks() {
      return this.http.get(`${this.BASE_URL}/stocks/getAll`);
    }

    addStock(s: any) {
      return this.http.post(`${this.BASE_URL}/stocks/add`, s);
    }
    updateStock(s: any) {
      return this.http.put(`${this.BASE_URL}/stocks/update/${s.id}`, s);
    } 
    deleteStock(id: number) {
      return this.http.delete(`${this.BASE_URL}/stocks/delete/${id}`);
    }

}
