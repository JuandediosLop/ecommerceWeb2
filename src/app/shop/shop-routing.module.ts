import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { HomeShopComponent } from './home-shop/home-shop.component';
import { MenComponent } from './men/men.component';
import { WomanComponent} from './woman/woman.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { ProductComponent } from './product/product.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LoginComponent } from './login/login.component';
import { MainUserComponent } from './main-user/main-user.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  { path: '', component: HomeShopComponent},
  { path: 'hombre', component: MenComponent},
  { path: 'mujer', component: WomanComponent},
  { path: 'accesorios', component: AccessoriesComponent},
  { path: 'producto/:id', component: ProductComponent},
  { path: 'carrito', component: ShoppingCartComponent},
  { path: 'login', component: LoginComponent},
  { path: 'main-user', component: MainUserComponent},
  { path: 'profile-user', component: ProfileUserComponent},
  { path: 'orders', component: OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
