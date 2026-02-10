import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiUrlHelper {
  User = {
    GetAllUsers: "User/get-users",
    GetUserById: "User/get-user-by-id/{Id}",
    DeleteUser: "User/delete-user/{Id}",
    SaveUser: "User/save-user"
  };
  Auth = {
    Login: "User/login"
  };
  Category = {
    CategoryList: "category/get-category-list",
    SaveCategory: "category/save-category",
    SaveCategoryImage: "category/save-category-image"
  }
  Product = {
    ProductList: "product/get-product-list",
    SaveProduct: "product/save-product",
    SaveProductImage: "product/save-product-image",
    GetProductImage: "product/get-product-images/{Id}",
    DeleteProductImage: "product/delete-product-image",
    SetPrimaryImage: "product/set-primary-image/{Id}"
  }
  ProductStock = {
    ProductStockDetail: "product/get-stock-detail/{Id}",
    SaveProductStock: "product/save-stock-detail"
  }
  Customer = {
    CustomerList: "customers/get-customer-list",
    SaveCustomer: "customers/save-customer",
    GetCustomerById: "customers/get-customer-by-id/{Id}",
    DeleteCustomer: "customers/delete-customer/{Id}"
  }
  Order = {
    OrderList: "order/get-order-list",
    GetOrderDetails:'order/get-order-detail/{orderId}'
  }
  Dashboard = {
    Dashboard: "dashboard/get-dashboard-count",
    GetMonthlyStats: "dashboard/get-monthly-stats/{Year}",
    GetMostOrderedStats: "dashboard/get-most-ordered-stats/{Filter}"
  }
  ContactUs = {
    ContactUsList: "contactus/get-contactus-list",
    SaveContactUs: "contactus/save-contactus-request",
    DeleteContactUsRequest: "contactus/delete-contactus-request/{Id}"
  }
  Coupon = {
    CouponList: "coupon/get-coupon-list",
    SaveCoupon: "coupon/save-coupon",
    CouponDetails: "coupon/get-coupon-details/{CouponId}"
  }
  SitePolicy = {
    GetSitePolicies: "site-policy/get-site-policies",
    SaveSitePolicies: "site-policy/update-policy"
  }
}