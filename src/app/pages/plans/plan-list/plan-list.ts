import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { Common } from '../../../services/common';
import { PlanDetail } from '../plan-detail/plan-detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-list',
  standalone: false,
  templateUrl: './plan-list.html',
  styleUrl: './plan-list.scss',
})
export class PlanList {
  // Common Properties
  planList: any = [];
  displayedColumns: string[] = [
    'planName',
    'amount',
    'billingInterval',
    'Actions',
  ];
  dataSource = [];

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly toastr: ToastrService,
    private readonly commonService: Common,
    private readonly api: ApiUrlHelper,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getAllPlans();
  }

  getAllPlans() {
    this.spinner.show();
    let api = this.api.Plans.GetPlans.replace('{CustomerId}', '0');
    this.commonService.getData(api).subscribe({
      next: (response) => {
        this.planList = response.data;
        this.dataSource = this.planList;
      },
      error: (error) => {
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  getPlanDetails(planId: any) {
     this.router.navigate([`/plans/detail/${planId}`]);
  }
}
