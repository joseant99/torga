import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IAcabados } from 'app/shared/model/acabados.model';
import { AcabadosService } from './acabados.service';
import { IAcaProd } from 'app/shared/model/aca-prod.model';
import { AcaProdService } from 'app/entities/aca-prod';

@Component({
    selector: 'jhi-acabados-update',
    templateUrl: './acabados-update.component.html'
})
export class AcabadosUpdateComponent implements OnInit {
    acabados: IAcabados;
    isSaving: boolean;

    acaprods: IAcaProd[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected acabadosService: AcabadosService,
        protected acaProdService: AcaProdService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ acabados }) => {
            this.acabados = acabados;
        });
        this.acaProdService.query().subscribe(
            (res: HttpResponse<IAcaProd[]>) => {
                this.acaprods = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        this.dataUtils.clearInputImage(this.acabados, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.acabados.id !== undefined) {
            this.subscribeToSaveResponse(this.acabadosService.update(this.acabados));
        } else {
            this.subscribeToSaveResponse(this.acabadosService.create(this.acabados));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcabados>>) {
        result.subscribe((res: HttpResponse<IAcabados>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAcaProdById(index: number, item: IAcaProd) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
