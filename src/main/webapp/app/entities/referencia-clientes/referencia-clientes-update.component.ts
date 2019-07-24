import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IReferenciaClientes } from 'app/shared/model/referencia-clientes.model';
import { ReferenciaClientesService } from './referencia-clientes.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';

@Component({
    selector: 'jhi-referencia-clientes-update',
    templateUrl: './referencia-clientes-update.component.html'
})
export class ReferenciaClientesUpdateComponent implements OnInit {
    referenciaClientes: IReferenciaClientes;
    isSaving: boolean;

    clientes: ICliente[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected referenciaClientesService: ReferenciaClientesService,
        protected clienteService: ClienteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ referenciaClientes }) => {
            this.referenciaClientes = referenciaClientes;
        });
        this.clienteService.query().subscribe(
            (res: HttpResponse<ICliente[]>) => {
                this.clientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.referenciaClientes.id !== undefined) {
            this.subscribeToSaveResponse(this.referenciaClientesService.update(this.referenciaClientes));
        } else {
            this.subscribeToSaveResponse(this.referenciaClientesService.create(this.referenciaClientes));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReferenciaClientes>>) {
        result.subscribe((res: HttpResponse<IReferenciaClientes>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackClienteById(index: number, item: ICliente) {
        return item.id;
    }
}
