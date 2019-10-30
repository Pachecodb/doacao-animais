import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { AnimalService } from '../animal/animal.service';
import { Router } from '@angular/router';
import { Animal } from '../animal/model/animal';

@Component({
    selector: 'app-animal',
    templateUrl: './animal-list.component.html',
    styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {

    animais: Animal[];

    dataSource: MatTableDataSource<Animal>;

    displayedColumns = ['id', 'nome', 'idade', 'dataNascimento', 'especie' , 'operations'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    async ngOnInit() {
        this.animais = await this.animalService.listAnimais().toPromise() as Animal[];
        this.dataSource = new MatTableDataSource<Animal>(this.animais);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    constructor(private snackBar: MatSnackBar ,
                private animalService: AnimalService, private router: Router) { }

    async delete(id) {
		const res = await this.animalService.deleteAnimal(id).toPromise();
		this.reload();
        if (!res) {
            return;
        }
        this.snackBar.open('Animal excluído com sucesso! ','Fechar',{duration: 3000});
    }

    edit(id) {
        this.router.navigate([`animal-create/${id}`]).then();
	}
	
	private async reload(){
		this.animais = await this.animalService.listAnimais().toPromise() as Animal[];
        this.dataSource = new MatTableDataSource<Animal>(this.animais);

	}

}

