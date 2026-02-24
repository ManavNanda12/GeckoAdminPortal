import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Common } from '../../../services/common';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { OrderDetail } from '../order-detail/order-detail';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.html',
  styleUrl: './order-list.scss',
})
export class OrderList {
  // Common Properties
  orderList: any = [];
  displayedColumns: string[] = [
    'CustomerName',
    'OrderNumber',
    'OrderStatus',
    'PaymentStatus',
    'BillingAddress',
    'DiscountAmount',
    'TaxAmount',
    'Total',
    'Actions',
  ];
  dataSource = [];
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: string = '';
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  constructor(
    private readonly spinner: NgxSpinnerService,
    private readonly toastr: ToastrService,
    private readonly commonService: Common,
    private readonly api: ApiUrlHelper,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.getAllOrders();
  }

  onPageChange(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAllOrders();
  }

  getAllOrders() {
    this.spinner.show();
    let api = this.api.Order.OrderList;
    let requestedModel = {
      searchTerm: this.searchTerm,
      sortColumn: this.sortColumn,
      sortDirection: this.sortDirection,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };
    this.commonService.postData(api, requestedModel).subscribe({
      next: (response: any) => {
        if (response?.success) {
          this.orderList = response?.data;
          this.dataSource = this.orderList;
          this.totalRecords = response?.data[0]?.totalRecords;
        }
      },
      error: (error: any) => {
        this.toastr.error(error?.error?.message);
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  viewOrder(orderId: number) {
    this.dialog.open(OrderDetail, {
      data: { orderId: orderId },
      maxWidth: '100vw',
      width: 'auto',
      disableClose: true,
    });
  }

  getOrderStatus(orderStatus: number) {
    const statusMap: any = {
      0: 'pending',
      1: 'processing',
      2: 'shipped',
      3: 'delivered',
      4: 'cancelled',
    };
    return statusMap[orderStatus] || 'pending';
  }

  getPaymentStatus(paymentStatus: string) {
    if (typeof paymentStatus === 'string') {
      const status = paymentStatus.toLowerCase();
      if (status === 'succeeded' || status === 'success') return 'succeeded';
      if (status === 'failed' || status === 'failure') return 'failed';
      if (status === 'canceled' || status === 'cancelled') return 'canceled';
      if (status === 'pending') return 'pending';
    } else {
      const statusMap: any = {
        0: 'pending',
        1: 'succeeded',
        2: 'failed',
        3: 'canceled'
      };
      return statusMap[paymentStatus] || 'pending';
    }
    return 'pending';
  }
}
