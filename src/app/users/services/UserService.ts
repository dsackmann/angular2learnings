import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Entitlement} from '../../entitlements/Entitlement';
import {User} from '../User';

@Injectable()
export class UserService {
  private http: Http;
  private headers: Headers;
  private userResourceUrl: string = '/api/user/';
  constructor(http: Http) {
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  getUsers(): Observable<Array<User>> {
    return this.http.get(this.userResourceUrl)
    .map(res => {
      return res.json().map(user => new User(user));
    });
  }
  getUserById(id): Observable<User> {
    return this.http.get(this.userResourceUrl + id)
      .map(res => {
        return new User(res.json());
      });
  }
  getUserEntitlementsForUser(user) {
    return this.http.get(user.userEntitlementRef)
      .map(res => res.json());
  }
  getClientEntitlementsForUser(user) {
    return this.http.get(user.clientEntitlementRef)
      .map(res => res.json());
  }
  deleteEntitlement(user, entitlementName) {
    return this.http.delete(user.userEntitlementRef + entitlementName)
      .map(res => res.json());
  }
  createEntitlement(user, entitlement: Entitlement) {
    return this.http.post(
      user.userEntitlementRef,
      JSON.stringify(entitlement),
      {headers: this.headers})
      .map(res => res.json());
  }
  registerUser(user) {
    return this.http.post(
      this.userResourceUrl,
      JSON.stringify(user),
      {headers: this.headers})
      .map(res => res.json());
  }
}
