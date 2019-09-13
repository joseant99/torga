import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IImagenesContactoFabrica } from 'app/shared/model/imagenes-contacto-fabrica.model';
import { ImagenesContactoFabricaService } from './imagenes-contacto-fabrica.service';
import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';
import { ContactoFabricaService } from 'app/entities/contacto-fabrica';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-imagenes-contacto-fabrica-update',
    templateUrl: './imagenes-contacto-fabrica-update.component.html'
})
export class ImagenesContactoFabricaUpdateComponent implements OnInit {
    imagenesContactoFabrica: IImagenesContactoFabrica;
    isSaving: boolean;

    contactofabricas: IContactoFabrica[];

    users: IUser[];

    constructor(
        protected dataUtils: JhiDataUtils,
        protected jhiAlertService: JhiAlertService,
        protected imagenesContactoFabricaService: ImagenesContactoFabricaService,
        protected contactoFabricaService: ContactoFabricaService,
        protected userService: UserService,
        protected elementRef: ElementRef,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ imagenesContactoFabrica }) => {
            this.imagenesContactoFabrica = imagenesContactoFabrica;
        });
        this.contactoFabricaService.query().subscribe(
            (res: HttpResponse<IContactoFabrica[]>) => {
                this.contactofabricas = res.body;
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
        this.dataUtils.clearInputImage(this.imagenesContactoFabrica, this.elementRef, field, fieldContentType, idInput);
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.imagenesContactoFabrica.id !== undefined) {
            this.subscribeToSaveResponse(this.imagenesContactoFabricaService.update(this.imagenesContactoFabrica));
        } else {
            this.subscribeToSaveResponse(this.imagenesContactoFabricaService.create(this.imagenesContactoFabrica));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IImagenesContactoFabrica>>) {
        result.subscribe(
            (res: HttpResponse<IImagenesContactoFabrica>) => this.onSaveSuccess(),
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

    trackContactoFabricaById(index: number, item: IContactoFabrica) {
        return item.id;
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
