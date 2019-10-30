import { Especie } from 'src/app/especie/model/especie';

export interface Animal {
    id: number;
	nome: string;
    especie: Especie;
}
