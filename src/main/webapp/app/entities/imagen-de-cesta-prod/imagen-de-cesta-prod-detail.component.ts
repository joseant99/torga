import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IImagenDeCestaProd } from 'app/shared/model/imagen-de-cesta-prod.model';

@Component({
    selector: 'jhi-imagen-de-cesta-prod-detail',
    templateUrl: './imagen-de-cesta-prod-detail.component.html'
})
export class ImagenDeCestaProdDetailComponent implements OnInit {
    imagenDeCestaProd: IImagenDeCestaProd;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ imagenDeCestaProd }) => {
            this.imagenDeCestaProd = imagenDeCestaProd;
        });
    }

    previousState() {
        window.history.back();
    }
}
