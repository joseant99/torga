import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { SettingsComponent } from './settings.component';

export const settingsRoute: Route = {
    path: 'settings',
    component: SettingsComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_CLIENTE', 'ROLE_REPRESENTATE', 'ROLE_ADMIN'],
        pageTitle: 'global.menu.account.settings'
    },
    canActivate: [UserRouteAccessService]
};
