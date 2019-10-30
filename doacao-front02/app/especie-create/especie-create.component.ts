import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { EspecieService } from '../especie/especie.service';

@Component({
    selector: 'app-especie-create',
    templateUrl: './especie-create.component.html',
    styleUrls: ['./especie-create.component.css']
})
export class EspecieCreateComponent implements OnInit {

    // Form Group do formulário
    especieForm: FormGroup;
    idEdit: any;

    // Campos do formulário (*2)
    nome = '';

    // (*4)
    constructor(private snackBar: MatSnackBar, private fb: FormBuilder,
                private router: Router, private especieService: EspecieService,
                private activatedRoute: ActivatedRoute) { }

    // Função executada antes de carregar o componente no navegador (*5)
    async ngOnInit() {
        // Setando campos do formulário e as validações (*3)
        this.especieForm = this.fb.group({
            nome: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)])],
        });
        await this.verifyEdit();
    }

    private async verifyEdit() {
        if (this.activatedRoute.snapshot.url[1]) {
            this.idEdit = this.activatedRoute.snapshot.url[1].path;
            await this.getReceivedEspecie();
        }
    }

    // Função submit (*7)
    async onSubmit() {
        if (this.especieForm.invalid) {
            return;
        }

        if (this.idEdit) {
            await this.editEspecie();
        } else {
            await this.saveEspecie();
        }
    }

    cancel() {
        this.router.navigate(['especie-list']).then();
    }

    private async editEspecie() {
        this.especieService.putEspecie(this.especieForm.value).toPromise().then(() => {
			this.snackBar.open('Especie alterada com sucesso!', 'Fechar', { duration: 3000 });
			this.router.navigate(['especie-list']).then();
        }).catch(error => {
            this.snackBar.open(`Erro ao alterar a especie: ${error}`, 'Fechar', { duration: 3000 });
        });
    }

    private async saveEspecie() {
        this.especieService.addEspecie(this.especieForm.value).toPromise().then(() => {
			this.snackBar.open('Especie criada com sucesso!', 'Fechar', { duration: 3000 });
			this.router.navigate(['especie-list']).then();
        }).catch(error => {
            this.snackBar.open(`Erro ao criar a especie: ${error}`, 'Fechar', { duration: 3000 });
        });
    }

    private async getReceivedEspecie() {
        const especie = await this.especieService.getEspecie(this.idEdit).toPromise();

        if (!especie) {
            return;
        }

        this.especieForm.addControl('id', new FormControl(''));
        this.especieForm.patchValue(especie);
    }
}
