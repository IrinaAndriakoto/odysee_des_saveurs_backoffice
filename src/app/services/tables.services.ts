import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class TablesService {
    private BASE_URL = 'http://localhost:8080';
    private http = inject(HttpClient);

    getAllTables() {
        return this.http.get(`${this.BASE_URL}/tables/getAll`);
    }

    addTable(t: any) {
      return this.http.post(`${this.BASE_URL}/tables/addTable`, t);
    }

    updateTable(t: any) {
      return this.http.put(`${this.BASE_URL}/tables/update/${t.id}`, t);
    }

    deleteTable(id: number) {
      return this.http.delete(`${this.BASE_URL}/tables/${id}`);
    }
    
}