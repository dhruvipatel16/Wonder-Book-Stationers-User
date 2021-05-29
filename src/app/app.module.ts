import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatListModule, } from '@angular/material/list';
import { routingArr } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import { CartdisplayComponent } from './cartdisplay/cartdisplay.component';
import { UserLoginComponent } from './user_login/user-login/user-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ViewmoreComponent } from './viewmore/viewmore.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductListComponent } from './product-list/product-list.component';
import { BookListComponent } from './book-list/book-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { EditcustomerComponent } from './editcustomer/editcustomer.component';
import { DisplayproductComponent } from './displayproduct/displayproduct.component';
import { HomestatComponent } from './homestat/homestat.component';
import { HomebookComponent } from './homebook/homebook.component';
import { SearchDataComponent } from './search-data/search-data.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { FaqComponent } from './faq/faq.component';
import { BlogComponent } from './blog/blog.component';
import { AccountOrdersComponent } from './account-dashboard/account-orders/account-orders.component';
import { EdituserdataComponent } from './signup/edituserdata/edituserdata.component';
import { ForgottenPasswordComponent } from './user_login/forgotten-password/forgotten-password.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SuccessbillpageComponent } from './success/successbillpage.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MainNavComponent,
    CartdisplayComponent,
    UserLoginComponent,
    ViewmoreComponent,
    ProductListComponent,
    BookListComponent,
    CategoryListComponent,
    EdituserdataComponent,
    AboutusComponent,
    ContactusComponent,
    ForgottenPasswordComponent,
    CheckoutComponent,
    EditcustomerComponent,
    DisplayproductComponent,
    HomestatComponent,
    HomebookComponent,
    SuccessbillpageComponent,
    SearchDataComponent,
    AccountDashboardComponent,
    FaqComponent,
    BlogComponent,
    AccountOrdersComponent,
    SnackbarComponent
  ],
  imports: [

    BrowserModule,

    routingArr,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatSnackBarModule,
MatGridListModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatFormFieldModule,
    ClipboardModule

  ],
  entryComponents: [
    ViewmoreComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
