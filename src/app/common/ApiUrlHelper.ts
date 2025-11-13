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
    GetCustomerById: "customers/get-customer-by-id/{Id}"
  }
  Order = {
    OrderList: "order/get-order-list"
  }
  Dashboard = {
    Dashboard: "dashboard/get-dashboard-count"
  }
  ContactUs = {
    ContactUsList: "contactus/get-contactus-list",
    SaveContactUs: "contactus/save-contactus-request"
  }
  Coupon = {
    CouponList: "coupon/get-coupon-list",
    SaveCoupon: "coupon/save-coupon"
  }
}