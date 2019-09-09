import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IContactoFabrica } from 'app/shared/model/contacto-fabrica.model';
import { ContactoFabricaService } from './contacto-fabrica.service';
import { IUser, UserService } from 'app/core';

@Component({
    selector: 'jhi-contacto-fabrica-update',
    templateUrl: './contacto-fabrica-update.component.html'
})
export class ContactoFabricaUpdateComponent implements OnInit {
    contactoFabrica: IContactoFabrica;
    isSaving: boolean;

    users: IUser[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected contactoFabricaService: ContactoFabricaService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ contactoFabrica }) => {
            this.contactoFabrica = contactoFabrica;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.contactoFabrica.id !== undefined) {
            this.subscribeToSaveResponse(this.contactoFabricaService.update(this.contactoFabrica));
        } else {
            this.subscribeToSaveResponse(this.contactoFabricaService.create(this.contactoFabrica));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactoFabrica>>) {
        result.subscribe((res: HttpResponse<IContactoFabrica>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }
}
