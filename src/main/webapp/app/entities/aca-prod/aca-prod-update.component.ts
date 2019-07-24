import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IAcaProd } from 'app/shared/model/aca-prod.model';
import { AcaProdService } from './aca-prod.service';
import { IAcabados } from 'app/shared/model/acabados.model';
import { AcabadosService } from 'app/entities/acabados';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';
import { ITipoProducto } from 'app/shared/model/tipo-producto.model';
import { TipoProductoService } from 'app/entities/tipo-producto';

@Component({
    selector: 'jhi-aca-prod-update',
    templateUrl: './aca-prod-update.component.html'
})
export class AcaProdUpdateComponent implements OnInit {
    acaProd: IAcaProd;
    isSaving: boolean;

    acabados: IAcabados[];

    productosdormitorios: IProductosDormitorio[];

    tipoproductos: ITipoProducto[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected acaProdService: AcaProdService,
        protected acabadosService: AcabadosService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected tipoProductoService: TipoProductoService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ acaProd }) => {
            this.acaProd = acaProd;
        });
        this.acabadosService.query().subscribe(
            (res: HttpResponse<IAcabados[]>) => {
                this.acabados = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.productosDormitorioService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<IProductosDormitorio[]>) => {
                    this.productosdormitorios = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.tipoProductoService.query().subscribe(
            (res: HttpResponse<ITipoProducto[]>) => {
                this.tipoproductos = res.body;
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
        this.dataUtils.clearInputImage(this.acaProd, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.acaProd.id !== undefined) {
            this.subscribeToSaveResponse(this.acaProdService.update(this.acaProd));
        } else {
            this.subscribeToSaveResponse(this.acaProdService.create(this.acaProd));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAcaProd>>) {
        result.subscribe((res: HttpResponse<IAcaProd>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAcabadosById(index: number, item: IAcabados) {
        return item.id;
    }

    trackProductosDormitorioById(index: number, item: IProductosDormitorio) {
        return item.id;
    }

    trackTipoProductoById(index: number, item: ITipoProducto) {
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
