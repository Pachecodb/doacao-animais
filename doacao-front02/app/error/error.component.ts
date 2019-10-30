import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent {

    // Injeção de dependências via construtor
    constructor(private dialogRef: MatDialogRef<ErrorComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: any) { 
    }

    public closeDialog() {
        this.dialogRef.close();
    }

}
