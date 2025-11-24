import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitePolicyRoutingModule } from './site-policy-routing-module';
import { SitePolicy } from './site-policy';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    SitePolicy
  ],
  imports: [
    CommonModule,
    SitePolicyRoutingModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    AngularEditorModule 
  ]
})
export class SitePolicyModule { }
