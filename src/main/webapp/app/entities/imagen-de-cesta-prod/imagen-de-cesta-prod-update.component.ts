import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IImagenDeCestaProd } from 'app/shared/model/imagen-de-cesta-prod.model';
import { ImagenDeCestaProdService } from './imagen-de-cesta-prod.service';

@Component({
    selector: 'jhi-imagen-de-cesta-prod-update',
    templateUrl: './imagen-de-cesta-prod-update.component.html'
})
export class ImagenDeCestaProdUpdateComponent implements OnInit {
    imagenDeCestaProd: IImagenDeCestaProd;
    isSaving: boolean;

    constructor(protected imagenDeCestaProdService: ImagenDeCestaProdService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ imagenDeCestaProd }) => {
            this.imagenDeCestaProd = imagenDeCestaProd;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.imagenDeCestaProd.id !== undefined) {
            this.subscribeToSaveResponse(this.imagenDeCestaProdService.update(this.imagenDeCestaProd));
        } else {
            this.subscribeToSaveResponse(this.imagenDeCestaProdService.create(this.imagenDeCestaProd));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IImagenDeCestaProd>>) {
        result.subscribe((res: HttpResponse<IImagenDeCestaProd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
