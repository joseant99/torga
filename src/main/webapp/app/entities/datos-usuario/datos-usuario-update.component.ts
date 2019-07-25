import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { DatosUsuarioService } from './datos-usuario.service';
import { IProvincias } from 'app/shared/model/provincias.model';
import { ProvinciasService } from 'app/entities/provincias';
import { IMunicipios } from 'app/shared/model/municipios.model';
import { MunicipiosService } from 'app/entities/municipios';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-datos-usuario-update',
    templateUrl: './datos-usuario-update.component.html'
})
export class DatosUsuarioUpdateComponent implements OnInit {
    datosUsuario: IDatosUsuario;
    isSaving: boolean;

    provincias: IProvincias[];

    municipios: IMunicipios[];

    users: IUser[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected datosUsuarioService: DatosUsuarioService,
        protected provinciasService: ProvinciasService,
        protected municipiosService: MunicipiosService,
        protected userService: UserService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ datosUsuario }) => {
            this.datosUsuario = datosUsuario;
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
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
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
        this.dataUtils.clearInputImage(this.datosUsuario, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        location.href = '#/datos-usuario';
        location.reload();
    }

    save() {
        this.isSaving = true;
        if (this.datosUsuario.id !== undefined) {
            this.subscribeToSaveResponse(this.datosUsuarioService.update(this.datosUsuario));
        } else {
            this.subscribeToSaveResponse(this.datosUsuarioService.create(this.datosUsuario));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDatosUsuario>>) {
        result.subscribe((res: HttpResponse<IDatosUsuario>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
