import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICategorias_Dormitorio } from 'app/shared/model/categorias-dormitorio.model';

@Component({
    selector: 'jhi-categorias-dormitorio-detail',
    templateUrl: './categorias-dormitorio-detail.component.html'
})
export class Categorias_DormitorioDetailComponent implements OnInit {
    categorias_Dormitorio: ICategorias_Dormitorio;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ categorias_Dormitorio }) => {
            this.categorias_Dormitorio = categorias_Dormitorio;
        });
    }

    previousState() {
        window.history.back();
    }
}
