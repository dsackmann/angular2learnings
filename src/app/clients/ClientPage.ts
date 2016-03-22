import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteParams} from 'angular2/router';
import {Http} from 'angular2/http';
import {EntitlementListing} from './../entitlements/EntitlementListing';
import {EntitlementForm} from './../entitlements/EntitlementForm';
import {Entitlement} from '../entitlements/Entitlement';
import {ClientService} from './services/ClientService';
import {UserRow} from '../users/UserRow';
import {Client} from './Client';
import {User} from '../users/User';

@Component({
  selector: 'client',
  providers: [
    ClientService
  ],
  directives: [
    CORE_DIRECTIVES,
    EntitlementListing,
    EntitlementForm,
    UserRow
  ],
  pipes: [ ],
  template: require('./clientPage.html')
})
export class ClientPage {
  public clientEnts = [];
  public client: Client = new Client({});
  public users: Array<any> = [];
  private clientId;
  constructor(private clientService: ClientService, routeParams: RouteParams) {
    this.clientId = routeParams.get('id');
  }
  setClient(client) {
    this.client = client;
    this.fetchClientEntitlements();
    this.fetchUsers();
  }
  fetchClient() {
    this.clientService.getClientById(this.clientId).subscribe(client => this.setClient(client));
  }
  fetchClientEntitlements() {
    this.clientService.getEntitlementsForClient(this.client)
      .subscribe(clientEnts => this.clientEnts = clientEnts);
  }
  revokeClientEntitlement(entitlement) {
    this.clientService.deleteEntitlement(this.client, entitlement.name)
      .subscribe(() => this.fetchClientEntitlements());
  }
  onClientEntitlementSubmitted(entitlement: Entitlement) {
    this.clientService.createEntitlement(this.client, entitlement)
      .subscribe(() => this.fetchClientEntitlements());
  }
  registerClient() {
    this.clientService.registerClient({clientId: this.client.clientId})
      .subscribe(() => this.fetchClient());
  }
  ngOnInit() {
    this.fetchClient();
  }
  fetchUsers() {
    this.clientService.getUsersForClient(this.client)
      .subscribe((users) => this.users = users);
  }
}
