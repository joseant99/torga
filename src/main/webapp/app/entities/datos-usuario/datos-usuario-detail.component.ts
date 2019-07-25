import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';

@Component({
    selector: 'jhi-datos-usuario-detail',
    templateUrl: './datos-usuario-detail.component.html'
})
export class DatosUsuarioDetailComponent implements OnInit {
    datosUsuario: IDatosUsuario;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ datosUsuario }) => {
            this.datosUsuario = datosUsuario;
        });
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }
}
