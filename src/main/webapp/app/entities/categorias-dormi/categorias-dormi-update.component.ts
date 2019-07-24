import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICategoriasDormi } from 'app/shared/model/categorias-dormi.model';
import { CategoriasDormiService } from './categorias-dormi.service';

@Component({
    selector: 'jhi-categorias-dormi-update',
    templateUrl: './categorias-dormi-update.component.html'
})
export class CategoriasDormiUpdateComponent implements OnInit {
    categoriasDormi: ICategoriasDormi;
    isSaving: boolean;

    constructor(protected categoriasDormiService: CategoriasDormiService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ categoriasDormi }) => {
            this.categoriasDormi = categoriasDormi;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.categoriasDormi.id !== undefined) {
            this.subscribeToSaveResponse(this.categoriasDormiService.update(this.categoriasDormi));
        } else {
            this.subscribeToSaveResponse(this.categoriasDormiService.create(this.categoriasDormi));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICategoriasDormi>>) {
        result.subscribe((res: HttpResponse<ICategoriasDormi>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
