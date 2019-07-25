import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProvincias } from 'app/shared/model/provincias.model';
import { ProvinciasService } from './provincias.service';

@Component({
    selector: 'jhi-provincias-delete-dialog',
    templateUrl: './provincias-delete-dialog.component.html'
})
export class ProvinciasDeleteDialogComponent {
    provincias: IProvincias;

    constructor(
        protected provinciasService: ProvinciasService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.provinciasService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'provinciasListModification',
                content: 'Deleted an provincias'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-provincias-delete-popup',
    template: ''
})
export class ProvinciasDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ provincias }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProvinciasDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.provincias = provincias;
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
