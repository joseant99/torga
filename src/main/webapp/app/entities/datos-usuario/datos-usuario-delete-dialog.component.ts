import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDatosUsuario } from 'app/shared/model/datos-usuario.model';
import { DatosUsuarioService } from './datos-usuario.service';

@Component({
    selector: 'jhi-datos-usuario-delete-dialog',
    templateUrl: './datos-usuario-delete-dialog.component.html'
})
export class DatosUsuarioDeleteDialogComponent {
    datosUsuario: IDatosUsuario;

    constructor(
        protected datosUsuarioService: DatosUsuarioService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.datosUsuarioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'datosUsuarioListModification',
                content: 'Deleted an datosUsuario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-datos-usuario-delete-popup',
    template: ''
})
export class DatosUsuarioDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ datosUsuario }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DatosUsuarioDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.datosUsuario = datosUsuario;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
