import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';

import { LoginService } from 'app/core/login/login.service';
import { Router } from '@angular/router';
import { StateStorageService } from 'app/core/auth/state-storage.service';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.css']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private router: Router,
        private stateStorageService: StateStorageService
    ) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                console.log(this.account);
                //REDIRECCIONAR SEGUN EL ROL QUE TENGAN
                if (account.authorities.indexOf('ROLE_CLIENTE') >= 0) {
                    this.router.navigate(['/clientetorga']);
                } else if (account.authorities.indexOf('ROLE_ADMIN') >= 0) {
                    this.router.navigate(['/admintorga']);
                } else if (account.authorities.indexOf('ROLE_REPRESENTATE') >= 0) {
                    this.router.navigate(['/representantetorga']);
                } else {
                    this.account = account;
                }
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    // login() {
    //     this.modalRef = this.loginModalService.open();
    // }

    register() {
        this.router.navigate(['/register']);
    }

    requestResetPassword() {
        this.router.navigate(['/reset', 'request']);
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;

                if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                    this.router.navigate(['']);
                }

                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is successful, go to stored previousState and clear previousState
                const redirect = this.stateStorageService.getUrl();
                if (redirect) {
                    this.stateStorageService.storeUrl(null);
                    this.router.navigate([redirect]);
                }
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }
}
