import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenHeader } from '../utils/getConfig';
import {
  ProceedsVsExpense,
  ReportLotExpenseProceeds,
} from '../interfaces/lot.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  constructor(private http: HttpClient) {}

  /**
   * It returns an observable of type any, and it takes two parameters, initDate and endDate, both of
   * type string
   * @param {string} initDate - The initial date of the report.
   * @param {string} endDate - The end date of the report.
   * @returns The number of sales made between the initDate and endDate.
   */
  getNumberSales(initDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('initDate', initDate)
      .set('endDate', endDate);

    return this.http.get(`${base_url}/sales/report`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  /**
   * It returns an Observable of type any
   * @param {string} initDate - The initial date of the report.
   * @param {string} endDate - The end date of the report.
   * @returns It is being returned the number of productions in a given period.
   */
  getNumberProduction(initDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('initDate', initDate)
      .set('endDate', endDate);

    return this.http.get(`${base_url}/lots/report/production`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  /**
   * It returns an observable of any type
   * @param {string} initDate - The initial date of the report.
   * @param {string} endDate - The end date of the report.
   * @returns An observable of any type.
   */
  getAdminExpenses(initDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('initDate', initDate)
      .set('endDate', endDate);

    return this.http.get(`${base_url}/expenses/report/admin`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  /**
   * It returns an Observable of type any, which is the result of a GET request to the URL
   * `/expenses/report/advertising` with the parameters initDate and endDate
   * @param {string} initDate - The initial date of the report.
   * @param {string} endDate - The end date of the report.
   * @returns An Observable of any type.
   */
  getAdvertisingExpenses(initDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('initDate', initDate)
      .set('endDate', endDate);

    return this.http.get(`${base_url}/expenses/report/advertising`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  /**
   * It returns an observable of any type
   * @param {string} initDate - The initial date of the report.
   * @param {string} endDate - The end date of the report.
   * @returns An Observable of any type.
   */
  getOtherExpenses(initDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('initDate', initDate)
      .set('endDate', endDate);

    return this.http.get(`${base_url}/expenses/report/other`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  /**
   * It's a function that returns an observable of type any, and it takes two parameters, initDate and
   * endDate, both of type string
   * @param {string} initDate - The initial date of the report.
   * @param {string} endDate - The end date of the report.
   * @returns It is being returned an array of objects with the following structure:
   */
  getOperationalExpenses(initDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('initDate', initDate)
      .set('endDate', endDate);

    return this.http.get(`${base_url}/expenses-per-lots/report/operational`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  /**
   * It returns an observable of type any, which is the result of a get request to the url
   * `/sales/report/proceeds` with the headers and params specified
   * @param {string} initDate - The initial date of the report.
   * @param {string} endDate - The end date of the report.
   * @returns The proceeds of the sales made in the period of time.
   */
  getProceeds(initDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('initDate', initDate)
      .set('endDate', endDate);

    return this.http.get(`${base_url}/sales/report/proceeds`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  /**
   * It's a function that returns an observable of type any, and it takes two parameters, initDate and
   * endDate, both of which are strings
   * @param {string} initDate - The initial date of the report.
   * @param {string} endDate - The end date of the report.
   * @returns The number of clients created between the initDate and endDate.
   */
  getNumberClients(initDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('initDate', initDate)
      .set('endDate', endDate);

    return this.http.get(`${base_url}/clients/report`, {
      headers: tokenHeader.headers,
      params,
    });
  }

  /**
   * This function returns an observable of type ReportLotExpenseProceeds
   * @returns An Observable of type ReportLotExpenseProceeds
   */
  getLotsReportProceedsExpense(): Observable<ReportLotExpenseProceeds> {
    return this.http.get<ReportLotExpenseProceeds>(
      `${base_url}/lots/report/expeses-proceeds`,
      {
        headers: tokenHeader.headers,
      }
    );
  }

  /**
   * It returns an Observable of type ExpensesVsProceeds, which is a class that has two properties:
   * proceeds and expenses
   * @param {string} initDate - The initial date of the report.
   * @param {string} endDate - The end date of the report.
   * @returns ExpensesVsProceeds
   */
  getReportProceedsVsExpenses(
    initDate: string,
    endDate: string
  ): Observable<ProceedsVsExpense> {
    const params = new HttpParams()
      .set('initDate', initDate)
      .set('endDate', endDate);
    return this.http.get<ProceedsVsExpense>(
      `${base_url}/sales/report/abstract/proceeds/expenses`,
      {
        headers: tokenHeader.headers,
        params,
      }
    );
  }
}
