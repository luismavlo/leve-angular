import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ReportsService } from 'src/app/services/reports.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { ReportLotExpenseProceeds } from 'src/app/interfaces/lot.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public sales!: number;
  public production!: number;
  public operationalExpenses!: number;
  public administrativeExpenses!: number;
  public marketingExpenses!: number;
  public otherExpenses!: number;
  public totalExpenses: number = 0;
  public proceeds!: number;
  public utility: number = 0;
  public clients!: number;
  public role!: string;
  // public expensesVsProceeds!: number;

  public reportForm = this.fb.group({
    initDate: [moment().format('DD-MM-YYYY'), [Validators.required]],
    endDate: [
      moment().add(1, 'days').format('DD-MM-YYYY'),
      [Validators.required],
    ],
  });

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: -10000,
      },
    },
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  public barChartDataExpensesVsProceeds: ChartData<'bar'> = {
    labels: [],
    datasets: [],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {
    console.log(event, active);
  }

  constructor(
    private reportService: ReportsService,
    private fb: FormBuilder,
    private readonly userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.executeAllReports();
    this.redirectTo();
  }

  redirectTo() {
    this.userService.getInfo().subscribe({
      next: (resp) => {
        this.role = resp.role;
        if (resp.role !== 'admin') {
          this.router.navigate(['/dashboard/clients']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  executeAllReports() {
    this.getLotsReportProceedsExpense();
    this.getNumberSalesReports();
    this.getProductionReports();
    this.getOperationalExpenses();
    this.getAdministrativeExpenses();
    this.getMarketingExpenses();
    this.getOtherExpenses();
    this.getProceeds();
    this.getNumberClients();
    this.getExpensesVsProceeds();
    this.totalExpenses = 0;
    this.utility = 0;
  }

  getNumberSalesReports() {
    this.reportService
      .getNumberSales(
        this.reportForm.value.initDate as string,
        this.reportForm.value.endDate as string
      )
      .subscribe({
        next: (data) => {
          this.sales = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getLotsReportProceedsExpense() {
    this.reportService.getLotsReportProceedsExpense().subscribe({
      next: (data) => {
        console.log(data);
        this.barChartData.labels = data.lotName;
        this.barChartData.datasets[0] = { data: data.expense, label: 'Gastos' };
        this.barChartData.datasets[1] = {
          data: data.proceeds,
          label: 'Ganancias',
        };
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getProductionReports() {
    this.reportService
      .getNumberProduction(
        this.reportForm.value.initDate as string,
        this.reportForm.value.endDate as string
      )
      .subscribe({
        next: (data) => {
          this.production = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getOperationalExpenses() {
    this.reportService
      .getOperationalExpenses(
        this.reportForm.value.initDate as string,
        this.reportForm.value.endDate as string
      )
      .subscribe({
        next: (data) => {
          this.operationalExpenses = data.totalExpenses;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getAdministrativeExpenses() {
    this.reportService
      .getAdminExpenses(
        this.reportForm.value.initDate as string,
        this.reportForm.value.endDate as string
      )
      .subscribe({
        next: (data) => {
          this.administrativeExpenses = data.totalExpense;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getMarketingExpenses() {
    this.reportService
      .getAdvertisingExpenses(
        this.reportForm.value.initDate as string,
        this.reportForm.value.endDate as string
      )
      .subscribe({
        next: (data) => {
          this.marketingExpenses = data.totalExpense;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getOtherExpenses() {
    this.reportService
      .getOtherExpenses(
        this.reportForm.value.initDate as string,
        this.reportForm.value.endDate as string
      )
      .subscribe({
        next: (data) => {
          this.otherExpenses = data.totalExpense;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getUtility() {
    this.totalExpenses =
      this.otherExpenses +
      this.marketingExpenses +
      this.administrativeExpenses +
      this.operationalExpenses;
    this.utility = this.proceeds - this.totalExpenses;
  }

  getProceeds() {
    this.reportService
      .getProceeds(
        this.reportForm.value.initDate as string,
        this.reportForm.value.endDate as string
      )
      .subscribe({
        next: (data) => {
          this.proceeds = data.proceeds;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getNumberClients() {
    this.reportService
      .getNumberClients(
        this.reportForm.value.initDate as string,
        this.reportForm.value.endDate as string
      )
      .subscribe({
        next: (data) => {
          this.clients = data.clients;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getExpensesVsProceeds() {
    this.reportService
      .getReportProceedsVsExpenses(
        this.reportForm.value.initDate as string,
        this.reportForm.value.endDate as string
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          this.barChartDataExpensesVsProceeds.labels = data.months;
          this.barChartDataExpensesVsProceeds.datasets[0] = {
            data: data.otherExpensesValues,
            label: 'Gastos Restantes',
          };
          this.barChartDataExpensesVsProceeds.datasets[1] = {
            data: data.expensesOperationalValues,
            label: 'Gastos Operacionales',
          };
          this.barChartDataExpensesVsProceeds.datasets[2] = {
            data: data.proceedsValues,
            label: 'Ganancias',
          };
          this.barChartDataExpensesVsProceeds.datasets[3] = {
            data: data.utilities,
            label: 'Utilidad',
          };
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
