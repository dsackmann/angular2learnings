export class Client {
  clientId: number;
  usersRef: string;
  clientEntitlementRef: string;
  clientExists: boolean;
  constructor(clientResponse: any) {
    this.clientId = clientResponse.clientId;
    this.usersRef = clientResponse.usersRef;
    this.clientEntitlementRef = clientResponse.clientEntitlementRef;
    this.clientExists = clientResponse.clientExists;
  }
}
