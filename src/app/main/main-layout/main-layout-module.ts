import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainLayout } from './main-layout';
import { Header } from '../../components/header/header';
import { Sidebar } from '../../components/sidebar/sidebar';

const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path:'users',
        loadChildren:()=>import('../../pages/user/user-module').then(m=>m.UserModule)
      },
      {
        path:'category',
        loadChildren:()=>import('../../pages/category/category-module').then(m=>m.CategoryModule)
      },
      {
        path:'product',
        loadChildren:()=>import('../../pages/product/product-module').then(m=>m.ProductModule)
      },
       {
        path:'customers',
        loadChildren:()=>import('../../pages/customer/customer-module').then(m=>m.CustomerModule)
      },
      {
        path:'orders',
        loadChildren:()=>import('../../pages/orders/orders-module').then(m=>m.OrdersModule)
      },
      {
        path:'contact-us',
        loadChildren:()=>import('../../pages/contact-us/contact-us-module').then(m=>m.ContactUsModule)
      },
      {
        path:'coupon',
        loadChildren:()=>import('../../pages/coupon/coupon-module').then(m=>m.CouponModule)
      },
      {
        path:'site-policy',
        loadChildren:()=>import('../../pages/site-policy/site-policy-module').then(m=>m.SitePolicyModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MainLayout,
    Header,
    Sidebar
  ]

})
export class MainLayoutModule { }
