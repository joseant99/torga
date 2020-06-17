import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { INiveladores } from 'app/shared/model/niveladores.model';
import { NiveladoresService } from './niveladores.service';
import { IArmario } from 'app/shared/model/armario.model';
import { ArmarioService } from 'app/entities/armario';

@Component({
    selector: 'jhi-niveladores-update',
    templateUrl: './niveladores-update.component.html'
})
export class NiveladoresUpdateComponent implements OnInit {
    niveladores: INiveladores;
    isSaving: boolean;

    armarios: IArmario[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected niveladoresService: NiveladoresService,
        protected armarioService: ArmarioService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ niveladores }) => {
            this.niveladores = niveladores;
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
        if (this.niveladores.id !== undefined) {
            this.subscribeToSaveResponse(this.niveladoresService.update(this.niveladores));
        } else {
            this.subscribeToSaveResponse(this.niveladoresService.create(this.niveladores));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INiveladores>>) {
        result.subscribe((res: HttpResponse<INiveladores>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
