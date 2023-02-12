import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LotsComponent } from './lots/lots.component';
import { ClientsComponent } from './clients/clients.component';
import { ProductsComponent } from './products/products.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { SalesComponent } from './sales/sales.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    LotsComponent,
    ClientsComponent,
    ProductsComponent,
    ExpensesComponent,
    SalesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
    NgChartsModule,
    GoogleChartsModule
  ],
  exports: [DashboardComponent, PagesComponent],
})
export class PagesModule {}
