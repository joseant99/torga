import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IImagenesContactoFabrica } from 'app/shared/model/imagenes-contacto-fabrica.model';

@Component({
    selector: 'jhi-imagenes-contacto-fabrica-detail',
    templateUrl: './imagenes-contacto-fabrica-detail.component.html'
})
export class ImagenesContactoFabricaDetailComponent implements OnInit {
    imagenesContactoFabrica: IImagenesContactoFabrica;

    constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ imagenesContactoFabrica }) => {
            this.imagenesContactoFabrica = imagenesContactoFabrica;
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
