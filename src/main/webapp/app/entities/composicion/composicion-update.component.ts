import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { IComposicion } from 'app/shared/model/composicion.model';
import { ComposicionService } from './composicion.service';

@Component({
    selector: 'jhi-composicion-update',
    templateUrl: './composicion-update.component.html'
})
export class ComposicionUpdateComponent implements OnInit {
    composicion: IComposicion;
    isSaving: boolean;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected composicionService: ComposicionService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ composicion }) => {
            this.composicion = composicion;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.composicion, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.composicion.id !== undefined) {
            this.subscribeToSaveResponse(this.composicionService.update(this.composicion));
        } else {
            this.subscribeToSaveResponse(this.composicionService.create(this.composicion));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IComposicion>>) {
        result.subscribe((res: HttpResponse<IComposicion>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
