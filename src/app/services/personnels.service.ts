import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class PersonnelsService {
    private BASE_URL = 'http://localhost:8080';
    private http = inject(HttpClient);

    constructor() { }

    getAllPersonnels() {
        return this.http.get(`${this.BASE_URL}/personnel/getAll`);
    }

    addPersonnel(p: any) {
      return this.http.post(`${this.BASE_URL}/personnel/addPersonnel`, p);
    }

    updatePersonnel(p: any) {
      return this.http.put(`${this.BASE_URL}/personnel/update/${p.id}`, p);
    }

    deletePersonnel(id: number) {
      return this.http.delete(`${this.BASE_URL}/personnel/${id}`);
    }

}