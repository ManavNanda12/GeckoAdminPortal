import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from '../../common/ApiUrlHelper';
import { Common } from '../../services/common';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  dashboardCount:any;

  constructor(private router: Router , private readonly commonService: Common , private readonly api: ApiUrlHelper,private readonly spinner: NgxSpinnerService,
    private readonly toastr: ToastrService) {}

  ngOnInit(): void {
    this.getDashboardCount();
  }

  redirectToUsers(){
    this.router.navigate(['/users']);
  }

  redirectToCategory(){
    this.router.navigate(['/category']);
  }

  redirectToProducts(){
    this.router.navigate(['/product']);
  }

  redirectToOrders(){
    this.router.navigate(['/orders']);
  }

  redirectToCustomers(){
    this.router.navigate(['/customers']);
  }

  getDashboardCount(){
    this.spinner.show();
    let api = this.api.Dashboard.Dashboard;
    this.commonService.getData(api).subscribe({
      next:(response:any) =>{
        if(response?.success){
          this.dashboardCount = response?.data;
        }
      },
      error:(error:any) =>{
        this.toastr.error(error?.error?.message);
      },
      complete:() =>{
        this.spinner.hide();
      }
    })
  }

}
