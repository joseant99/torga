import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITransportistaTabla } from 'app/shared/model/transportista-tabla.model';
import { TransportistaTablaService } from './transportista-tabla.service';
import { IProvincias } from 'app/shared/model/provincias.model';
import { ProvinciasService } from 'app/entities/provincias';
import { IMunicipios } from 'app/shared/model/municipios.model';
import { MunicipiosService } from 'app/entities/municipios';

@Component({
    selector: 'jhi-transportista-tabla-update',
    templateUrl: './transportista-tabla-update.component.html'
})
export class TransportistaTablaUpdateComponent implements OnInit {
    transportistaTabla: ITransportistaTabla;
    isSaving: boolean;

    provincias: IProvincias[];

    municipios: IMunicipios[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected transportistaTablaService: TransportistaTablaService,
        protected provinciasService: ProvinciasService,
        protected municipiosService: MunicipiosService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transportistaTabla }) => {
            this.transportistaTabla = transportistaTabla;
        });
        this.provinciasService.query().subscribe(
            (res: HttpResponse<IProvincias[]>) => {
                this.provincias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.municipiosService.query().subscribe(
            (res: HttpResponse<IMunicipios[]>) => {
                this.municipios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.transportistaTabla.id !== undefined) {
            this.subscribeToSaveResponse(this.transportistaTablaService.update(this.transportistaTabla));
        } else {
            this.subscribeToSaveResponse(this.transportistaTablaService.create(this.transportistaTabla));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransportistaTabla>>) {
        result.subscribe((res: HttpResponse<ITransportistaTabla>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProvinciasById(index: number, item: IProvincias) {
        return item.id;
    }

    trackMunicipiosById(index: number, item: IMunicipios) {
        return item.id;
    }
}
