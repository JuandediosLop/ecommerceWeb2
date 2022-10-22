import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { HomeShopComponent } from './home-shop/home-shop.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductService } from '../services/product/product.service';
import { MenComponent } from './men/men.component';
import { WomanComponent } from './woman/woman.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { MainUserComponent } from './main-user/main-user.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderService } from '../services/order/order.service';


@NgModule({
  declarations: [
    ShopComponent,
    HomeShopComponent,
    NavbarComponent,
    MenComponent,
    WomanComponent,
    AccessoriesComponent,
    ProductComponent,
    ShoppingCartComponent,
    LoginComponent,
    MainUserComponent,
    ProfileUserComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ ShopComponent ],
  providers: [ProductService, UserService, OrderService]
})
export class ShopModule { }
