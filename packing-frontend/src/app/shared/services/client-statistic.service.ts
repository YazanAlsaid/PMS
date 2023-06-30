import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ResponseMessage} from "../model/response-message";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientStatisticService {

  private readonly hostname: string = window.location.hostname;
  private readonly port: string = window.location.port;
  private readonly protocol: string = window.location.protocol;
  private readonly url: string = '';

  constructor(private http: HttpClient) {
    if (this.hostname === '127.0.0.1' || this.hostname === 'localhost') {
      this.url = this.protocol + '//' + this.hostname + ':8080';
    } else if (this.port == '80' || this.port == '443') {
      this.url = this.protocol + '//' + this.hostname;
    } else {
      this.url = this.protocol + '//' + this.hostname + ':' + this.port;
    }
  }

  public getCounts(): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(`${this.url}/api/v1/web/statistics/view-numbers`);
  }

  public getNumberOfReservationInEachWeek(): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(`${this.url}/api/v1/web/statistics/view-statistics-week`);
  }
  public getNumberOfReservationInEachMonth(): Observable<ResponseMessage> {
    return this.http.get<ResponseMessage>(`${this.url}/api/v1/web/statistics/view-statistics-month`);
  }
}
