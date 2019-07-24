import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICategorias_Dormitorio } from 'app/shared/model/categorias-dormitorio.model';
import { Categorias_DormitorioService } from './categorias-dormitorio.service';

@Component({
    selector: 'jhi-categorias-dormitorio-update',
    templateUrl: './categorias-dormitorio-update.component.html'
})
export class Categorias_DormitorioUpdateComponent implements OnInit {
    categorias_Dormitorio: ICategorias_Dormitorio;
    isSaving: boolean;

    constructor(protected categorias_DormitorioService: Categorias_DormitorioService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ categorias_Dormitorio }) => {
            this.categorias_Dormitorio = categorias_Dormitorio;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.categorias_Dormitorio.id !== undefined) {
            this.subscribeToSaveResponse(this.categorias_DormitorioService.update(this.categorias_Dormitorio));
        } else {
            this.subscribeToSaveResponse(this.categorias_DormitorioService.create(this.categorias_Dormitorio));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategorias_Dormitorio>>) {
        result.subscribe(
            (res: HttpResponse<ICategorias_Dormitorio>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
