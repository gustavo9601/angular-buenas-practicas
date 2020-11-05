import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import {ContactRoutingModule} from './contact-routing.module';
import {SharedModule} from './../shared/shared.module';
import {ListComponent} from './containers/list/list.component';
import {LayoutContactComponent} from './components/layout-contact/layout-contact.component';
import {MaterialModule} from '../material/material.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    LayoutContactComponent],
  imports: [
    CommonModule,
    SharedModule,
    ContactRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class ContactModule {

}
