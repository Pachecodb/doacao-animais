import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Especie } from './model/especie';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { EspecieService } from '../especie/especie.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-especie',
    templateUrl: './especie-list.component.html',
    styleUrls: ['./especie-list.component.css']
})
export class EspecieListComponent implements OnInit {

    especies: Especie[];

    dataSource: MatTableDataSource<Especie>;

    displayedColumns = ['id', 'nome', 'operations'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    async ngOnInit() {
        this.especies = await this.especieService.listEspecie().toPromise() as Especie[];
        this.dataSource = new MatTableDataSource<Especie>(this.especies);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    constructor(private snackBar: MatSnackBar,
                private especieService: EspecieService, private router: Router) { }

    async delete(id) {
		const res = await this.especieService.deleteEspecie(id).toPromise();
		this.reload();
        if (!res) {
            return;
        }
        this.snackBar.open('Especie excluída com sucesso!','Fechar',{duration: 3000});
    }

    edit(id) {
        this.router.navigate([`especie-create/${id}`]).then();
	}
	
	private async reload(){
		this.especies = await this.especieService.listEspecie().toPromise() as Especie[];
        this.dataSource = new MatTableDataSource<Especie>(this.especies);
	}

}
