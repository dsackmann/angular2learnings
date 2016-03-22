import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import {UserService} from './services/UserService';
import {Http} from 'angular2/http';
import {EntitlementListing} from './../entitlements/EntitlementListing';
import {EntitlementForm} from './../entitlements/EntitlementForm';
import {Entitlement} from '../entitlements/Entitlement';
import {ClientService} from './../clients/services/ClientService';
import {User} from './User';

@Component({
  selector: 'user',
  providers: [
    UserService,
    ClientService
  ],
  directives: [
    ROUTER_DIRECTIVES,
    CORE_DIRECTIVES,
    EntitlementListing,
    EntitlementForm
  ],
  pipes: [ ],
  template: require('./userPage.html')
})
export class UserPage {
  public userEnts = [];
  public user: User = new User({});
  private userId;
  constructor(private userService: UserService, private clientService: ClientService, routeParams: RouteParams) {
    this.userId = routeParams.get('id');
  }
  setUser(user) {
    this.user = user;
    this.fetchUserEntitlements();
  }
  fetchUser() {
    this.userService.getUserById(this.userId).subscribe(user => this.setUser(user));
  }
  fetchUserEntitlements() {
    this.userService.getUserEntitlementsForUser(this.user)
      .subscribe(userEnts => this.userEnts = userEnts);
  }
  revokeUserEntitlement(entitlement) {
    this.userService.deleteEntitlement(this.user, entitlement.name)
      .subscribe(() => this.fetchUserEntitlements());
  }
  onUserEntitlementSubmitted(entitlement: Entitlement) {
    this.userService.createEntitlement(this.user, entitlement)
      .subscribe(() => this.fetchUserEntitlements());
  }
  registerUser() {
    this.userService.registerUser({userId: this.user.userId, clientId: this.user.clientId})
      .subscribe(() => this.fetchUser());
  }
  registerClient() {
    this.clientService.registerClient({clientId: this.user.clientId})
      .subscribe(() => this.fetchUser());
  }
  ngOnInit() {
    this.fetchUser();
  }
}
