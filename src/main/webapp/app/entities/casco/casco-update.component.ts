import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICasco } from 'app/shared/model/casco.model';
import { CascoService } from './casco.service';

@Component({
    selector: 'jhi-casco-update',
    templateUrl: './casco-update.component.html'
})
export class CascoUpdateComponent implements OnInit {
    casco: ICasco;
    isSaving: boolean;

    constructor(protected cascoService: CascoService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ casco }) => {
            this.casco = casco;
        });
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
}
