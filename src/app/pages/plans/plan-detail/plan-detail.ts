import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiUrlHelper } from '../../../common/ApiUrlHelper';
import { Common } from '../../../services/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plan-detail',
  standalone: false,
  templateUrl: './plan-detail.html',
  styleUrl: './plan-detail.scss',
})
export class PlanDetail implements OnInit {
  planId: any;
  planDetails: any;
  filteredSubscribers: any[] = [];
  searchTerm: string = '';
  filterStatus: string = 'all';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly api: ApiUrlHelper,
    private readonly commonService: Common,
    private readonly spinner: NgxSpinnerService,
    private readonly toastr: ToastrService,
  ) {}

  ngOnInit() {
    // Get plan ID from route params
    this.route.params.subscribe((params) => {
      this.planId = params['planId'];
      if (this.planId) {
        this.getPlanDetails();
      }
    });
  }

  getPlanDetails() {
    this.spinner.show();
    // Replace with your actual API endpoint
    let api = this.api.Plans.GetPlanDetails.replace('{planId}', this.planId);
    this.commonService
      .getData(api)
      .pipe()
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.planDetails = response.data;
            this.filteredSubscribers = [...this.planDetails];
            console.log(this.planDetails);
          }
        },
        error: (error) => {
          console.log(error);
          this.toastr.error('Failed to load plan details');
        },
        complete: () => {
          this.spinner.hide();
        },
      });
  }

  // Navigate back to plans list
  goBack() {
    this.router.navigate(['/plans']);
  }

  // Calculate total plan income
  calculatePlanIncome(): number {
    if (!this.planDetails || this.planDetails.length === 0) {
      return 0;
    }

    let totalPrice = this.planDetails
      .map((plan: any) => {
        // Handle amount as direct number value
        const amount = plan.amount || 0;
        return amount;
      })
      .reduce((a: number, b: number) => a + b, 0);
    return totalPrice;
  }

  // Get count of active subscribers
  getActiveSubscribers(): number {
    if (!this.planDetails || this.planDetails.length === 0) {
      return 0;
    }
    return this.planDetails.filter(
      (sub: any) => sub.subscriptionStatus?.toLowerCase() === 'active',
    ).length;
  }

  // Get count of canceled subscribers
  getCanceledSubscribers(): number {
    if (!this.planDetails || this.planDetails.length === 0) {
      return 0;
    }
    return this.planDetails.filter(
      (sub: any) =>
        sub.subscriptionStatus?.toLowerCase() === 'canceled' ||
        sub.subscriptionStatus?.toLowerCase() === 'cancelled',
    ).length;
  }

  // Parse benefits JSON string
  parseBenefits(benefitsStr: string): any[] {
    try {
      return JSON.parse(benefitsStr);
    } catch (e) {
      console.error('Error parsing benefits:', e);
      return [];
    }
  }

  // Get benefit text display
  getBenefitText(benefit: any): string {
    const key = benefit.BenefitKey;
    const value = benefit.BenefitValue;

    switch (key) {
      case 'discount_percent':
        return `${value}% Discount`;
      case 'free_shipping':
        return value === 'true' ? 'Free Shipping' : 'Standard Shipping';
      case 'early_access':
        return value === 'true' ? 'Early Access to Sales' : 'Regular Access';
      default:
        return `${key}: ${value}`;
    }
  }

  // Get benefit icon
  getBenefitIcon(key: string): string {
    const iconMap: any = {
      discount_percent: 'fa-solid fa-percent',
      free_shipping: 'fa-solid fa-truck-fast',
      early_access: 'fa-solid fa-bolt',
      priority_support: 'fa-solid fa-headset',
      exclusive_content: 'fa-solid fa-crown',
    };
    return iconMap[key] || 'fa-solid fa-check-circle';
  }

  // Get subscription status class
  getStatusClass(status: string): string {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower === 'active') return 'active';
    if (statusLower === 'canceled' || statusLower === 'cancelled')
      return 'canceled';
    if (statusLower === 'incomplete' || statusLower === 'past_due')
      return 'incomplete';
    return 'canceled';
  }

  // Get subscription status icon
  getStatusIcon(status: string): string {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower === 'active') return 'fa-solid fa-circle-check';
    if (statusLower === 'canceled' || statusLower === 'cancelled')
      return 'fa-solid fa-circle-xmark';
    if (statusLower === 'incomplete') return 'fa-solid fa-hourglass-half';
    if (statusLower === 'past_due') return 'fa-solid fa-exclamation-triangle';
    return 'fa-solid fa-circle-xmark';
  }

  // Set filter status
  setFilter(status: string) {
    this.filterStatus = status;
    this.applyFilters();
  }

  // Filter subscribers by search term and status
  filterSubscribers() {
    this.applyFilters();
  }

  // Apply all filters
  applyFilters() {
    if (!this.planDetails) {
      this.filteredSubscribers = [];
      return;
    }

    let result = [...this.planDetails];

    // Filter by status
    if (this.filterStatus !== 'all') {
      result = result.filter((sub: any) => {
        const status = sub.subscriptionStatus?.toLowerCase() || '';
        if (this.filterStatus === 'canceled') {
          return status === 'canceled' || status === 'cancelled';
        }
        return status === this.filterStatus;
      });
    }

    // Filter by search term
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const searchLower = this.searchTerm.toLowerCase().trim();
      result = result.filter((sub: any) => {
        const name = sub.fullName?.toLowerCase() || '';
        const email = sub.email?.toLowerCase() || '';
        return name.includes(searchLower) || email.includes(searchLower);
      });
    }

    this.filteredSubscribers = result;
  }

  // Get filtered subscribers
  getFilteredSubscribers(): any[] {
    return this.filteredSubscribers;
  }

  // Export subscribers to CSV
  exportSubscribers() {
    if (!this.planDetails || this.planDetails.length === 0) {
      this.toastr.warning('No subscribers to export');
      return;
    }

    // Prepare CSV data
    const headers = [
      '#',
      'Name',
      'Email',
      'Status',
      'Start Date',
      'End Date',
      'Subscribed On',
      'Cancel At Period End',
    ];
    const rows = this.planDetails.map((sub: any, index: number) => [
      index + 1,
      sub.fullName,
      sub.email,
      sub.subscriptionStatus,
      new Date(sub.currentPeriodStart).toLocaleDateString(),
      new Date(sub.currentPeriodEnd).toLocaleDateString(),
      new Date(sub.createdAt).toLocaleString(),
      sub.cancelAtPeriodEnd ? 'Yes' : 'No',
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map((row: any) => row.map((cell: any) => `"${cell}"`).join(',')),
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `${this.planDetails[0].planName}_subscribers_${new Date().getTime()}.csv`,
    );
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.toastr.success('Subscribers exported successfully');
  }
}
