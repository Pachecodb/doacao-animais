import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Especie } from '../especie/model/especie';
import { EspecieService } from '../especie/especie.service';
import { AnimalService } from '../animal/animal.service';

@Component({
    selector: 'app-animal-create',
    templateUrl: './animal-create.component.html',
    styleUrls: ['./animal-create.component.css']
})
export class AnimalCreateComponent implements OnInit {

    // Form Group do formulário
    animalForm: FormGroup;
    idEdit: any;

    // Campos do formulário (*2)
    nome = '';
    idade = 0;
    dataNascimento = new Date();
    especie: Especie = null;
    especies: Especie[];

    // TODO incluir todos os campos de software

    // (*4)
    constructor(private snackBar: MatSnackBar, private fb: FormBuilder,
                private router: Router, private animalService: AnimalService,
                private activatedRoute: ActivatedRoute,
                private especieService: EspecieService) { }

    // Função executada antes de carregar o componente no navegador (*5)
    async ngOnInit() {

		this.loadEspecies();

        // Setando campos do formulário e as validações (*3)
        this.animalForm = this.fb.group({
            // TODO validadores para todos os campos
            nome: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
            idade: [null, Validators.compose([Validators.required, Validators.min(0.01), Validators.max(100000)])],
            dataNascimento: [new Date(), Validators.required],
            especie: [null, Validators.required]
        });
        await this.verifyEdit();
    }

    private async verifyEdit() {
        if (this.activatedRoute.snapshot.url[1]) {
            this.idEdit = this.activatedRoute.snapshot.url[1].path;
            await this.getReceivedAnimal();
        }
    }

    // Função submit (*7)
    async onSubmit() {
        if (this.animalForm.invalid) {
            return;
        }

        if (this.idEdit) {
            await this.editAnimal();
        } else {
            await this.saveAnimal();
        }
    }

    cancel() {
        this.router.navigate(['animal-list']).then();
    }

    private async editAnimal() {
        this.animalService.putAnimal(this.animalForm.value).toPromise().then(() => {
			this.snackBar.open('Animal alterado com sucesso!', 'Fechar', { duration: 3000 });
			this.router.navigate(['animal-list']).then();
        }).catch(error => {
            this.snackBar.open(`Erro ao alterar o animal: ${error}`, 'Fechar', { duration: 3000 });
        });
    }

    private async saveAnimal() {
        console.log(this.animalForm.value);
        this.animalService.addAnimal(this.animalForm.value).toPromise().then(() => {
			this.snackBar.open('Animal criado com sucesso!', 'Fechar', { duration: 3000 });
			this.router.navigate(['animal-list']).then();
        }).catch(error => {
            this.snackBar.open(`Erro ao criar o animal: ${error}`, 'Fechar', { duration: 3000 });
        });
    }

    private async getReceivedAnimal() {
        const animal = await this.animalService.getAnimal(this.idEdit).toPromise();

        if (!animal) {
            return;
        }

        this.animalForm.addControl('id', new FormControl(''));
        this.animalForm.patchValue(animal);
    }

    private async loadEspecies() {
        this.especies = await this.especieService.listEspecie().toPromise() as Especie[];
    }
}
