import {Component, Output, EventEmitter} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {Entitlement}    from './Entitlement';

@Component({
  selector: 'entitlement-form',
  template: require('./entitlementForm.html')
})
export class EntitlementForm {
  model = new Entitlement();
  @Output() onSubmit = new EventEmitter<Entitlement>();
  onFormSubmit() {
    this.onSubmit.emit(this.model);
    this.model = new Entitlement();
  }
}
