export class User {
  public loginName: string;
  public userId: number;
  public clientId: number;
  public userExists: boolean;
  public clientExists: boolean;
  public userEntitlementRef: string;
  public clientEntitlementRef: string;
  constructor(userResponse: any) {
    this.loginName = userResponse.loginName;
    this.userId = userResponse.userId;
    this.clientId = userResponse.clientId;
    this.userExists = userResponse.userExists;
    this.clientExists = userResponse.clientExists;
    this.userEntitlementRef = userResponse.userEntitlementRef;
    this.clientEntitlementRef = userResponse.clientEntitlementRef;
  }
}
