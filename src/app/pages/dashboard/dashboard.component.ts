import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from '../../common/ApiUrlHelper';
import { Common } from '../../services/common';
import { AgCartesianChartOptions } from 'ag-charts-community';
import {
  AreaSeriesModule,
  CategoryAxisModule,
  LegendModule,
  LineSeriesModule,
  BarSeriesModule,
  NumberAxisModule,
  ModuleRegistry
} from 'ag-charts-community';

ModuleRegistry.registerModules([
  AreaSeriesModule,
  CategoryAxisModule,
  LegendModule,
  LineSeriesModule,
  BarSeriesModule,
  NumberAxisModule,
]);

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  dashboardCount:any;
  monthlyStats:any;
  mostOrderedProductStats:any;
  monthlySalesChartOptions: AgCartesianChartOptions = {} as AgCartesianChartOptions;
  mostOrderedProductsChartOptions: AgCartesianChartOptions = {} as AgCartesianChartOptions;
  selectedYear:any=2026;
  selectedPeriod:any=2;


  constructor(private router: Router , private readonly commonService: Common , private readonly api: ApiUrlHelper,private readonly spinner: NgxSpinnerService,
    private readonly toastr: ToastrService) {
    }

  ngOnInit(): void {
    this.getDashboardCount();
    this.getMonthylySalesCount(new Date().getFullYear());
    this.getMostOrderedProductStats(2);
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

  getMonthylySalesCount(year:any){
    this.selectedYear = year;
    let api = this.api.Dashboard.GetMonthlyStats.replace('{Year}',year);
    this.spinner.show();
    this.commonService.getData(api).pipe().subscribe({
      next:(response)=>{
        if(response.success){
          this.monthlyStats = response?.data;
          console.log(this.monthlyStats);
          this.setupMonthlySalesChart();
        }
      },
      error:(error:any)=>{
        this.toastr.error(error?.error?.message);
      },
      complete:()=>{
        this.spinner.hide();  
      }
    });
  }

  getMostOrderedProductStats(filter:any){
    this.selectedPeriod = filter;
    let api = this.api.Dashboard.GetMostOrderedStats.replace('{Filter}',filter);
    this.spinner.show();
    this.commonService.getData(api).pipe().subscribe({
      next:(response)=>{
        if(response.success){
          this.mostOrderedProductStats = response?.data;
          console.log(this.mostOrderedProductStats);
          this.setupMostOrderedProductsChart();
        }
      },
      error:(error:any)=>{
        this.toastr.error(error?.error?.message);
      },
      complete:()=>{
        this.spinner.hide();  
      }
    });
  }

  setupMonthlySalesChart() {
    this.monthlySalesChartOptions = {
      data: this.monthlyStats || [],
      series: [
        {
          type: 'area',
          xKey: 'monthName',
          yKey: 'monthlyTotal',
          yName: 'Sales Amount',
          fillOpacity: 0.25,
          strokeWidth: 2,
        },
      ],
      axes: {
        x: {
          type: 'category',
          position: 'bottom',
        },
        y: {
          type: 'number',
          position: 'left',
          title: {
            text: 'Sales Amount',
          },
        },
      },
    };
  }

  setupMostOrderedProductsChart() {
    this.mostOrderedProductsChartOptions = {
      data: this.mostOrderedProductStats || [],
      series: [
        {
          type: 'bar',
          direction: 'horizontal',
          xKey: 'productName',
          yKey: 'orderedCount',
          yName: 'Orders',
          label: {
            enabled: true,
          },
        } as any,
      ],
      axes: {
        x: {
          type: 'number',
          position: 'bottom',
          title: {
            text: 'Order Count',
          },
        },
        y: {
          type: 'category',
          position: 'left',
        },
      },
    };
  }

  getLastTenYears(){
    let years = [];
    for(let i = 0; i < 10; i++){
     years.push(new Date().getFullYear() - i); 
    }
    return years;
  }
        

}
