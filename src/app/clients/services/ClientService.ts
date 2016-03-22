import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Client} from '../Client';
import {Entitlement} from '../../entitlements/Entitlement';
import {Observable} from 'rxjs/Observable';
import {User} from '../../users/User';

@Injectable()
export class ClientService {
  private headers: Headers;
  private clientResourceUrl: string = '/api/client/';
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }
  registerClient(client) {
    return this.http.post(
      this.clientResourceUrl,
      JSON.stringify(client),
      {headers: this.headers})
      .map(res => res.json());
  }
  getClientById(clientId: number) {
    return this.http.get(this.clientResourceUrl + clientId)
      .map(res => {
        return new Client(res.json());
      });
  }
  getEntitlementsForClient(client: Client): Observable<Array<Entitlement>> {
    return this.http.get(client.clientEntitlementRef)
      .map(res => {
        let entObjs = res.json();
        return entObjs.map((entObj) => new Entitlement(entObj.name, entObj.transactionLimit, entObj.dailyLimit));
      });
  }
  deleteEntitlement(client: Client, entitlementName: string) {
    return this.http.delete(client.clientEntitlementRef + entitlementName)
      .map(res => res.json());
  }
  createEntitlement(client: Client, entitlement: Entitlement) {
    return this.http.post(
      client.clientEntitlementRef,
      JSON.stringify(entitlement),
      {headers: this.headers})
      .map(res => res.json());
  }
  getUsersForClient(client: Client) {
    return this.http.get(client.usersRef)
      .map(res => res.json());
  }
}
