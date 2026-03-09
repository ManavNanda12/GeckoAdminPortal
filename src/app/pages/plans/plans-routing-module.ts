import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanList } from './plan-list/plan-list';

const routes: Routes = [
  {
    path: '',
    component: PlanList
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
