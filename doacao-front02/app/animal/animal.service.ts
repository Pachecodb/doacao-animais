import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from './model/animal';

@Injectable({
    providedIn: 'root'
})

export class AnimalService {

    uri = 'http://localhost:8080/doacao/api/animais';

    constructor(private http: HttpClient) { }

    addAnimal(animal: Animal) {
        return this.http.post(`${this.uri}`, animal);
    }

    listAnimais() {
        return this.http.get(`${this.uri}`);
    }

    getAnimal(id: number) {
        return this.http.get(`${this.uri}/${id}`);
    }

    putAnimal(animal: Animal) {
        return this.http.put(`${this.uri}`, animal);
    }

    deleteAnimal(id: number) {
        return this.http.delete(`${this.uri}/${id}`);
    }

}
