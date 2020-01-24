import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDireccionTiendas } from 'app/shared/model/direccion-tiendas.model';
import { DireccionTiendasService } from './direccion-tiendas.service';
import { IProvincias } from 'app/shared/model/provincias.model';
import { ProvinciasService } from 'app/entities/provincias';
import { IMunicipios } from 'app/shared/model/municipios.model';
import { MunicipiosService } from 'app/entities/municipios';
import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { DatosUsuarioService } from 'app/entities/datos-usuario';

@Component({
    selector: 'jhi-direccion-tiendas-update',
    templateUrl: './direccion-tiendas-update.component.html'
})
export class DireccionTiendasUpdateComponent implements OnInit {
    direccionTiendas: IDireccionTiendas;
    isSaving: boolean;

    provincias: IProvincias[];

    municipios: IMunicipios[];

    datosusuarios: IDatosUsuario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected direccionTiendasService: DireccionTiendasService,
        protected provinciasService: ProvinciasService,
        protected municipiosService: MunicipiosService,
        protected datosUsuarioService: DatosUsuarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ direccionTiendas }) => {
            this.direccionTiendas = direccionTiendas;
        });
        this.provinciasService.query({ size: 1000000 }).subscribe(
            (res: HttpResponse<IProvincias[]>) => {
                this.provincias = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );

        this.datosUsuarioService.query({ size: 1000000 }).subscribe(
            (res: HttpResponse<IDatosUsuario[]>) => {
                this.datosusuarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }
    public cargarMunicipios() {
        var idProv = $('#provincia').val();
        $('#municipios').empty();
        $('#municipios').append('<option></option>');
        this.municipiosService.query1().subscribe(data => {
            for (let i = 0; i < data['body'].length; i++) {
                if (data['body'][i]['provincias']['id'] == idProv) {
                    $('#municipios').append('<option value="' + data['body'][i]['id'] + '">' + data['body'][i]['nombre'] + '</option>');
                }
                this.municipios = data.body;
            }
        });
    }
    save() {
        this.isSaving = true;
        var tienda = JSON.parse(sessionStorage.getItem('tiendaUsuario'));
        var provincias = this.provincias;
        var municipios = this.municipios;
        console.log(this.direccionTiendas);
        var idProv = $('#provincia').val();
        var idMun = $('#municipios').val();

        for (let i = 0; i < provincias.length; i++) {
            if (idProv == provincias[i]['id']) {
                var prov = provincias[i];
            }
        }
        for (let i = 0; i < municipios.length; i++) {
            if (idMun == municipios[i]['id']) {
                var mun = municipios[i];
            }
        }
        this.direccionTiendas['provincias'] = prov;
        this.direccionTiendas['municipios'] = mun;
        this.direccionTiendas['datosUsuario'] = tienda;
        if (this.direccionTiendas.id !== undefined) {
            this.subscribeToSaveResponse(this.direccionTiendasService.update(this.direccionTiendas));
        } else {
            this.subscribeToSaveResponse(this.direccionTiendasService.create(this.direccionTiendas));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDireccionTiendas>>) {
        result.subscribe((res: HttpResponse<IDireccionTiendas>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDatosUsuarioById(index: number, item: IDatosUsuario) {
        return item.id;
    }
}
