import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanList } from './plan-list/plan-list';
import { PlanDetail } from './plan-detail/plan-detail';

const routes: Routes = [
  {
    path: '',
    component: PlanList
  },
  {
    path: 'detail/:planId',
    component: PlanDetail
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlansRoutingModule { }
