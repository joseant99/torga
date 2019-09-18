import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { ITiradoresArmario } from 'app/shared/model/tiradores-armario.model';
import { TiradoresArmarioService } from './tiradores-armario.service';

@Component({
    selector: 'jhi-tiradores-armario-update',
    templateUrl: './tiradores-armario-update.component.html'
})
export class TiradoresArmarioUpdateComponent implements OnInit {
    tiradoresArmario: ITiradoresArmario;
    isSaving: boolean;

    constructor(
        protected dataUtils: JhiDataUtils,
        protected tiradoresArmarioService: TiradoresArmarioService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tiradoresArmario }) => {
            this.tiradoresArmario = tiradoresArmario;
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
        this.dataUtils.clearInputImage(this.tiradoresArmario, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.tiradoresArmario.id !== undefined) {
            this.subscribeToSaveResponse(this.tiradoresArmarioService.update(this.tiradoresArmario));
        } else {
            this.subscribeToSaveResponse(this.tiradoresArmarioService.create(this.tiradoresArmario));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITiradoresArmario>>) {
        result.subscribe((res: HttpResponse<ITiradoresArmario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
