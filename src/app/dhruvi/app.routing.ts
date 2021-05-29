import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CartdisplayComponent } from './cartdisplay/cartdisplay.component';
import { UserauthguardService } from './userauthguard.service';
import { UserLoginComponent } from './user_login/user-login/user-login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { EditcustomerComponent } from './editcustomer/editcustomer.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DisplayproductComponent } from './displayproduct/displayproduct.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { HomestatComponent } from './homestat/homestat.component';
import { HomebookComponent } from './homebook/homebook.component';
import { SuccessbillpageComponent } from './successbillpage/successbillpage.component';
import { SearchDataComponent } from './search-data/search-data.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { FaqComponent } from './faq/faq.component';
import { BlogComponent } from './blog/blog.component';
import { ViewmoreComponent } from './viewmore/viewmore.component';
import { AccountOrdersComponent } from './account-dashboard/account-orders/account-orders.component';
import { EdituserdataComponent } from './signup/edituserdata/edituserdata.component';
import { ForgottenPasswordComponent } from './user_login/forgotten-password/forgotten-password.component';

const arr: Routes = [

  { path: '', component: UserLoginComponent },

  { path: 'ForgotPassword', component: ForgottenPasswordComponent },
  {
    path: 'nav', canActivate: [UserauthguardService], component: MainNavComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'edit', component: EditcustomerComponent },
      { path: 'HomePage', component: HomeComponent },
      { path: 'searchData', component: SearchDataComponent },

      { path: 'faq', component: FaqComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'viewmore', component: ViewmoreComponent },
      { path: 'changePassword', component: EdituserdataComponent },

      { path: 'AccountDashBoard', component: AccountDashboardComponent },
      { path: 'foot', component: FooterComponent },
      { path: 'carts', component: CartdisplayComponent },
      { path: 'aboutus', component: AboutusComponent },
      { path: 'contactus', component: ContactusComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'productList', component: ProductListComponent },
      { path: 'catprodList', component: CategoryListComponent },
      { path: 'bookList', component: BookListComponent },
      { path: 'login', component: UserLoginComponent },
      { path: 'stationery', component: HomestatComponent },
      { path: 'books', component: HomebookComponent },
      { path: 'successbill', component: SuccessbillpageComponent },//thankpage
      { path: 'displayproduct/:category_id', component: DisplayproductComponent },
      { path: 'orderDetails', component: AccountOrdersComponent },
      { path: '**', component: PagenotfoundComponent }
    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

export const routingArr = RouterModule.forRoot(arr);
