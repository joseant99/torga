import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICasco } from 'app/shared/model/casco.model';
import { CascoService } from './casco.service';
import { IArmario } from 'app/shared/model/armario.model';
import { ArmarioService } from 'app/entities/armario';

@Component({
    selector: 'jhi-casco-update',
    templateUrl: './casco-update.component.html'
})
export class CascoUpdateComponent implements OnInit {
    casco: ICasco;
    isSaving: boolean;

    armarios: IArmario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected cascoService: CascoService,
        protected armarioService: ArmarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ casco }) => {
            this.casco = casco;
        });
        this.armarioService.query().subscribe(
            (res: HttpResponse<IArmario[]>) => {
                this.armarios = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.casco.id !== undefined) {
            this.subscribeToSaveResponse(this.cascoService.update(this.casco));
        } else {
            this.subscribeToSaveResponse(this.cascoService.create(this.casco));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICasco>>) {
        result.subscribe((res: HttpResponse<ICasco>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackArmarioById(index: number, item: IArmario) {
        return item.id;
    }
}
