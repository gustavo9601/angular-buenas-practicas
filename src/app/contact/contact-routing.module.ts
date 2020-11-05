import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {LayoutContactComponent} from './components/layout-contact/layout-contact.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutContactComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class ContactRoutingModule {
}
