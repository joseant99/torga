import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMunicipios } from 'app/shared/model/municipios.model';
import { MunicipiosService } from './municipios.service';
import { IProvincias } from 'app/shared/model/provincias.model';
import { ProvinciasService } from 'app/entities/provincias';

@Component({
    selector: 'jhi-municipios-update',
    templateUrl: './municipios-update.component.html'
})
export class MunicipiosUpdateComponent implements OnInit {
    municipios: IMunicipios;
    isSaving: boolean;

    provincias: IProvincias[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected municipiosService: MunicipiosService,
        protected provinciasService: ProvinciasService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ municipios }) => {
            this.municipios = municipios;
        });
        this.provinciasService.query().subscribe(
            (res: HttpResponse<IProvincias[]>) => {
                this.provincias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.municipios.id !== undefined) {
            this.subscribeToSaveResponse(this.municipiosService.update(this.municipios));
        } else {
            this.subscribeToSaveResponse(this.municipiosService.create(this.municipios));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMunicipios>>) {
        result.subscribe((res: HttpResponse<IMunicipios>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
