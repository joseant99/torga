import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITiradoresArmario } from 'app/shared/model/tiradores-armario.model';
import { TiradoresArmarioService } from './tiradores-armario.service';

@Component({
    selector: 'jhi-tiradores-armario-delete-dialog',
    templateUrl: './tiradores-armario-delete-dialog.component.html'
})
export class TiradoresArmarioDeleteDialogComponent {
    tiradoresArmario: ITiradoresArmario;

    constructor(
        protected tiradoresArmarioService: TiradoresArmarioService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tiradoresArmarioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tiradoresArmarioListModification',
                content: 'Deleted an tiradoresArmario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tiradores-armario-delete-popup',
    template: ''
})
export class TiradoresArmarioDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tiradoresArmario }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TiradoresArmarioDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.tiradoresArmario = tiradoresArmario;
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
