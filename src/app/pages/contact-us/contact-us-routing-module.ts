import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsList } from './contact-us-list/contact-us-list';

const routes: Routes = [
  {
    path: '',
    component: ContactUsList
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
