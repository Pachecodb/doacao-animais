import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Especie } from '../especie-list/model/especie';

@Injectable({
    providedIn: 'root'
})
export class EspecieService {

    uri = 'http://localhost:8080/doacao/api/especies';

    constructor(private http: HttpClient) {
    }

    addEspecie(especie: Especie) {
        return this.http.post(`${this.uri}`, especie);
    }

    listEspecie() {
        return this.http.get(`${this.uri}`);
    }

    getEspecie(id: number) {
        return this.http.get(`${this.uri}/${id}`);
    }

    putEspecie(especie: Especie) {
        return this.http.put(`${this.uri}`, especie);
    }

    deleteEspecie(id: number) {
        return this.http.delete(`${this.uri}/${id}`);
    }

}
