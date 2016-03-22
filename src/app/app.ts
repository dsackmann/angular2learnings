import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {UserList} from './users/UserList';
import {UserPage} from './users/UserPage';
import {ClientPage} from './clients/ClientPage';

@Component({
  selector: 'app',
  directives: [ ...ROUTER_DIRECTIVES ],
  template: `
    <header>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer>
    </footer>
  `
})
@RouteConfig([
  { path: '/', component: UserList, name: 'Index' },
  { path: '/user', component: UserList, name: 'UserList' },
  { path: '/user/:id', component: UserPage, name: 'User' },
  { path: '/client/:id', component: ClientPage, name: 'Client' },
  { path: '/**', redirectTo: ['Index'] }
])
export class App {
  constructor() {

  }
}
