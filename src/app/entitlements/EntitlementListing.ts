import {Component, EventEmitter, Input, Output} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'entitlement-listing',
  providers: [
  ],
  directives: [
    CORE_DIRECTIVES
  ],
  pipes: [ ],
  template: `
     <div>
      <span>
        name: {{entitlement.name}}
      </span>
      <span *ngIf="entitlement.transactionLimit">
        transaction limit: {{entitlement.transactionLimit}}
      </span>
      <span *ngIf="entitlement.dailyLimit">
        daily limit: {{entitlement.dailyLimit}}
      </span>
      <span>
        <button type="button" (click)="onRevokeClicked()">Revoke</button>
      </span>
     </div>
    `
})
export class EntitlementListing {
  @Input() entitlement: Object;
  @Output() onRevoke = new EventEmitter<Object>();
  constructor() {
  }

  onRevokeClicked() {
    this.onRevoke.emit(this.entitlement);
  }
}
