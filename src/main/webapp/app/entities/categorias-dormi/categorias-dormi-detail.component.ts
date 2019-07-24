import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';

@Component({
    selector: 'jhi-categorias-dormi-detail',
    templateUrl: './categorias-dormi-detail.component.html'
})
export class CategoriasDormiDetailComponent implements OnInit {
    categoriasDormi: ICategoriasDormi;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categoriasDormi }) => {
            this.categoriasDormi = categoriasDormi;
        });
    }

    previousState() {
        window.history.back();
    }
}
