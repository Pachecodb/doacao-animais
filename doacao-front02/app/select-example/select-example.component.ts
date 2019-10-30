import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

export interface Animal {
    id: number;
    name: string;
    sound: string;
}

@Component({
    selector: 'app-select-example',
    templateUrl: './select-example.component.html',
    styleUrls: ['./select-example.component.css']
})
export class SelectExampleComponent implements OnInit {

    animalControl = new FormControl('', [Validators.required]);
    selectFormControl = new FormControl('', Validators.required);
    animals: Animal[] = [
        { id: 1, name: 'Dog', sound: 'Woof!' },
        { id: 2, name: 'Cat', sound: 'Meow!' },
        { id: 3, name: 'Cow', sound: 'Moo!' },
        { id: 4, name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
    ];

    constructor() { }

    ngOnInit() {
    }

}
