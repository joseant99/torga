import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IInterioresArmarioNuevos } from 'app/shared/model/interiores-armario-nuevos.model';
import { InterioresArmarioNuevosService } from './interiores-armario-nuevos.service';
import { IProductosDormitorio } from 'app/shared/model/productos-dormitorio.model';
import { ProductosDormitorioService } from 'app/entities/productos-dormitorio';
import { IArmario } from 'app/shared/model/armario.model';
import { ArmarioService } from 'app/entities/armario';
import { ICasco } from 'app/shared/model/casco.model';
import { CascoService } from 'app/entities/casco';

@Component({
    selector: 'jhi-interiores-armario-nuevos-update',
    templateUrl: './interiores-armario-nuevos-update.component.html'
})
export class InterioresArmarioNuevosUpdateComponent implements OnInit {
    interioresArmarioNuevos: IInterioresArmarioNuevos;
    isSaving: boolean;

    productosdormitorios: IProductosDormitorio[];

    armarios: IArmario[];

    cascos: ICasco[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected interioresArmarioNuevosService: InterioresArmarioNuevosService,
        protected productosDormitorioService: ProductosDormitorioService,
        protected armarioService: ArmarioService,
        protected cascoService: CascoService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ interioresArmarioNuevos }) => {
            this.interioresArmarioNuevos = interioresArmarioNuevos;
        });
        this.productosDormitorioService.query().subscribe(
            (res: HttpResponse<IProductosDormitorio[]>) => {
                this.productosdormitorios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.armarioService.query().subscribe(
            (res: HttpResponse<IArmario[]>) => {
                this.armarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.cascoService.query().subscribe(
            (res: HttpResponse<ICasco[]>) => {
                this.cascos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.interioresArmarioNuevos.id !== undefined) {
            this.subscribeToSaveResponse(this.interioresArmarioNuevosService.update(this.interioresArmarioNuevos));
        } else {
            this.subscribeToSaveResponse(this.interioresArmarioNuevosService.create(this.interioresArmarioNuevos));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IInterioresArmarioNuevos>>) {
        result.subscribe(
            (res: HttpResponse<IInterioresArmarioNuevos>) => this.onSaveSuccess(),
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProductosDormitorioById(index: number, item: IProductosDormitorio) {
        return item.id;
    }

    trackArmarioById(index: number, item: IArmario) {
        return item.id;
    }

    trackCascoById(index: number, item: ICasco) {
        return item.id;
    }
}
