import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRepresenTorga } from 'app/shared/model/represen-torga.model';
import { RepresenTorgaService } from './represen-torga.service';
import { IUser, UserService, User } from 'app/core';

@Component({
    selector: 'jhi-represen-torga-update',
    templateUrl: './represen-torga-update.component.html'
})
export class RepresenTorgaUpdateComponent implements OnInit {
    represenTorga: IRepresenTorga;
    isSaving: boolean;
    users: User[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected represenTorgaService: RepresenTorgaService,
        protected userService: UserService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ represenTorga }) => {
            this.represenTorga = represenTorga;
        });
        this.userService
            .query({
                size: 1000000
            })
            .subscribe(
                (res: HttpResponse<User[]>) => {
                    this.users = res.body;
                },
                (res: HttpResponse<any>) => this.onError(res.body)
            );
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
        if (this.represenTorga.id !== undefined) {
            this.subscribeToSaveResponse(this.represenTorgaService.update(this.represenTorga));
        } else {
            this.subscribeToSaveResponse(this.represenTorgaService.create(this.represenTorga));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepresenTorga>>) {
        result.subscribe((res: HttpResponse<IRepresenTorga>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
